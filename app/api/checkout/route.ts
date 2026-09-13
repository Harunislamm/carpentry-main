import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';
import User from '@/models/User';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import Stripe from 'stripe';

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2025-02-24.acacia' }) : null;

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { items, total, shippingAddress } = await req.json();
    
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    
    let customerData = { name: "Guest", email: "guest@example.com" };

    if (token) {
      try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
        const user = await User.findById(decoded.userId).select('name email');
        if (user) {
          customerData = { name: user.name, email: user.email };
        }
      } catch (e) {
        console.error("JWT Verification failed", e);
      }
    }

    if (stripe) {
      // Create Stripe Checkout Session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        customer_email: customerData.email,
        line_items: items.map((item: any) => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
              images: [new URL(item.image, req.headers.get("origin") || "http://localhost:3000").toString()],
            },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: item.quantity,
        })),
        mode: 'payment',
        success_url: `${req.headers.get("origin") || "http://localhost:3000"}/?success=true`,
        cancel_url: `${req.headers.get("origin") || "http://localhost:3000"}/?canceled=true`,
        metadata: {
          customerName: customerData.name,
          email: customerData.email,
          address: shippingAddress || "Address provided at checkout",
          items: JSON.stringify(items.map((i: any) => ({ _id: i._id, q: i.quantity })))
        }
      });

      return NextResponse.json({ url: session.url }, { status: 200 });
    }

    // Fallback if Stripe is not configured
    const newOrder = await Order.create({
      customerName: customerData.name,
      email: customerData.email,
      total,
      items,
      status: 'Pending',
      address: shippingAddress || "Address provided at shipping"
    });

    return NextResponse.json({ 
      message: "Order placed!", 
      orderId: newOrder._id 
    }, { status: 201 });

  } catch (error: any) {
    console.error("Checkout Error:", error);
    return NextResponse.json({ error: error.message || "Checkout failed" }, { status: 500 });
  }
}