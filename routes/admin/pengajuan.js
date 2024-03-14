var express = require('express');
var router = express.Router();
const Daftar = require("../../modal/daftar")
const { dateFormat } = require('../../utils/index');
const { isLoginAdmmin } = require('../../middleware/auth');

/* GET home page. */
router.use(isLoginAdmmin)
router.get('/', async function (req, res, next) {
  try {
    const daftar = await Daftar.find();

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

    const data = await Daftar.findById(id);

    // console.log(data);
    res.render('admin/pengajuan/detail', {
      title: 'LSP-STMIK BANJARBARU',
      data,
      dateFormat
    });

  } catch (error) {

  }
});

router.put('/edit', async function (req, res, next) {
  try {
    const { id, tanggal, result } = req.body;

    const daftarDatum = await Daftar.findById(id)

    await Daftar.findOneAndUpdate(
      { _id: id },
      {
        assesment: {
          date: new Date(tanggal),
          result,
          purpose: daftarDatum.assesment.purpose,
        },
      }
    )

    console.log(req.body);
    res.redirect(`/pengajuan/detail/${id}`)
  } catch (error) {
    console.log(error);
  }
})

router.delete('/delete/:id', async function (req, res, next) {
  try {
    const { id } = req.params;
    await Daftar.findOneAndRemove({ _id: id });

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