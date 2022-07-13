const router = require("express").Router();
const Posts = require("../models/Outfit.model.js")

router.get("/", (req, res) => {
 // console.log((req.session))
  Posts.find()
  .then((allPosts) => {
    console.log(allPosts);
    res.render("index", {allPosts});
  })
  .catch((error) =>res.send(error));
});

module.exports = router;