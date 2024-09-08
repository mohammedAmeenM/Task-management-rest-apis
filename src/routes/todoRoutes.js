const express =require('express')
const todoController = require('../controllers/todoController');
const verifyToken = require('../middlewares/verifyToken');
const todoRoutes = express.Router()


todoRoutes.post('/',verifyToken,todoController.createTodo)
.get('/',verifyToken,todoController.getTodos)
.get('/:id',verifyToken,todoController.getTodoById)
.put('/:id',verifyToken,todoController.updateTodo)
.delete('/:id',verifyToken,todoController.deleteTodo)
.patch('/:id/status', verifyToken, todoController.updateTodoStatus);   


module.exports=todoRoutes