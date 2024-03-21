var express = require('express');
var router = express.Router();
const Registrations = require('../../modal/daftar')
const { isLoginAdmmin } = require('../../middleware/auth');

/* GET home page. */
router.use(isLoginAdmmin)
router.get('/', async function (req, res, next) {
  try {

    const data = await Registrations.find().sort({ createdAt: -1 }).limit(10);
    const dataCount = await Registrations.find().countDocuments();
    console.log(req.session);

    res.render('admin/index', {
      title: 'LSP-STMIK BANJARBARU',
      data,
      dataCount,
    });
  } catch (error) {

  }

});

module.exports = router;