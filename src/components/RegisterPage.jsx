import React, { useState } from "react";
import { TextField, Button, Container, Paper, Typography } from "@mui/material";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/auth/register", {
        username,
        email,
        password,
      });
      console.log("Response:", response.data);

      const { token } = response.data;

      // Store the token in localStorage
      localStorage.setItem("jwtToken", token);
      
      if (response.data.msg !== "User successfully registered")
        setMessage(response.data.msg);
      else {
        setMessage("");
      }
    } catch (error) {
      console.error("Registration failed:", error.response.data);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form onSubmit={handleRegister}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
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
            Sign up
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginPage;
