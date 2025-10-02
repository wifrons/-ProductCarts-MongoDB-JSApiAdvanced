import { ProductMongoDAO } from "../dao/product.mongo.dao.js";

export class ProductService {
    constructor() {
        this.productDAO = new ProductMongoDAO();
    }
    async list(filter = {}, options = {}) {
        return await this.productDAO.getAll(filter, options);
    }

    async getById(id) { return this.productDAO.getById(id) }
    async create(dto) { return this.productDAO.create(dto) }
    async update(id, dto) { return this.productDAO.updateById(id, dto, { new: true }) }
    async delete(id) { return !!(await this.productDAO.deleteById(id)) }
}