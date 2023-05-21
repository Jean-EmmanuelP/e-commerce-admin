// pages/api/product.js
import mongoose from "mongoose";
import { Product } from "../../app/models/product";
import { mongooseConnect } from "../../app/lib/mongoose";
require("dotenv").config();

export default async function handle(req, res) {
  const method = req.method;

  await mongooseConnect();

  if (method === 'GET') {
    res.json(await Product.find())
  }

  if (method === "POST") {
    const { title, description, price } = req.body;
    const productDoc = await Product.create({
      title,
      description,
      price,
    });
    res.json(productDoc);
  }
}
