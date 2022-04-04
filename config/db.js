import mongoose from "mongoose";

//Conectar ORM a la base de datos
const conectarDB = async () => {
  try {
    const conexion = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      `DB conectada en ${conexion.connection.host} , PUERTO: ${conexion.connection.port}`
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default conectarDB;
