import { configureStore } from "@reduxjs/toolkit";
import  userSlice  from "./slices/userSlice";
import productDetailSlice from "./slices/productDetailSlice";
import productSlice from "./slices/productSlice";
import CartSlice from "./slices/cartSlices";
import orderHistorySlice from "./slices/orderHistorySlice";
import orderSlice from "./slices/orderSlice";

const store = configureStore({
    reducer: {
        userState: userSlice,
        productDetailState: productDetailSlice,
        productState: productSlice,
        cartState:CartSlice,
        orderHistoryState:orderHistorySlice,
        orderState: orderSlice
    },
});

export default store;