import User from "../models/User.js";
import generarJWT from "../helpers/generarJWT.js";

const registrar = async (req, res) => {
  //Evitar registro de usuarios duplicados
  const existeUsuario = await User.findOne({ username: req.body.username });
  if (existeUsuario) {
    const error = new Error("Usuario ya existe");
    return res.status(400).json({
      error: error.message,
    });
  }
  //Crear nuevo usuario
  try {
    const user = new User(req.body);
    const userSave = await user.save();
    res.json(userSave);
  } catch (error) {
    console.log(error);
  }
};

const autenticar = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        error: "Usuario no encontrado",
      });
    }

    if (await user.verifyPassword(password)) {
      res.json({
        _id: user._id,
        name: user.name,
        username: user.username,
        token: generarJWT(user),
      });
    } else {
      return res.status(400).json({
        error: "Contraseña incorrecta",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export { registrar, autenticar };
