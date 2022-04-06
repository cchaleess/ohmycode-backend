import express from "express";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import cors from "cors";

const app = express();

app.use(express.json()); //Habilita el uso de JSON en las peticiones

dotenv.config();

conectarDB();

//Habilitar Cors
const whiteList = ["http://localhost:3000", "http://localhost:3001"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));

//Routing
app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);

//en producción se usa una variable de entorno sino local
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
