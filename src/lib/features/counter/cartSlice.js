import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [], // Array to hold cart items
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log("Adding to cart:",action.payload);
      const { _id, name, price, offerPrice, image } = action.payload;
      const existingItem = state.cartItems.find((item) => item._id === _id);

      if (existingItem) {
        existingItem.quantity += 1; // Increment quantity if item exists
      } else {
        state.cartItems.push({ _id, name, price, offerPrice, image, quantity: 1 });
      }
    },

    removeFromCart: (state, action) => {
      const _id = action.payload;
      console.log("states:" ,state.cartItems)
      state.cartItems = state.cartItems

        .map((item) =>
          item._id === _id
            ? item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 } // Decrease quantity
              : null // Remove if quantity is 1
            : item
        )
        .filter((item) => item !== null); // Remove null items
    },
   clearCart: (state, action) => {
      state.cartItems = []
      
    },
  },
});

// Export actions
export const { addToCart, removeFromCart ,clearCart } = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;
