import mongoose from "mongoose"
import { Category } from "../../app/models/category"
import { mongooseConnect } from '../../app/lib/mongoose'
require('dotenv').config()

export default async function handle(req, res) {
    const { method } = req

    await mongooseConnect()
    
    if (method === 'GET') {
        res.json(await Category.find())
    }

    if (method === 'POST') {
        const {name} = req.body
        const categoryDoc = await Category.create({name})
        res.json(categoryDoc)
    }
}