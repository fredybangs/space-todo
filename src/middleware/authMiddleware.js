const jwt = require('jsonwebtoken');
const { User } = require('../models');
const disposableDomains = require('../data/domains.json');
const { body, validationResult } = require('express-validator');


const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Not authorized, token missing' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'Not authorized, user not found' });
    }

    req.user = user; 
    next();
  } catch (error) {
    console.error('Authorization error:', error.message);
    res.status(401).json({ message: 'Not authorized, token invalid' });
  }
};

const disposableDomainsSet = new Set(disposableDomains);

const validateRegistration = [
  body('password')
    .isLength({ min: 8 })
    .withMessage({
      field: 'password',
      message: 'Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.'
    })
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#\$%\^\&*\)\(+=._-]).*$/)
    .withMessage({
      field: 'password',
      message: 'Password must include uppercase, lowercase, a number, and a special character.'
    })
    .bail(),

  body('email')
    .isEmail()
    .withMessage({
      field: 'email',
      message: 'Must be a valid email'
    })
    .custom((email) => {
      const domain = email.split('@')[1].toLowerCase();
      if (disposableDomainsSet.has(domain)) {
        throw new Error('Disposable email addresses are not allowed');
      }
      return true;
    })
    .withMessage({
      field: 'email',
      message: 'Disposable email addresses are not allowed'
    })
    .bail(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const extractedErrors = errors.array().reduce((acc, err) => {
        const field = err.path || err.param;
        if (!acc[field]) {
          acc[field] = err.msg.message || err.msg;
        }
        return acc;
      }, {});

      return res.status(400).json({
        intent: false,
        message: extractedErrors
      });
    }
    next();
  }];

module.exports = { protect, validateRegistration };
