import mongoose, { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  material: { type: String, required: true },
  image: { type: String, required: true },
  badge: { type: String, required: false }, // Optional field
}, {
  timestamps: true, // Adds createdAt and updatedAt
});

// Prevent model overwrite error in Next.js hot reloading
const Product = models.Product || model('Product', ProductSchema);

export default Product;