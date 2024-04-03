let cart = [];

export const addToCart = (product) => {
  const existingProductIndex = cart.findIndex((item) => item._id === product._id);

  if (existingProductIndex !== -1) {
    cart[existingProductIndex].quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
};

export const removeFromCart = (productId) => {
    const existingProductIndex = cart.findIndex((item) => item._id === productId);
  
    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity--;
  
      if (cart[existingProductIndex].quantity <= 0) {
        cart.splice(existingProductIndex, 1);
      }
    }
  
    console.log('Product removed from cart:', productId);
  };
  

export const getCart = () => {
  return cart;
};

export const clearCart = () => {
  cart = [];
};

export const getTotalPrice = () => {
    let totalPrice = 0;
  
    cart.forEach((item) => {
      totalPrice += item.precio * item.quantity;
    });
  
    return totalPrice;
  };