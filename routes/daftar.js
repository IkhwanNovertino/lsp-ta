var express = require('express');
var router = express.Router();

const Daftar = require('../modal/daftar');
const { Store } = require('express-session');

/* GET home page. */
router.get('/', async function (req, res) {

  const alertNim = req.flash('alertNim');
  const alertNik = req.flash('alertNik');
  const alertPhone = req.flash('alertPhone');
  const alertEmail = req.flash('alertEmail');
  const alertValidation = req.flash('alertValidation');

  // const alert = { alertNim, alertNik, alertPhone, alertEmail };

  console.log(alertValidation);
  // console.log(alert);

  res.render('daftar/daftar_sertifikasi', {
    title: 'LSP-STMIK BANJARBARU',
    sessions: req.session.user,
    alertValidation,
  });
});

router.post('/create', async function (req, res, next) {
  try {
    const {
      nim, nik, name, major, schema,
      birthplace, date_of_birth, gender, nationality, address, zip_code, no_phone, email,
      current_job, position, company_name, company_address, company_phone, company_email,
      purpose_asssesment
    } = req.body;

    let regisNum = (nim, schema) => {
      let value = 0;
      if (schema === "lp") {
        value = 10
      } else {
        value = 20
      }
      let result = `${value}${nim.trim().substr(-4)}${new Date().getMilliseconds()}`
      return parseInt(result);
    };

    let daftar = await Daftar({
      regisNum: regisNum(nim, schema),

      nim,
      nik,
      name: name.toLowerCase(),
      major,
      schema,

      birthplace: birthplace.toLowerCase(),
      date_of_birth: new Date(date_of_birth),
      gender,
      nationality: nationality.toLowerCase(),
      address: address.toLowerCase(),
      zip_code,
      phone_num: no_phone,
      email,

      current_job: current_job.toLowerCase(),
      position: position.toLowerCase(),
      company_name: company_name.toLowerCase(),
      company_address: company_address,
      company_telp: company_phone,
      company_email: company_email,

      assesment_type: purpose_asssesment,
    });
    await daftar.save()


    // console.log(req.body);
    // console.log(daftar);

    // req.flash('alertMessage', 'Berhasil tambah kategori');
    // req.flash('alertStatus', 'success');
    res.redirect('/daftar/success')
  } catch (error) {
    if (error && error.name === "ValidationError") {
      // return res.status(422).json({
      //   error: err,
      //   field: err.errors,
      // })
      // req.flash('alertNim', error.errors?.nim?.message)
      // req.flash('alertNik', error.errors?.nik?.message,)
      // req.flash('alertPhone', error.errors?.phone_num?.message)
      // req.flash('alertEmail', error.errors?.email?.message)
      req.flash('alertValidation', [
        error.errors?.nim?.message,
        error.errors?.nik?.message,
        error.errors?.phone_num?.message,
        error.errors?.email?.message,
      ]);
    }
    res.redirect('back')
    // console.log('ERROR >>>' + error);
    // console.log('ERROR MASSAGE >>>' + error.message);
    // req.flash('alertMessage', `${error.message}`);
    // req.flash('alertStatus', 'danger');
    // res.redirect('/daftar');
  }
});

router.get('/success', function (req, res, next) {
  res.render('daftar/registration_success', {
    title: 'LSP-STMIK BANJARBARU',
  });
})

module.exports = router;
