import { CartDAO } from '../dao/cart.mongo.dao.js';
import { CartDTO } from '../dto/cart.dto.js';
import { TicketDAO } from '../dao/ticket.mongo.dao.js';
import { TicketDTO } from '../dto/ticket.dto.js';
import { ProductMongoDAO } from '../dao/product.mongo.dao.js';
import { generateUniqueCode } from '../utils/code.generator.js';
import { MailerService } from './mailer.service.js';


const ProductDAO = new ProductMongoDAO();


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
    },
    //COMPLETAR LA COMPRAR, GENERAR EL TICKET
    purchaseCart: async (userId) => {
        const cart = await CartDAO.findByUserIdWithProd(userId);

        if (!cart || cart.products.length === 0) throw new Error("Cart is empty");

        const available = [];
        const unavailable = [];
        let total = 0;

        for (const item of cart.products) {
            const product = item.product;
            if (product.stock >= item.quantity) {
                product.stock -= item.quantity;
                await ProductDAO.updateStock(product._id, product.stock - item.quantity);

                total += product.price * item.quantity;

                available.push({
                    product: product._id,
                    title: product.title,
                    price: product.price,
                    quantity: item.quantity,
                    subtotal: product.price * item.quantity
                });

            } else {
                unavailable.push({
                    product: product._id,
                    requested: item.quantity,
                    available: product.stock
                });
            }
        }

        if (available.length > 0) {
            const ticketData = {
                code: generateUniqueCode(),
                purchase_datetime: new Date(),
                amount: total,
                purchaser: cart.user.email,
                products: available
            };

            const ticket = await TicketDAO.createTicket(ticketData);
            await MailerService.sendPurchaseConfirmation(cart.user.email, ticket);

            cart.products = unavailable.map(u => ({
                product: u.product,
                quantity: u.available
            }));

            await CartDAO.saveCart(cart);
            return TicketDTO.formatTicketResponse(ticket, unavailable.length > 0 ? "Partial purchase" : "Complete purchase");
        } else {
            throw new Error("There are no products available for purchase.");
        }
    }

};