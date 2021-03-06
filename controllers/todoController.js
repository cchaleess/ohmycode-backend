import Todo from "../models/Todo.js";
import User from "../models/User.js";

//Agregar todo
const addTodo = async (req, res) => {
  const { user } = req.body;
  const existeUser = await User.findById({ _id: user });
  if (!existeUser) {
    return res.status(400).json({
      error: "Usuario no encontrado",
    });
  }
  //Crear nuevo todo
  try {
    const todo = await Todo.create(req.body);
    res.json(todo);
  } catch (error) {}
};

const getTodos = (req, res) => {
  Todo.find({})
    .populate("user") //join de usuario
    .exec((err, todos) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(todos);
    });
};
const getTodosPagination = (req, res) => {
  Todo.find({ createdAt: { $gte: new Date(Date.now() - 86400000) } })
    .limit(3)
    .sort({ createdAt: -1 })
    .populate("user") //join de usuario
    .exec((err, todos) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(todos);
    });
};

//Borrar todo
const deleteTodo = (req, res) => {
  try {
    Todo.findByIdAndDelete(req.params.id, (err, todo) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json({
        message: "Todo borrado",
      });
    });
  } catch (error) {
    console.log(error);
  }
};
//Obtener todo por id de usuario
const getTodoById = (req, res) => {
  Todo.find({ user: req.params.id })
    .populate("user") //join de usuario
    .exec((err, todo) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(todo);
    });
};

export { addTodo, getTodos, getTodosPagination, deleteTodo, getTodoById };
