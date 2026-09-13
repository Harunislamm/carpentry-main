import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find({}).sort({ createdAt: -1 });
    return NextResponse.json(products);
  } catch (error: any) {
    console.error("Database Fetch Error:", error.message);
    return NextResponse.json({ 
      error: 'Failed to fetch products',
      details: error.message
    }, { status: 500 });
  }
}

// POST: Add a new product with validation
export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    // Basic validation
    const { name, price, category, material, image } = body;
    if (!name || !price || !category || !material || !image) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newProduct = await Product.create({
      name,
      price: Number(price),
      category,
      material,
      image,
      badge: body.badge || ""
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: any) {
    console.error("Database Create Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}