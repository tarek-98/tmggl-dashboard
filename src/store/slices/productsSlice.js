import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://tager-dpsl.onrender.com";
const Authorization = localStorage.getItem("token");

export const getProducts = createAsyncThunk("products/fetch", async () => {
  const response = await axios.get(`${API_URL}/products/getall`);
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

export const updateStatus = createAsyncThunk(
  "updateStatus/fetch",
  async ({ vendorEmail, productId, newStatus }) => {
    const response = await axios.patch(
      `${API_URL}/products/editstatus/${vendorEmail}`,
      { productId, newStatus }
    );
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
    statusUpdate: "idle",
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
      })

      .addCase(updateStatus.pending, (state, action) => {
        state.statusUpdate = "loading";
      })

      .addCase(updateStatus.fulfilled, (state, action) => {
        state.statusUpdate = "succeeded";
      })

      .addCase(updateStatus.rejected, (state, action) => {
        state.statusUpdate = "failed";
      });
  },
});

export const getAllProducts = (state) => state.products.products;
export const getProductSingle = (state) => state.products.productSingle;
export const getAllRequestedProducts = (state) =>
  state.products.requestProducts;
export default productsSlice.reducer;
