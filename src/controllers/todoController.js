const Todo = require('../models/todoSchema');

// create a new todo-------------------------------
const createTodo = async (req, res, next) => {
  try {
    const data = req.body;

    // validate request body-------------------
    if (!data) {
      return res.status(400).json({
        status: "failure",
        message: "Bad request",
      });
    }

    const todo = new Todo({ ...data });

    await todo.save();

    res.status(201).json({
      status: "success",
      message: "Successfully created",
      todo,
    });
  } catch (error) {
    next(error); 
  }
};

//get all todos-------------------------
const getTodos= async (req, res) => {
  try {
      const { sortBy } = req.query;
      let sortOptions = {};

      switch (sortBy) {
          case 'recent':
              sortOptions = { createdAt: -1 }; 
              break;
          case 'oldest':
              sortOptions = { createdAt: 1 };
              break;
          case 'alphabetical':
              sortOptions = { title: 1 };
              break;
          default:
              sortOptions = { createdAt: -1 }; 
              break;
      }

      const todos = await Todo.find().sort(sortOptions);
      res.json({ todos });
  } catch (error) {
      console.error('Error fetching todos:', error);
      res.status(500).send('Server Error');
  }
}


// eet a single todo by ID----------------------
const getTodoById = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        status: "failure",
        message: "Todo not found",
      });
    }

    res.status(200).json({
      status: "success",
      todo,
    });
  } catch (error) {
    next(error); 
  }
};

// update  todo by ID---------------------
const updateTodo = async (req, res, next) => {
  try {
    const data = req.body;

    // validate request body---------------------
    if (!data) {
      return res.status(400).json({
        status: "failure",
        message: "Title is required",
      });
    }

    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { ...data },
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({
        status: "failure",
        message: "Todo not found",
      });
    }

    res.status(200).json({
      status: "success",
      todo,
    });
  } catch (error) {
    next(error); 
  }
};

// delete a todo by ID---------------------
const deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
      return res.status(404).json({
        status: "failure",
        message: "Todo not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Todo deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Update a todo status by ID-------------------
const updateTodoStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;


    // Validate the status value-------------------
    if (!['todo', 'inprogress', 'done'].includes(status)) {
      return res.status(400).json({
        status: "failure",
        message: "Invalid status value",
      });
    }

    // Find and update the task ------------------------
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({
        status: "failure",
        message: "Todo not found",
      });
    }

    res.status(200).json({
      status: "success",
      todo: updatedTodo,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
  updateTodoStatus
};
