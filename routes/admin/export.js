var express = require('express');
var router = express.Router();
const Registrations = require('../../modal/daftar')
const { isLoginAdmmin } = require('../../middleware/auth');
const { dateDisplay } = require('../../utils');

/* GET home page. */
router.use(isLoginAdmmin)

/* GET home page. */
router.get('/', async function (req, res, next) {
  try {
    const data = await Registrations.find();
    res.render('admin/export/index', {
      title: 'LSP-STMIK BANJARBARU',
      data,
      dateDisplay
    });
  } catch (error) {
    res.redirect('/export')
  }

});

module.exports = router;