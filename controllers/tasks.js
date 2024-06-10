const Task = require("../models/Task.js");
const asyncWrapper = require("../middleware/async.js");
const { createCustomError } = require("../errors/custom-error.js");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
  // alternative responses
  // res.status(200).json({tasks, amount: tasks.length})
  // res.status(200).json({status:'success', tasks})
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getSingleTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  const task = await Task.findOne({ _id: id });
  if (!task) {
    // manually creating an error object
    // const error = new Error("Not found");
    // error.status = 404;
    // console.log(error) or call next(error)
    // return next(error);

    return next(createCustomError(`No task with id: ${id}`, 404));
    // return res.status(404).json({ msg: `No task with id: ${id}` });
  }
  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;

  const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(createCustomError(`No task with id: ${taskId}`, 404));
  }
  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskId });
  if (!task) {
    return next(createCustomError(`No task with id: ${taskId}`, 404));
  }
  res.status(200).json({ task });
  // alternative responses
  // res.status(200).send()
  // res.status(200).json({task:null, status:'success'})
});

const editTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;

  const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
    overwrite: true,
  });

  if (!task) {
    return next(createCustomError(`No task with id: ${taskId}`, 404));
  }
  res.status(200).json({ task });
});

module.exports = {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
  editTask,
};
