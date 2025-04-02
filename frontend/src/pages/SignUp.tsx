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

const SignUp: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/signup", formData);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard"); // Navigate to dashboard on successful signup
      }

      setFormData({ name: "", email: "", password: "" });
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
            Create Your Account
          </Typography>
          <Typography
            variant="body1"
            align="center"
            gutterBottom
            sx={{ color: "#6b7280" }}
          >
            Sign up to access all features
          </Typography>
          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            <div className="mb-4">
              <TextField
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
              />
            </div>
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
              Sign Up
            </Button>
            <Typography
              onClick={() => navigate("/login")}
              variant="body2"
              align="center"
              sx={{ mt: 2 }}
              className="cursor-pointer"
            >
              Already have an account? log in
            </Typography>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
