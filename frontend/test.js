import axios from "axios";

// test API auth login
const login = async () =>
  await axios.post(`http://localhost:8000/api/auth/login`, {
    email: "hung.bk.cs@gmail.com",
    password: "123456",
  });

const verify = async (accessToken, refreshToken) =>
  await axios.post(`http://localhost:8000/api/auth/verify-token`, {
    accessToken,
    refreshToken,
  });
