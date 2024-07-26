import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchOrders } from "../../api/api";

const API_URL = "https://tager.onrender.com";

export const getOrders = createAsyncThunk("orders/getOrders", async () => {
  const response = await fetchOrders();
  return response.data;
});
export const fetchSingleOrder = createAsyncThunk(
  "singleOrder/fetchOrder",
  async (id) => {
    const res = await fetch(`${API_URL}/orders/${id}`);
    const data = await res.json();
    return data;
  }
);
const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    singleOrder: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(fetchSingleOrder.fulfilled, (state, action) => {
        state.singleOrder = action.payload;
      });
  },
});
export const getAllOrders = (state) => state.orders.orders;
export const getSingleOrder = (state) => state.orders.singleOrder;
export default ordersSlice.reducer;
