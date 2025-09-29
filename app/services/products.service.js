import Product from "../../config/models/product.model.js";

export class ProductService {
    async list() { return Product.find() }
    async getById(id) { return Product.findById(id) }
    async create(dto) { return Product.create(dto) }
    async update(id, dto) { return Product.findByIdAndUpdate(id, dto, { new: true }) }
    async delete(id) { return !!(await Product.findByIdAndDelete(id)) }
}