// routes/outfit.routes.js

const express = require('express');
const router = express.Router();

// ********* require fileUploader in order to use it *********
const fileUploader = require('../config/cloudinary.config');

const Outfit = require('../models/Outfit.model');   

// GET route to display the form to create a new movie
router.get('/outfit/create', (req, res) => res.render('outfit/create-outfit.hbs'));

router.post('/outfit/create', fileUploader.single('outfit-image'), (req, res) => {
    const { title } = req.body;
   
   Outfit.create({ title, imageUrl: req.file.path })
      .then(newOutfit => {
        console.log(newOutfit);
        res.send('ok')
      })
      .catch(error => console.log(`Error while creating a new movie: ${error}`));
  });

module.exports = router;