var express = require('express');
var router = express.Router();
const Registrations = require("../../modal/daftar")
const { dateFormat, dateDisplay } = require('../../utils/index');
const { isLoginAdmmin } = require('../../middleware/auth');

/* GET home page. */
router.use(isLoginAdmmin)
router.get('/', async function (req, res, next) {
  try {
    const daftar = await Registrations.find();

    res.render('admin/pengajuan/index', {
      title: 'LSP-STMIK BANJARBARU',
      daftar,
      // dateFormat
    });
  } catch (error) {

  }

});

router.get('/detail/:id', async function (req, res, next) {
  try {
    const { id } = req.params;

    const data = await Registrations.findById(id);

    // console.log(data);
    res.render('admin/pengajuan/detail', {
      title: 'LSP-STMIK BANJARBARU',
      data,
      dateFormat,
      dateDisplay
    });

  } catch (error) {

  }
});

router.put('/edit', async function (req, res, next) {
  try {
    const { id, tanggal, result } = req.body;

    console.log(req.body);

    await Registrations.findOneAndUpdate(
      { _id: id },
      {
        assesment_date: new Date(tanggal),
        assesment_result: result,
      }
    )
    res.redirect(`/pengajuan/detail/${id}`)
  } catch (error) {
    console.log(error);
    res.redirect(`/pengajuan/detail/${id}`)
  }
})

router.delete('/delete/:id', async function (req, res, next) {
  try {
    const { id } = req.params;
    await Registrations.findOneAndRemove({ _id: id });

    // req.flash('alertMessage', 'Berhasil Menghapus Bidang Kegiatan');
    // req.flash('alertStatus', 'success');

    res.redirect('/pengajuan');
  } catch (err) {
    // req.flash('alertMessage', `${err.message}`);
    // req.flash('alertStatus', 'danger');

    console.log(`error di actionDelete controller PENGAJUAN >>${err}`);
    res.redirect('/pengajuan')
  }
})

module.exports = router;