import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage
import userReducer from './slices/userSlice';
import navSlice from './navSlice';
import scrollSlice from './scrollSlice';
const persistConfig = {
  key: 'root',
  storage,
};

const persistedUser = persistReducer(persistConfig, userReducer);





const store=configureStore({
    reducer:{
        nav:navSlice,
        scroll:scrollSlice,
        user:persistedUser
    }
})

export const persist = persistStore(store);
const storeExports={store, persist} 
export default store;
