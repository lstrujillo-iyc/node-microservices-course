const express = require('express');
const response = require('../../../network/response');

const Controller = require('./index');

const router = express.Router();

// Routes
router.get('/', list);
router.get('/:id', get);
router.post('/', upsert);
// router.put('/:id', update);
router.delete('/:id', remove);

// Internal functions
async function list(req, res) {
  try {
    const userList = await Controller.list();
    response.success(req, res, userList, 200);
  } catch (error) {
    return response.error(req, res, error.message, 500);
  }
}

async function get(req, res) {
  const { id } = req.params;
  try {
    const user = await Controller.get(id);
    if (user) {
      response.success(req, res, user, 200);
    } else {
      response.error(req, res, 'User not found', 404);
    }
  } catch (error) {
    return response.error(req, res, error.message, 500);
  }
}

async function upsert(req, res) {
  const { body } = req;
  try {
    const newUser = await Controller.upsert(body);
    response.success(req, res, newUser, 201);
  } catch (error) {
    return response.error(req, res, error.message, 500);
  }
}

async function remove(req, res) {
  const { id } = req.params;
  try {
    const result = await Controller.remove(id);
    if (result) {
      response.success(req, res, 'User deleted successfully', 200);
    } else {
      response.error(req, res, 'User not found', 404);
    }
  } catch (error) {
    return response.error(req, res, error.message, 500);
  }
}

module.exports = router;
