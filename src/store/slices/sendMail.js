// src/features/coupons/couponsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://tager-dpsl.onrender.com";
const Authorization = localStorage.getItem("token");

export const mailToAllVendors = createAsyncThunk(
  "coupons/fetchCoupons",
  async ({ id, subject, text }) => {
    const response = await axios.post(
      `${API_URL}/admin/send-mail-vendors/${id}`,
      { subject, text },
      {
        headers: {
          Authorization: `${Authorization}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  }
);

export const mailToAllClient = createAsyncThunk(
  "coupons/addCoupon",
  async ({ id, subject, text }) => {
    const response = await axios.post(
      `${API_URL}/admin/send-mail-clients/${id}`,
      { subject, text },
      {
        headers: {
          Authorization: `${Authorization}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  }
);

const sendMail = createSlice({
  name: "sendMail",
  initialState: {
    status: "idle",
    error: null,
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(mailToAllVendors.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(mailToAllVendors.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
      })
      .addCase(mailToAllVendors.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(mailToAllClient.pending, (state, action) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(mailToAllClient.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
      })
      .addCase(mailToAllClient.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
      });
  },
});

export default sendMail.reducer;
