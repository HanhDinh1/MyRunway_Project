const router = require("express").Router();
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/User.model');

// const { isLoggedIn, isLoggedOut } = require('../middleware/rout-guard.js');

/* GET home page */
router.get("/signup", (req, res, next) => {
  res.render("auth/signup.hbs");
});

router.post('/signup', (req, res, next) => {
  // console.log("The form data: ", req.body);

  // GET route ==> to display the login form to users
router.get('/login', (req, res) => res.render('auth/login'));
 
  const { username, email, password } = req.body;
 
  bcryptjs
    .genSalt(saltRounds)
    .then(salt => bcryptjs.hash(password, salt))
    .then(hashedPassword => {
      console.log(`Password hash: ${hashedPassword}`);
      return User.create({
        username,
        email,
        passwordHash: hashedPassword
      })
    })
    .then(createdUser => {
      console.log('Newly created user:', createdUser)
      res.redirect('/userProfile');
    })
    .catch(error => next(error));
});

router.get('/userProfile', (req, res) => res.render('users/user-profile'));

// GET route ==> to display the login form to users
router.get('/login', (req, res) => res.render('auth/login'));

router.post('/login', (req, res, next) => {
  const { email, password } = req.body;
 
  if (email === '' || password === '') {
    res.render('auth/login', {
      errorMessage: 'Please enter both, email and password to login.'
    });
    return;
  }
 
  User.findOne({ email })
    .then(user => {
      if (!user) {
        res.render('auth/login', { errorMessage: 'Email is not registered. Try with other email.' });
        return;
      } else if (bcryptjs.compareSync(password, user.passwordHash)) {
        res.render('users/user-profile', { user });
      } else {
        res.render('auth/login', { errorMessage: 'Incorrect password.' });
      }
    })
    .catch(error => next(error));
});

module.exports = router;