import express from "express";
const router = express.Router();
import { registrar, autenticar } from "../controllers/userController.js";


//Autenticacion  y registro de usuarios

router.post("/", registrar); //crear usuario
router.post("/login", autenticar); //login




export default router;