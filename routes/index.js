var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log(req.session.user);
  res.render('index', {
    title: 'LSP-STMIK BANJARBARU',
    sessions: req.session.user,
  });
});

module.exports = router;
