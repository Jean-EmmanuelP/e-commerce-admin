import { Category } from "../../app/models/category"

export default async function handle(req, res) {
    const { method } = req

    if (method === 'POST') {
        const {name} = req.body
        const categoryDoc = await Category.create({name})
        res.json(categoryDoc)
    }
}