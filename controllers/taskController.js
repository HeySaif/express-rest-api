const Task = require('../models/Task');

// @desc Get User Tasks (READ)
exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

// @desc Create Task (CREATE)
exports.createTask = async (req, res, next) => {
  try {
    if (!req.body.title) {
      res.status(400);
      throw new Error('Title is required');
    }

    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      user: req.user.id
    });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

// @desc Update Task (UPDATE)
exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    if (task.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error('Not authorized');
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
};

// @desc Delete Task (DELETE)
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    if (task.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error('Not authorized');
    }

    await task.deleteOne();
    res.json({ id: req.params.id, message: 'Task removed successfully' });
  } catch (error) {
    next(error);
  }
};