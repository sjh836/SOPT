const express = require('express');
const router = express.Router();

// 사용자 정의 라우팅
const index = require('./index');
const upload = require('./upload/index');

router.use('/', index);
router.use('/upload', upload);

module.exports = router;
