import express from "express";
import {addTodo, getTodos, getTodosPagination, deleteTodo} from "../controllers/todoController.js";
import jsonwebtoken from "jsonwebtoken";
import Todo from "../models/Todo.js";

const router = express.Router();

//Envio de todos
router.post("/", addTodo);
//Tareas con los datos de usuario
router.get("/", getTodos);
//Tareas con paginacion
router.get("/pagination", getTodosPagination);
//Borrar todo
router.delete("/:id", deleteTodo);
//Actualizar todo protegido
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const token = req.headers["authorization"].split(" ")[1];
    if (!token) {
        return res.status(401).json({
            error: "Se necesita token de autenticación"
        });
    }
    try {

        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({
                error: "Token no válido"
            });
        }
        const todo = await Todo.findByIdAndUpdate(id, req.body, {
            new: true
        });
        res.json(todo);

    } catch (error) {
     
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                error: "Token expirado"
            });
        }else{
            console.log(error);
            return res.status(500).json({
                error: "Error interno"
            });
        }
    }
}
);

export default router;