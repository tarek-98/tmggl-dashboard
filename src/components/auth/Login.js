import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync, setIsLoggedIn } from "../../store/slices/authSlice";
import { Container, Row, Col } from "react-bootstrap";
import "./login.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { status, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(status);
  }, [status]);
  useEffect(() => {
    document.title = "لوحة التحكم";
  }, []);

  const handleLogin = async () => {
    try {
      await dispatch(loginAsync({ email, password }));
      // dispatch(setIsLoggedIn(true));
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="login login-container d-flex align-items-center justify-content-center vh-100">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={12} lg={12}>
            <Typography variant="h4" gutterBottom>
              تسجيل الدخول
            </Typography>
            <TextField
              label="الايميل"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="كلمة السر"
              variant="outlined"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <Typography
                variant="span"
                className="d-flex justify-content-end text-danger"
              >
                {error.message}
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleLogin}
              style={{ marginTop: "20px" }}
            >
              تسجيل الدخول
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
