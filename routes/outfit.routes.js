// routes/outfit.routes.js

const { Router } = require('express');
const express = require('express');
const router = express.Router();

// ********* require fileUploader in order to use it *********
const fileUploader = require('../config/cloudinary.config');
const Outfit = require('../models/Outfit.model');   
const User = require('../models/User.model');

// GET route to display the form to create a new movie
router.get('/outfit/create', (req, res) => res.render('outfit/create-outfit.hbs'));

router.post('/outfit/create', fileUploader.single('outfit-image'), (req, res) => {
  
    const { title } = req.body;
   
   Outfit.create({ title, imageUrl: req.file.path, userId:req.session.currentUser._id })
      .then(newOutfit => {
        
        console.log(newOutfit);
        // res.send('ok')
        // res.render('outfit/create-outfit')
        User.findByIdAndUpdate(req.session.currentUser._id,{
          $push:{outfitArray:newOutfit._id}}, {new: true})
      .then((response) =>{
        console.log(response)
        res.redirect ('/userprofile')
      })
     
      })
      .catch(error => console.log(`Error while creating a new outfit: ${error}`));
  });

  // router.get('/outfit', (req, res) => {
  //   outfit.find()
  //   .then(outfitFromDB =>{
  //     res.render('outfit/outfit-list', {outfit: outfitFromDB});
  //   })
  //   .catch(error => console.log (`Error while getting outfit: ${error}`))
  // })

module.exports = router;