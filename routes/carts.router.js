import { Router } from "express";
import mongoose from "mongoose";
import CartsModel from "../config/models/carts.model.js";

import { requiereJwtCookie, requireRole, extractUserId } from '../middleware/auth.middleware.js'

const router = Router();
router.use(requiereJwtCookie,extractUserId);

//(OK)
// OBTIENE EL CARRITO ASOCIADO AL LOGIN.
router.get("/", async (req, res) => {
    try {
        const cart = await CartsModel.findOne({ user: req.userId }).populate("products.product").lean();

        if (!cart) {
            return res.status(404).json({ message: "There is no cart associated with the login" });
        }

        res.status(200).json({ message: "Carrito encontrado", cart });
    } catch (error) {
        console.error("Error getting cart:", error.message);
        res.status(500).json({ error: "Error getting cart." });
    }
});

//(OK)
// GENERA UN CARRITO ASOCIADO AL LOGIN.
router.post("/", async (req, res) => {
    try {
        const response = await CartsModel.create({
            user: req.userId,        // ← join cart with login
            products: []
        });

        if (response) {
            res.status(201).json({ status: "success", message: "cart created", cart: response });
        } else {
            res.status(404).json({ status: "failed", message: "cart not created" });
        }

    } catch (error) {
        console.error("Error creating cart:", error.message);
        res.status(500).json({ status: "error", error: error.message });
    }
});

//(OK)
//AGREGA UN PRODUCTO A UN CARRITO ASOCIADO AL LOGIN.
router.post("/product/:pid", async (req, res) => {
    try {
        const pid = req.params.pid;
        const cart = await CartsModel.findOne({ user: req.userId });

        if (!cart) {
            return res.status(404).json({ status: "failed", message: "There is no cart associated with the login." });
        }

        const productIndex = cart.products.findIndex(p => p.product.toString() === pid);

        if (productIndex !== -1) {
            cart.products[productIndex].quantity += 1;
        } else {
            cart.products.push({ product: pid, quantity: 1 });
        }

        const response = await cart.save();
        res.status(200).json({ status: "success", message: "Product add in cart.", cart: response });

    } catch (error) {
        console.error("Error adding product to cart:", error.message);
        res.status(500).json({ status: "error", error: error.message });
    }
});

//(OK)
//ELIMINA UN PRODUCTO DEL CARRITO ASOCIADO AL LOGIN
router.delete("/product/:pid", async (req, res) => {
    try {
        const pid = req.params.pid;
        const cart = await CartsModel.findOne({ user: req.userId });

        if (!cart) {
            return res.status(404).json({ status: "failed", message: "There is no cart associated with the login." });
        }

        const originalLength = cart.products.length;
        cart.products = cart.products.filter(p => p.product.toString() !== pid);

        if (cart.products.length === originalLength) {
            return res.status(404).json({ status: "failed", message: "No products found in the cart." });
        }

        const response = await cart.save();
        res.status(200).json({ status: "success", message: "Product removed from cart.", cart: response });

    } catch (error) {
        console.error("Error deleting product from cart:", error.message);
        res.status(500).json({ status: "error", error: error.message });
    }
});

//(OK)
//ELIMINA TODOS LOS PRODUCTOS DEL CARRITO ASOCIADO AL LOGIN
router.delete("/", async (req, res) => {
    try {
        const cart = await CartsModel.findOne({ user: req.userId });

        if (!cart) {
            return res.status(404).json({ status: "failed", message: "Cart not found for the user." });
        }

        cart.products = [];
        const response = await cart.save();

        res.status(200).json({ status: "success", message: "Products removed from the cart.", cart: response });

    } catch (error) {
        console.error("Error deleting products from the cart:", error.message);
        res.status(500).json({ status: "error", error: error.message });
    }
});

export default router;