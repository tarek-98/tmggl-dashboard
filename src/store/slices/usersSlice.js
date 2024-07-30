import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://tager-dpsl.onrender.com";
const Authorization = localStorage.getItem("token");

export const getUsers = createAsyncThunk("users/getUsers", async (id) => {
  const response = await axios.get(`${API_URL}/admin/all-clients/${id}`, {
    headers: {
      Authorization: `${Authorization}`,
      // "Content-Type": "application/json",
    },
  });
  console.log(response.data);
  return response.data;
});

export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  const response = await axios.delete(
    `${API_URL}/client/client-account/${id}`,
    {
      headers: {
        Authorization: `${Authorization}`,
        // "Content-Type": "application/json",
      },
    }
  );
  console.log(response.data);
  return response.data;
});

const usersSlice = createSlice({
  name: "users",
  initialState: { users: [], loading: false },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload.data;
        state.loading = false;
      })
      .addCase(getUsers.rejected, (state) => {
        state.loading = false;
      })

      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const getAllClients = (state) => state.users.users;
export default usersSlice.reducer;
