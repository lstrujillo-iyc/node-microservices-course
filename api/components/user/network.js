const express = require('express');
const response = require('../../../network/response');

const Controller = require('./controller');

const router = express.Router();

router.get('/', (req, res) => {
  const userList = Controller.list();
  response.success(req, res, userList, 200);
});

module.exports = router;
