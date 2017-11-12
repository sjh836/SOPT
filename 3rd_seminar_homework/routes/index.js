const express = require('express');
const router = express.Router();

const homework = require('./homework/index');
const echo = require('./homework/echo/index');
const promise = require('./flowcontrol/promise/index');
const async = require('./flowcontrol/async/index');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SOPT 21th' });
});

// 라우팅
router.use('/homework', homework);
router.use('/homework/echo', echo);
router.use('/flowcontrol/promise', promise);
router.use('/flowcontrol/async', async);

module.exports = router;
