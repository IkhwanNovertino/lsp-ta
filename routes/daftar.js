var express = require('express');
var router = express.Router();

const Daftar = require('../modal/daftar');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('daftar/daftar_sertifikasi', {
    title: 'LSP-STMIK BANJARBARU',
    sessions: req.session.user,
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
      applicant: {
        nim,
        nik,
        name: name.toLowerCase(),
        major,
        schema,
      },
      personal: {
        birthplace: birthplace.toLowerCase(),
        date_of_birth: new Date(date_of_birth),
        gender,
        nationality: nationality.toLowerCase(),
        address: address.toLowerCase(),
        zip_code,
        phone_num: no_phone,
        email,
      },
      data_pekerjaan: {
        current_job: current_job.toLowerCase(),
        position: position.toLowerCase(),
        company_name: company_name.toLowerCase(),
        address: company_address,
        contact: {
          telp: company_phone,
          email: company_email
        }
      },
      assesment: {
        purpose: purpose_asssesment,
      },
    });
    await daftar.save()


    // console.log(req.body);
    // console.log(daftar);

    res.redirect('/daftar/success')
    // res.render('daftar/registration_success', {
    //   title: 'LSP-STMIK BANJARBARU',
    //   daftar
    // });

  } catch (error) {
    console.log(error);
  }
});

router.get('/success', function (req, res, next) {
  res.render('daftar/registration_success', {
    title: 'LSP-STMIK BANJARBARU',
  });
})

module.exports = router;
