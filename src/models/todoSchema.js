const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
  title:{
    type:String,
    required:true,
  },
  description:{
    type:String,
  },
  status:{
    type:String,
    enum:['todo', 'inprogress', 'done'],
    default:'todo',
    required:true,
  },
}, {
  timestamps: true,
});

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;