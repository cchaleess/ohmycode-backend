import { request } from "express";
import Todo from "../models/Todo.js";
import User from "../models/User.js";

//Agregar todo
const addTodo = async (req, res) => {

    //Comprobar que el usuario existe
    const { user } = req.body;
    const existeUser = await User.findById({ _id : user });
    console.log(existeUser);
    if (!existeUser) {
        return res.status(400).json({
            error: "Usuario no encontrado"
        });
    }
    //Crear nuevo todo

    try {
        const todo = await Todo.create(req.body);
        res.json(todo);
    } catch (error) {
        
    }

}
//Obtener todos los todos con el nombre de usuario
const getTodos = (req, res) => {

    Todo.find({})
        .populate("user") //join de usuario
        .exec((err, todos) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(todos);
        }
    );
}
//Obtener todos con pagination
const getTodosPagination = (req, res) => { 
    
    Todo.find({createdAt: {$gte: new Date(Date.now() - 86400000)}})    
    .limit(3).sort({createdAt: -1})
        .populate("user") //join de usuario
        .exec((err, todos) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(todos);
        }
    );

}
//Borrar todo
const deleteTodo = (req, res) => {
    Todo.findByIdAndDelete(req.params.id, (err, todo) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({
            message: "Todo borrado"
        });
    }
    );
}

export {
    addTodo,
    getTodos,
    getTodosPagination,
    deleteTodo
}