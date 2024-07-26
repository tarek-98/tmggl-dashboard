import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://tager.onrender.com";
const Authorization = localStorage.getItem("token");

export const getProducts = createAsyncThunk("products/fetch", async () => {
  const response = await axios.get(`${API_URL}/products/getall`, {
    headers: {
      authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiV2VkIE1heSAyMiAyMDI0IDE5OjM5OjI5IEdNVCswMzAwICjYqtmI2YLZitiqINi02LHZgiDYo9mI2LHZiNio2Kcg2KfZhNi12YrZgdmKKSIsInVzZXJJZCI6IjY2NGEzNTQ2Njk4NTVkNmM3OGJhZjEyNiIsImlhdCI6MTcxNjM5NTk2OX0.MgCtXcPKZQwFHNmZ_eesNTi4oqDxCg4-kulBDIY8kXA`,
      "Content-Type": "application/json",
    },
  });
  console.log(response.data);
  return response.data;
});
export const getRequestProducts = createAsyncThunk(
  "requestProducts/fetch",
  async () => {
    const response = await axios.get(`${API_URL}/products/pendingproducts`, {
      // headers: {
      //   Authorization: `${Authorization}`,
      //   "Content-Type": "application/json",
      // },
    });
    console.log(response.data);
    return response.data;
  }
);

// getting the single product data also
export const fetchAsyncProductSingle = createAsyncThunk(
  "product-single/fetch",
  async (id) => {
    // const response = await fetch(`${API_URL}/products/product/${id}`);
    const response = await fetch(
      `${API_URL}/client/view-productByProductId/${id}`
    );
    const data = await response.json();
    return data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    requestProducts: [],
    productSingle: [],
    productSingleStatus: "idle",
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(getProducts.rejected, (state) => {
        state.loading = false;
      })

      .addCase(getRequestProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRequestProducts.fulfilled, (state, action) => {
        state.requestProducts = action.payload;
        state.loading = false;
      })
      .addCase(getRequestProducts.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchAsyncProductSingle.pending, (state, action) => {
        state.productSingleStatus = "loading";
      })

      .addCase(fetchAsyncProductSingle.fulfilled, (state, action) => {
        state.productSingle = action.payload;
        state.productSingleStatus = "succeeded";
      })

      .addCase(fetchAsyncProductSingle.rejected, (state, action) => {
        state.productSingleStatus = "failed";
      });
  },
});

export const getAllProducts = (state) => state.products.products;
export const getProductSingle = (state) => state.products.productSingle;
export const getAllRequestedProducts = (state) =>
  state.products.requestProducts;
export default productsSlice.reducer;
