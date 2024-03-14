var express = require('express');
var router = express.Router();
const User = require('../modal/user');
const bcrypt = require('bcryptjs')

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.session.user === null || req.session.user === undefined) {
    res.render('admin/login/index', {
      title: 'Log in',
    });
  } else {
    res.redirect('/dashboard')
  }
  res.render('admin/login/index', {
    title: 'Log in',
  });
});

router.post('/', async function (req, res, next) {
  try {
    const { username, password } = req.body;
    const check = await User.findOne({ username: username });
    // console.log(req.body);
    // console.log(req);
    // console.log(req.session);
    // console.log(check);
    if (check) {
      const checkPassword = await bcrypt.compare(password, check.password);
      if (checkPassword) {
        req.session.user = {
          id: check._id,
          username: check.username,
          name: check.name
        }
        res.redirect('/dashboard')
      } else {
        console.log('PASSWORD SALAH');
        res.redirect('/login')
      }
    } else {
      console.log('USER TIDAK ADA');
      res.redirect('/login')
    }
  } catch (error) {
    // req.flash('alertMessage', `${error.message}`);
    // req.flash('alertStatus', 'danger');
    console.log(error);
    res.redirect('/login')
  }
});

router.get('/logout', function (req, res) {
  req.session.destroy();
  res.redirect('/');
})

module.exports = router;