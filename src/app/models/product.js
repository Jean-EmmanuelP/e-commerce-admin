const ProductSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true }
});

const Product = model('product', ProductSchema)