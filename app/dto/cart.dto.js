import mongoose from 'mongoose';

export const CartDTO = {
  validateProductId: (pid) => {
    if (!mongoose.Types.ObjectId.isValid(pid)) {
      throw new Error("Invalid product ID");
    }
    return pid;
  },

formatCartWithProductInfo: (cart, message = "Cart retrieved") => {
    const transformedProducts = cart.products.map(p => ({
      _id: p._id,
      product: p.product._id?.toString() || p.product.toString(),
      code: p.product.code || null,
      quantity: p.quantity
    }));

    return {
      status: "success",
      message,
      cart: {
        _id: cart._id,
        user: cart.user,
        products: transformedProducts
      }
    };
  },

  formatCartResponse: (cart, message = "Cart retrieved") => ({
    status: "success",
    message,
    cart
  })
};