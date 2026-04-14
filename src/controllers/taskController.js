import * as taskService from '../services/taskService.js';

export async function getTasks(req, res, next) {
  const { completed } = req.query;

  // if completed is provided but not "true" or "false", return 400
  if (completed !== undefined && completed !== 'true' && completed !== 'false') {
    return res.status(400).json({
      error: 'Validation failed',
      details: ['completed must be "true" or "false"'],
    });
  }

  // convert string to boolean if provided
  let filter;
  if (completed === 'true') {
    filter = true;
  } else if (completed === 'false') {
    filter = false;
  }

  const tasks = await taskService.getAllTasks(filter);
  res.json(tasks);
}

export async function createTask(req, res, next) {
  const { title, completed } = req.body;
  const task = await taskService.createTask({ title, completed });
  res.status(201).json(task);
}