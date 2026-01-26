import express from "express"
import {login, registration,logOut, googleLogin, adminLogin } from "../controller/authController.js"


const authRoutes = express.Router()

authRoutes.post("/registration", registration)
authRoutes.post("/login", login)
authRoutes.get("/logOut", logOut)
authRoutes.post("/googlelogin", googleLogin)
authRoutes.post("/adminlogin",adminLogin)

export default authRoutes;