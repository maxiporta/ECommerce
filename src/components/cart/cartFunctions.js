let cart = [];

export const addToCart = (product) => {
  const existingProductIndex = cart.findIndex((item) => item._id === product._id);

  if (existingProductIndex !== -1) {
    cart[existingProductIndex].quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  console.log('Product added to cart:', product);
};

export const getCart = () => {
  return cart;
};

export const clearCart = () => {
  cart = [];
};
