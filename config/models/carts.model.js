import mongoose from "mongoose";

const cartsCollection = "Cart";

const cartsSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, default: 1 }
        }
    ]
},
    { versionKey: false });


const cartsModel = mongoose.model(cartsCollection, cartsSchema);

export default cartsModel;