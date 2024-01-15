import React, { useState } from "react";
import { TextField, Button, Container, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/auth/login", {
        email,
        password,
      });
      console.log("Response:", response.data);

      const { token } = response.data;

      // Store the token in localStorage
      localStorage.setItem("jwtToken", token);

      if (response.data.msg !== "Login successful")
        setMessage(response.data.msg);
      else {
        setMessage("");
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error.response.data);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Username or Email"
            name="email"
            autoComplete="Username or email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p
            style={
              message !== "" || message !== null
                ? { color: "red", marginTop: 20, marginBottom: 20 }
                : { display: "hidden" }
            }
          >
            {message}
          </p>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginPage;
