import { mongooseConnect } from "../../app/lib/mongoose";
import { Order } from "../../app/models/order";

export default async function handler(req, res) {
  await mongooseConnect();
  res.json(await Order.find().sort({ createdAt: -1 }));
}
