import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://tager.onrender.com";
const Authorization = localStorage.getItem("token");

export const getOrdersNumber = createAsyncThunk(
  "orders/getOrdersNumber",
  async () => {
    const response = await axios.get(`${API_URL}/order/numberoforders`);
    return response.data;
  }
);
export const getProductsNumber = createAsyncThunk(
  "products/getProductsNumber",
  async () => {
    const response = await axios.get(`${API_URL}/products/numberofproducts`);
    return response.data;
  }
);
export const getVendorsNumber = createAsyncThunk(
  "vendors/getVendorsNumber",
  async () => {
    const response = await axios.get(`${API_URL}/vendor/numberofvendors`);
    return response.data;
  }
);
export const getUsersNumber = createAsyncThunk(
  "users/getUsersNumber",
  async (id) => {
    const response = await axios.get(`${API_URL}/admin/clients-num/${id}`, {
      headers: {
        Authorization: `${Authorization}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  }
);

const statisticsSlice = createSlice({
  name: "statistics",
  initialState: {
    loading: false,
    ordersNumber: [],
    ProductsNumber: [],
    VendorsNumber: [],
    UsersNumber: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersNumber.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrdersNumber.fulfilled, (state, action) => {
        state.ordersNumber = action.payload;
        state.loading = false;
      })
      .addCase(getOrdersNumber.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getProductsNumber.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductsNumber.fulfilled, (state, action) => {
        state.ProductsNumber = action.payload;
        state.loading = false;
      })
      .addCase(getProductsNumber.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getVendorsNumber.pending, (state) => {
        state.loading = true;
      })
      .addCase(getVendorsNumber.fulfilled, (state, action) => {
        state.VendorsNumber = action.payload;
        state.loading = false;
      })
      .addCase(getVendorsNumber.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getUsersNumber.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsersNumber.fulfilled, (state, action) => {
        state.UsersNumber = action.payload;
        state.loading = false;
      })
      .addCase(getUsersNumber.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const getAllOrders = (state) => state.statistics.ordersNumber;
export const getAllProducts = (state) => state.statistics.ProductsNumber;
export const getAllVendors = (state) => state.statistics.VendorsNumber;
export const getAllClients = (state) => state.statistics.UsersNumber;
export default statisticsSlice.reducer;
