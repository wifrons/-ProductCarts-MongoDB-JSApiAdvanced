import CartsModel from '../../config/models/carts.model.js';

export const CartDAO = {
  findByUserIdWithProd: async (userId) => CartsModel.findOne({ user: userId }).populate("products.product").lean(),
  createCart: async (userId) => CartsModel.create({ user: userId, products: [] }),
  findByUserId: async (userId) => CartsModel.findOne({ user: userId }),
  saveCart: async (cart) => cart.save()
};