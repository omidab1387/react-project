import { create } from "zustand";

const useCartStore = create((set, get) => ({
  cart: [],

  addToCart: (id) => {
    const cart = get().cart;

    const foundIndex = cart.findIndex((item) => item.id === id);

    if (foundIndex !== -1) {
      const newCart = [...cart];

      newCart[foundIndex] = {
        ...newCart[foundIndex],
        quantity: newCart[foundIndex].quantity + 1,
      };

      set({ cart: newCart });
      return;
    }

    set({
      cart: [
        ...cart,
        {
          id,
          quantity: 1,
        },
      ],
    });
  },

  removeFromCart: (id) => {
    const cart = get().cart;

    const foundIndex = cart.findIndex((item) => item.id === id);

    if (foundIndex === -1) return;

    const newCart = [...cart];

    if (newCart[foundIndex].quantity > 1) {
      newCart[foundIndex] = {
        ...newCart[foundIndex],
        quantity: newCart[foundIndex].quantity - 1,
      };

      set({ cart: newCart });
    } else {
      set({
        cart: newCart.filter((item) => item.id !== id),
      });
    }
  },
}));

export default useCartStore;