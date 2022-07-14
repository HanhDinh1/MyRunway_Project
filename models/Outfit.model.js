// models/Movie.model.js

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const outfitSchema = new Schema(
  {
    title: String,
    imageUrl: String,
    userId:{type:Schema.Types.ObjectId, ref:"User"},
    likes:[{type: Schema.Types.ObjectId, ref:'User'}],
    likedMe: {type: Number, default: 0},
  },
  {
    timestamps: true
  }
);

module.exports = model('Outfit', outfitSchema);