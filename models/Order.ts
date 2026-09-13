import mongoose, { Schema, model, models } from 'mongoose';

const OrderSchema = new Schema({
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  total: { type: Number, required: true },
  status: { type: String, default: 'Pending' }, // Pending, Shipped, Delivered
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name: { type: String },
      price: { type: Number },
      quantity: { type: Number, default: 1 }
    }
  ]
}, { timestamps: true });

const Order = models.Order || model('Order', OrderSchema);

export default Order;