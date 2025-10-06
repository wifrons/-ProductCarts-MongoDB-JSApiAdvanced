import mongoose from "mongoose";

const productsCollection = "Product";

const productsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: Number, default: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    thumbnails: { type: Array, required: true }
},
    { versionKey: false });

const productsModel = mongoose.model(productsCollection, productsSchema);

export default productsModel;