import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://tager-dpsl.onrender.com";
const Authorization = localStorage.getItem("token");

export const getVendors = createAsyncThunk("users/getVendors", async () => {
  const response = await axios.get(`${API_URL}/admin/all-vendors`);
  console.log(response.data);
  return response.data;
});

export const getRequestVendors = createAsyncThunk(
  "users/getRequestVendors",
  async (id) => {
    const response = await axios.get(
      `${API_URL}/admin/new-vendors-requests/${id}`,
      {
        headers: {
          Authorization: `${Authorization}`,
          // "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    return response.data;
  }
);

export const getEditVendors = createAsyncThunk(
  "users/getEditVendors",
  async (id) => {
    const response = await axios.get(
      `${API_URL}/admin/edit-vendors-requests/${id}`,
      {
        headers: {
          Authorization: `${Authorization}`,
          // "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    return response.data;
  }
);

export const delVendor = createAsyncThunk("users/delVendor", async (id) => {
  const response = await axios.get(`${API_URL}/vendor/vendor/${id}`, {
    headers: {
      Authorization: `${Authorization}`,
      // "Content-Type": "application/json",
    },
  });
  console.log(response.data);
  return response.data;
});

const vendorsSlice = createSlice({
  name: "vendors",
  initialState: {
    vendors: [],
    requetedVendors: [],
    editedVendors: [],
    status: "",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVendors.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getVendors.fulfilled, (state, action) => {
        state.vendors = action.payload.result;
        state.status = "sucessed";
      })
      .addCase(getVendors.rejected, (state) => {
        state.status = "failed";
        state.error = "failed";
      })
      .addCase(getRequestVendors.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getRequestVendors.fulfilled, (state, action) => {
        state.requetedVendors = action.payload.result;
        state.status = "sucessed";
      })
      .addCase(getRequestVendors.rejected, (state) => {
        state.status = "failed";
        state.error = "failed";
      })
      .addCase(getEditVendors.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getEditVendors.fulfilled, (state, action) => {
        state.editedVendors = action.payload.result;
        state.status = "sucessed";
      })
      .addCase(getEditVendors.rejected, (state) => {
        state.status = "failed";
        state.error = "failed";
      })

      .addCase(delVendor.pending, (state) => {
        state.status = "loading";
      })
      .addCase(delVendor.fulfilled, (state, action) => {
        state.status = "vendor deleted";
      })
      .addCase(delVendor.rejected, (state) => {
        state.status = "failed";
        state.error = "failed";
      });
  },
});

export const getAllVendors = (state) => state.vendors.vendors;
export const getAllRequestedVendors = (state) => state.vendors.requetedVendors;
export const getAllEditedVendors = (state) => state.vendors.editedVendors;

export default vendorsSlice.reducer;
