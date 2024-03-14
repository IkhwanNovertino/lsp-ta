var express = require('express');
var router = express.Router();
const { isLoginAdmmin } = require('../../middleware/auth');

/* GET home page. */
router.use(isLoginAdmmin)

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('admin/export/index', {
    title: 'LSP-STMIK BANJARBARU',
  });
});

module.exports = router;