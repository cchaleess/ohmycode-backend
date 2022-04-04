import express from 'express';
import dotenv from 'dotenv';
import conectarDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import todoRoutes from './routes/todoRoutes.js';

const app = express();
app.use(express.json()); //Habilita el uso de JSON en las peticiones

dotenv.config();

conectarDB();

//Routing
app.use('/api/users', userRoutes);
app.use('/api/todos', todoRoutes);


//en produccion se usa una variable de entorno sino local
const PORT = process.env.PORT || 4000;


app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
    }
);

