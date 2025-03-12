import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counter/counterSlice'    
import cartReducer from './features/counter/cartSlice' 
import  favReducer  from './features/counter/favSlice'
import { Api } from './api';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    counter: counterReducer,  // Now your Redux state has "counter"
    cart: cartReducer, // Now your Redux state has "cart"
    favourites: favReducer, // Now your Redux state has "fav"
    
    
    [Api.reducerPath]: Api.reducer, 
  },
  middleware: (getDefaultMiddleware) =>{
    return getDefaultMiddleware().concat(Api.middleware)
  },
});
setupListeners (store.dispatch);