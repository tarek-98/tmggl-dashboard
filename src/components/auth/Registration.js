import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { registerAsync } from "../../store/slices/authSlice";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await dispatch(registerAsync({ email, password }));
      navigate("/"); // Redirect to dashboard on successful registration
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="container">
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleRegister}
        style={{ marginTop: "20px" }}
      >
        Register
      </Button>
      <Typography variant="body2" style={{ marginTop: "10px" }}>
        Already have an account? <Link to="/login">Login here</Link>
      </Typography>
    </div>
  );
};

export default Registration;
