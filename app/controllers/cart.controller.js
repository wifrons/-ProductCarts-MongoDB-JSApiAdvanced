import { CartService } from '../services/cart.service.js';

export const CartController = {
    getCart: async (req, res) => {
        try {
            const result = await CartService.getCart(req.userId);
            res.status(200).json(result);
        } catch (error) {
            res.status(404).json({ status: "failed", message: error.message });
        }
    },

    createCart: async (req, res) => {
        try {
            const result = await CartService.createCart(req.userId);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ status: "error", message: error.message });
        }
    },

    addProduct: async (req, res) => {
        try {
            const result = await CartService.addProductToCart(req.userId, req.params.pid);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ status: "error", message: error.message });
        }
    },

    removeProduct: async (req, res) => {
        try {
            const result = await CartService.removeProductFromCart(req.userId, req.params.pid);
            res.status(200).json(result);
        } catch (error) {
            res.status(404).json({ status: "failed", message: error.message });
        }
    },

    clearCart: async (req, res) => {
        try {
            const result = await CartService.clearCart(req.userId);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ status: "error", message: error.message });
        }
    },

    purchaseCart: async (req, res) => {
        try {
            const result = await CartService.purchaseCart(req.userId);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ status: "error", message: error.message });
        }
    }
};