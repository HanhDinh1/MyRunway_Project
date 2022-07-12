// models/Movie.model.js

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const outfitSchema = new Schema(
  {
    title: String,
    imageUrl: String,
    userId:{type:Schema.Types.ObjectId, ref:"User"}
  },
  {
    timestamps: true
  }
);

module.exports = model('Outfit', outfitSchema);