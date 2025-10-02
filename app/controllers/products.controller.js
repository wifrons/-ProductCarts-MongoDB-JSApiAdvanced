import mongoose from "mongoose";
import { ProductService } from '../services/products.service.js';
import { toCreateProductDTO, toUpdateProductDTO } from "../dto/products.dto.js";

const svc = new ProductService();

export const productController = {
    list: async (_req, res, next) => {
        try { res.json(await svc.list()) } catch (e) { next(e); }
    },
    get: async (req, res, next) => {
        try {
            const { id } = req.params;
            if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID." })
            const doc = await svc.getById(id);
            return doc ? res.json(doc) : res.status(404).json({ error: "ID Not found." })
        } catch (e) { next(e); }
    },
    create: async (req, res, next) => {
        try {
            const dto = toCreateProductDTO(req.body);
            const productCreated = await svc.create(dto);
            res.status(201).json({ NewProduct: productCreated });
        } catch (e) { next(e); }
    },
    update: async (req, res, next) => {
        try {
            const { id } = req.params;
            if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID." })
            const dto = toUpdateProductDTO(req.body);
            const productUpdated = await svc.update(id, dto);
            return productUpdated ? res.json({ UpdateProduct: productUpdated }) : res.status(404).json({ error: "ID Not found." })
        } catch (e) { next(e); }
    },
    remove: async (req, res, next) => {
        try {
            const { id } = req.params;
            if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID." })
            const ok = await svc.delete(id);
            return ok ? res.status(204).end() : res.status(404).json({ error: "ID Not found." })
        } catch (e) { next(e); }
    }
}
