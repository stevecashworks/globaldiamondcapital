import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import appSlice from "./slices/appSlice";
import userSlice2 from "./userSlice";
import navSlice from "./navSlice";
import scrollSlice from "./scrollSlice";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'


const persistConfig = {
  key: 'root',
  storage,
};

const persistedUser = persistReducer(persistConfig, userSlice);
const persistedApp = persistReducer(persistConfig, appSlice);
const store = configureStore({
  reducer: {
    user: persistedUser,
    app: persistedApp,
    nav: navSlice,
    scroll: scrollSlice,
    user2: userSlice2,
  },
});
export const persistor=persistStore(store)

export default store;
