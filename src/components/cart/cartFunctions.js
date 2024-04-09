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
    const removedProduct = cart[existingProductIndex];
    removedProduct.quantity--; // Reduce la cantidad en 1
    
    if (removedProduct.quantity <= 0) {
      cart.splice(existingProductIndex, 1); // Elimina el producto si la cantidad es menor o igual a 0
    }

    console.log('Product removed from cart:', removedProduct);
    return removedProduct; // Devuelve el producto eliminado
  }

  return null; // Indica que el producto no se encontró en el carrito
};


  

export const getCart = () => {
  return cart;
};

export const clearCart = (setCartItems) => {
  cart = [];
  setCartItems([]);
};

export const getTotalPrice = () => {
    let totalPrice = 0;
  
    cart.forEach((item) => {
      totalPrice += item.precio * item.quantity;
    });
  
    return totalPrice;
  };