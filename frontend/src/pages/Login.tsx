import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import api from "../services/api";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate(); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", formData);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      }
    } catch (error: any) {
      alert(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card
        sx={{
          borderRadius: "16px",
          boxShadow: 5,
          width: "100%",
          maxWidth: 500,
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Welcome Back
          </Typography>
          <Typography
            variant="body1"
            align="center"
            gutterBottom
            sx={{ color: "#6b7280" }}
          >
            Sign in to access your account
          </Typography>
          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            <div className="mb-4">
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
              />
            </div>
            <div className="mb-4">
              <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
              />
            </div>
            <Button
              variant="contained"
              type="submit"
              fullWidth
              sx={{
                backgroundColor: "#2563eb",
                padding: "10px",
                fontSize: "16px",
                ":hover": { backgroundColor: "#1d4ed8" },
              }}
            >
              Sign In
            </Button>
          </form>
          <Typography onClick={()=> navigate('/')} className="cursor-pointer" variant="body2" align="center" sx={{ mt: 2 }}>
            Don't have an account?{" "} sign up
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;