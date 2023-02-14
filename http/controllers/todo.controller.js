const TodoService = require('../services/todo.services');
const controller = require('./controller');
const { v4: uuidv4 } = require('uuid');

class TodoController extends controller {

  constructor()
  {
    super();
  }

async createTodo (req, res) {
  try {
    
    todo = await TodoService.createTodo(req.body);
    res.status(201).json({ todo });
    
  } catch (error) {
    res.status(500).send(error.message);
  }
};

async getTodos (req, res) {
  try {
    const todos = await TodoService.getTodos();
    res.status(200).json({ todos });

  } catch (error) {
    res.status(500).send(error.message);
  }
};

async getTodoById (req, res) {
  try 
  {
    const todo = await TodoService.getTodoById(req.params.id);
    if (!todo) 
    {
      return res.status(404).send('Todo not found');
    }
    res.status(200).json({ todo });
  } 
  catch (error) 
  {
    res.status(500).send(error.message);
  }
};

async updateTodo (req, res) {
  try 
  {
    const todo = await TodoService.updateTodo(req.params.id, req.body);
    if (!todo) 
    {
      return res.status(404).send('Todo not found');
    }
    res.status(200).json({ todo });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

async deleteTodo (req, res) {
  try {
    const todo = await TodoService.deleteTodo(req.params.id);
    if (!todo) {
      return res.status(404).send('Todo not found');
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
};
}
module.exports = {
  // createTodo,
  // getTodos,
  // getTodoById,
  // updateTodo,
  // deleteTodo,
  TodoController
};
