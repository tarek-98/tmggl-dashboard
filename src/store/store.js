import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import usersReducer from "./slices/usersSlice";
import vendorsReducer from "./slices/vendorsSlice";
import ordersReducer from "./slices/ordersSlice";
import authReducer from "./slices/authSlice";
import statisticsReducer from "./slices/statisticsSlice";
import couponsSlice from "./slices/couponsSlice";
import mapReducer from "./slices/mapSlice";
import sendMailReducer from "./slices/sendMail";
import commentsSlice from "./slices/commentSlice";
import shippingReducer from "./slices/shippingSlice";
import tabbySlice from "./slices/tabbySlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    users: usersReducer,
    vendors: vendorsReducer,
    orders: ordersReducer,
    auth: authReducer,
    statistics: statisticsReducer,
    coupons: couponsSlice,
    map: mapReducer,
    sendMail: sendMailReducer,
    comments: commentsSlice,
    shipping: shippingReducer,
    payments: tabbySlice,
  },
});
