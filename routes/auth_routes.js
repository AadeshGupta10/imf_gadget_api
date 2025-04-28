const express = require("express")

const { handleLogin, handleRegisteration } = require("../controllers/auth_controller");
const credentialGuard = require("../middleware/credentialGuard");

const authRoutes = express.Router();

authRoutes
    .post("/register", credentialGuard, handleRegisteration)
    .post("/login", credentialGuard, handleLogin)

module.exports = authRoutes