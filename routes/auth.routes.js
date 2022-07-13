const router = require("express").Router();
const mongoose = require("mongoose");
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/User.model');
const {isLoggedIn, isLoggedOut} = require('../middleware/route-guard')

const fileUploader = require('../config/cloudinary.config');

const Outfit = require('../models/Outfit.model');

/* GET home page */
router.get('/index', (req, res) => {
  res.render('index.hbs')
});

router.get("/signup", isLoggedOut, (req, res, next) => {
  res.render("auth/signup.hbs");
});

router.post('/signup', isLoggedOut, (req, res, next) => {

  // GET route ==> to display the login form to users
// router.get('/login', isLoggedOut, (req, res) => res.render('auth/login'));
 
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
      req.session.currentUser = createdUser;
      res.redirect('/userProfile');
    })
    .catch(error => next(error));
});

router.get('/userProfile', isLoggedIn, (req, res) => {
  console.log(req.session)
  User.findById(req.session.currentUser._id)
  .populate('outfitArray')
    .then((myUser) =>{
      console.log(myUser);
      res.render('users/user-profile', {userInSession: myUser});
    })
    .catch(error => res.send(error));
});

//all post on home page
// router.get("/", (req, res) => {
//   Posts.find()
//     .then((allOutfits) => {
//       allPosts.reverse();
//       res.render("index", {allOutfits});
//     })
//     .catch((err) => res.send(err));
// });



// router.post('/userprofile', fileUploader.single('outfit-image'), (req, res) => {
//   const {title} = req.body;
//   console.log(req.body.title);
//   console.log(req.body);
//   Outfit.create({ title, imageUrl: req.file.path, userId:req.session.currentUser._id })

//       .then(newOutfit => {
        
//         console.log(newOutfit);
//         // res.send('ok')
//         // res.render('outfit/create-outfit')
//         User.findByIdAndUpdate(req.session.currentUser._id,{
//           $push:{outfitArray:newOutfit._id}}, {new: true})
//       .then((response) =>{
//         console.log(response)
//         res.redirect ('/userprofile')
//       })
//     })
// })

// GET route ==> to display the login form to users
router.get('/login', isLoggedOut, (req, res) => res.render('auth/login'));

router.post('/login', isLoggedOut, (req, res, next) => {
  console.log('SESSION ===>', req.session);
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
        req.session.currentUser = user;
        res.redirect('/userProfile');
      } else {
        res.render('auth/login', { errorMessage: 'Incorrect password.' });
      }
    })
    .catch(error => next(error));
});

//edit 
router.get('/userprofile/edit', isLoggedIn, (req, res) =>{
  res.render('users/edit-profile', {userInSession: req.session.currentUser})
})

router.post('/userprofile/edit', isLoggedIn, fileUploader.single("profileImage"), (req, res) => {

  console.log(req.body, req.file)

  let myProfileImage;

  if(req.file && req.file.path){
    myProfileImage = req.file.path
  } else {
    myProfileImage = req.session.currentUser.profileImage
  }

  User.findByIdAndUpdate(req.session.currentUser._id, {about: req.body.about, profileImage: myProfileImage}, {new: true} )
  .then((updatedUser) =>{
    req.session.currentUsser = updatedUser;
    res.redirect('/userprofile')
  })
  .catch(error => console.log(`Error while updating profile:${error}`));
})

//delete 



//logout
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) next(err);
    res.redirect('/');
  });
});


module.exports = router;