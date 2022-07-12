// routes/outfit.routes.js

const express = require('express');
const router = express.Router();

// ********* require fileUploader in order to use it *********
const fileUploader = require('../config/cloudinary.config');
const Outfit = require('../models/Outfit.model');   
const User = require('../models/User.model');

// GET route to display the form to create a new movie
router.get('/outfit/create', (req, res) => res.render('outfit/create-outfit.hbs'));

router.post('/outfit/create', fileUploader.single('outfit-image'), (req, res) => {
    const { title } = req.body.title;
   
   Outfit.create({ title, imageUrl: req.file.path, userId:req.session.currentUser._id })
      .then(newOutfit => {
        console.log(newOutfit);
        // res.send('ok')
        User.findByIdAndUpdate(req.session.currentUser._id,{
          $push:{outfitArray:newOutfit._id}}, {new: true})
      .then((response) =>{
        console.log(response)
      })
      res.redirect ('/user-profile')
      })
      .catch(error => console.log(`Error while creating a new movie: ${error}`));
  });

module.exports = router;