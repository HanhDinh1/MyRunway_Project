const router = require("express").Router();
const mongoose = require("mongoose");
const User = require('../models/User.model');
const Outfit = require('../models/Outfit.model.js');

// use req.params to get the id when you see :id
router.post("/like/:id", (req, res, next) => {
    const {id} = req.params;
    Outfit.findByIdAndUpdate(id, {$push: {likes: id}}, {new: true})
    .then((outfitLikes) =>{
        Outfit.findByIdAndUpdate(id, {$inc: {likedMe: 1}}, {new: true})
        .then((totalLikes) =>{
            res.json({success: true, totalLikes: totalLikes})
        })
        .catch((err) => {
            console.error(err);
            res.json({success: false}) 
            });
    })
    .catch((err) => {
        console.error(err);
        res.json({success: false}) 
        });
})

router.post("/unlike/:id", (req, res, next) => {
    const {id} = req.params;
    Outfit.findByIdAndUpdate(id, {$pull: {likes: id}}, {new: true})
    .then((outfitLikes) =>{
        Outfit.findByIdAndUpdate(id, {$inc: {likedMe: -1}}, {new: true})
        .then((totalLikes) =>{
            res.json({success: true, totalLikes})
        })
        .catch((err) => {
            console.error(err);
            res.json({success: false}) 
            });
    })
    .catch((err) => {
        console.error(err);
        res.json({success: false}) 
        });
})