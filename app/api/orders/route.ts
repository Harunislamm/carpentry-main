import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';

export async function GET() {
  try {
    await dbConnect();
    const orders = await Order.find({}).sort({ createdAt: -1 }); // Newest first
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

// Optional: Endpoint to update status
export async function PATCH(req: Request) {
    try {
        await dbConnect();
        const { id, status } = await req.json();
        const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
        return NextResponse.json(order, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
}