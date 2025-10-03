// services/cart.service.js
import { CartDAO } from '../dao/cart.mongo.dao.js';
import { CartDTO } from '../dto/cart.dto.js';

export const CartService = {
    // OBTIENE EL CARRITO ASOCIADO AL LOGIN.
    getCart: async (userId) => {
        const cart = await CartDAO.findByUserIdWithProd(userId); // ← con populate
        if (!cart) throw new Error("Cart not found");
        return CartDTO.formatCartWithProductInfo(cart, "Carrito encontrado");
    },
    // GENERA UN CARRITO ASOCIADO AL LOGIN.
    createCart: async (userId) => {
        const cart = await CartDAO.createCart(userId);
        if (!cart) throw new Error("Cart creation failed");
        return CartDTO.formatCartResponse(cart, "Cart created");
    },
    //AGREGA UN PRODUCTO A UN CARRITO ASOCIADO AL LOGIN.
    addProductToCart: async (userId, pid) => {
        const productId = CartDTO.validateProductId(pid);
        const cart = await CartDAO.findByUserId(userId);
        if (!cart) throw new Error("There is no cart associated with the login.");

        const index = cart.products.findIndex(p => p.product.toString() === productId);
        if (index !== -1) {
            cart.products[index].quantity += 1;
        } else {
            cart.products.push({ product: productId, quantity: 1 });
        }

        const updatedCart = await CartDAO.saveCart(cart);
        return CartDTO.formatCartResponse(updatedCart, "Product added to cart");
    },
    //ELIMINA UN PRODUCTO DEL CARRITO ASOCIADO AL LOGIN
    removeProductFromCart: async (userId, pid) => {
        const productId = CartDTO.validateProductId(pid);
        const cart = await CartDAO.findByUserId(userId);
        if (!cart) throw new Error("There is no cart associated with the login.");

        const originalLength = cart.products.length;
        cart.products = cart.products.filter(p => p.product.toString() !== productId);

        if (cart.products.length === originalLength) throw new Error("Product not found in cart");

        const updatedCart = await CartDAO.saveCart(cart);
        return CartDTO.formatCartResponse(updatedCart, "Product removed from cart");
    },
    //ELIMINA TODOS LOS PRODUCTOS DEL CARRITO ASOCIADO AL LOGIN
    clearCart: async (userId) => {
        const cart = await CartDAO.findByUserId(userId);
        if (!cart) throw new Error("Cart not found");

        cart.products = [];
        const updatedCart = await CartDAO.saveCart(cart);
        return CartDTO.formatCartResponse(updatedCart, "Cart cleared");
    }
};