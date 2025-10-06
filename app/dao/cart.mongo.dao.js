import CartsModel from '../../config/models/carts.model.js';

export const CartDAO = {

  findByUserIdWithProd: async (userId) => {
    return await CartsModel
      .findOne({ user: userId })
      .populate('products.product')
      .populate('user')
      .lean()
  },

  createCart: async (userId) => CartsModel.create({ user: userId, products: [] }),
  findByUserId: async (userId) => CartsModel.findOne({ user: userId }),
  saveCart: async (cart) => {
    return await CartsModel.findByIdAndUpdate(cart._id, cart, { new: true });
  }

};