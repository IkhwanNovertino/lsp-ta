var express = require('express');
var router = express.Router();
const Daftar = require('../../modal/daftar')
const { isLoginAdmmin } = require('../../middleware/auth');

/* GET home page. */
router.use(isLoginAdmmin)
router.get('/', async function (req, res, next) {
  try {

    const data = await Daftar.find().sort({ createdAt: -1 }).limit(10);
    console.log(req.session);

    res.render('admin/index', {
      title: 'LSP-STMIK BANJARBARU',
      data,
    });
  } catch (error) {

  }

});

module.exports = router;