const { body, validationResult } = require('express-validator');
const moment = require('moment');
const validateTodoDates = (req, res, next) => {
  const { status, completedAt, dueDate, reminderTime, createdAt } = req.body;
  const now = new Date();

  const isValidDate = (date) => moment(date, moment.ISO_8601, true).isValid();

  const checkDateValidity = (date, fieldName) => {
    if (date && !isValidDate(date)) {
      return res.status(400).json({
        intent: false,
        message: `${fieldName} must be a valid date.`,
      });
    }
    if (date && new Date(date) <= now) {
      return res.status(400).json({
        intent: false,
        message: `${fieldName} must be in the future.`,
      });
    }
    return null;
  };

  if (status === 'completed' && !completedAt) {
    return res.status(400).json({
      intent: false,
      message: 'CompletedAt must be provided if status is completed.',
    });
  }

  const dueDateError = checkDateValidity(dueDate, 'DueDate');
  if (dueDateError) return dueDateError;

  const reminderTimeError = checkDateValidity(reminderTime, 'ReminderTime');
  if (reminderTimeError) return reminderTimeError;

  const completedAtError = checkDateValidity(completedAt, 'CompletedAt');
  if (completedAtError) return completedAtError;

  if (
    (dueDate && new Date(dueDate) <= new Date(createdAt)) ||
    (reminderTime && new Date(reminderTime) <= new Date(createdAt)) ||
    (completedAt && new Date(completedAt) <= new Date(createdAt))
  ) {
    return res.status(400).json({
      intent: false,
      message: 'DueDate, ReminderTime, and CompletedAt must be greater than createdAt.',
    });
  }

  next();
};

module.exports = { validateTodoDates };
