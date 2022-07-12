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

// const Post = models('Outfit', outfitSchema)

module.exports = model('Outfit', outfitSchema);