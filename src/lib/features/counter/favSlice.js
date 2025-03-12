import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favItems: [], // Array to hold favorite items
};

export const favSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    // Add or Remove product from favorites
    addToFav: (state, action) => {
      const { _id, favouriteStatus, quantity, img, productName, offerPrice, price ,category } = action.payload;
      console.log("Action_Payload", action.payload); // Debugging payload

      const existingProduct = state.favItems.find(item => item._id === _id);

      if (favouriteStatus) {
        // If the product is being added to favorites
        if (!existingProduct) {
          state.favItems.push({ _id, quantity, img, productName, offerPrice, price, favouriteStatus ,category });
        }
      } else {
        // If the product is being removed from favorites
        state.favItems = state.favItems.filter(item => item._id !== _id);
      }

      console.log("favItems", state.favItems); // Debugging the updated favItems
    },
    
    
  },
});

// Export actions
export const { addToFav } = favSlice.actions;

// Export reducer
export default favSlice.reducer;
