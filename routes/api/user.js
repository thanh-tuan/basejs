const express = require('express');
const validations = require('./validations/user');
const controllers = require('../../controllers/api/user');
const Celebrate = require('celebrate');
const Boom = require('boom');
const router = express.Router();

// Get user
router.get('/:userId', Celebrate(validations.get), controllers.get);

// Replace userId set to 'me' with logged in user id
router.param('userId', (req, res, next, userId) => {
  if (userId == 'me') {
    if (!req.user || !req.user.id) {
      return next(Boom.unauthorized('Not logged in'));
    }
    req.params.userId = req.user.id;
  }
  next();
});

module.exports = router;