import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://tager.onrender.com";
const Authorization = localStorage.getItem("token");

// Define the initial state for authentication
const initialState = {
  isLoggedIn: false,
  admin: null,
  status: "idle",
  error: null,
  allAdmins: [],
  allSuperAdmins: [],
  token: localStorage.getItem("token") || null,
};

// Async thunk for user login
export const loginAsync = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/admin/super-admin-login/${email}/${password}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const logOut = createAsyncThunk("auth/logOut", async () => {
  fetch(`${API_URL}/admin/admin-logout`, {
    method: "POST",
    headers: {
      Authorization: `${Authorization}`,
      // "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.error("Error logging out:", error));
});

export const addAdmin = createAsyncThunk(
  "auth/addAdmin",
  async ({ id, email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/admin/new-admin/${id}`,
        {
          Email: email,
          Password: password,
        },
        {
          headers: {
            Authorization: `${Authorization}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addSuperAdmin = createAsyncThunk(
  "auth/superAdmin",
  async ({ id, email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/admin/new-super-admin/${id}`,
        {
          Email: email,
          Password: password,
        },
        {
          headers: {
            Authorization: `${Authorization}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllAdmins = createAsyncThunk(
  "auth/getAllAdmins",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/admin/all-admins/${id}`, {
        headers: {
          Authorization: `${Authorization}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getAllSuperAdmins = createAsyncThunk(
  "auth/getAllSuperAdmins",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/admin/all-super-admins/${id}`,
        {
          headers: {
            Authorization: `${Authorization}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteAdmin = createAsyncThunk(
  "auth/deleteAdmin",
  async ({ id, delId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${API_URL}/admin/admin/${delId}/${id}`,
        {
          headers: {
            Authorization: `${Authorization}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLoggedIn = true;
        state.token = action.payload.JWT;
        state.admin = action.payload;
        localStorage.setItem("token", action.payload.JWT);
        localStorage.setItem("isLoggedIn", true);
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = "failed to logIn";
        state.error = action.payload;
      })
      .addCase(logOut.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLoggedIn = false;
        localStorage.setItem("isLoggedIn", false);
      })
      .addCase(logOut.rejected, (state, action) => {
        state.status = "failed";
        state.error = "failed to logOut";
      })
      .addCase(addAdmin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addAdmin.fulfilled, (state, action) => {
        state.status = "Admin Added";
      })
      .addCase(addAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = "failed to add admin";
      })
      .addCase(addSuperAdmin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addSuperAdmin.fulfilled, (state, action) => {
        state.status = "super Admin Added";
      })
      .addCase(addSuperAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = "failed to add admin";
      })
      .addCase(getAllAdmins.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllAdmins.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allAdmins = action.payload.result;
      })
      .addCase(getAllAdmins.rejected, (state, action) => {
        state.status = "failed";
        state.error = "failed to load all admins";
      })
      .addCase(getAllSuperAdmins.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllSuperAdmins.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allSuperAdmins = action.payload.result;
      })
      .addCase(getAllSuperAdmins.rejected, (state, action) => {
        state.status = "failed";
        state.error = "failed to all super admins";
      })
      .addCase(deleteAdmin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteAdmin.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(deleteAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = "failed to delete admin";
      });
  },
});

export const { setIsLoggedIn } = authSlice.actions;
export const allAdmins = (state) => state.auth.allAdmins;
export const allSuperAdmins = (state) => state.auth.allSuperAdmins;

export default authSlice.reducer;
