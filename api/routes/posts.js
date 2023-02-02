const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

//CREATE POST - Using the post method for creating new Post.
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE POST - update all of users post, using the put method we get the id of what we are updating, we use the post id to update the post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id); //Finding the id of the Post in the url params
    if (post.username === req.body.username) {
      //If username from the post is the same as username of the post in the request then we want the user to be able to update the post
      try {
        // updatedPost checks for the id and update it, This tryCatch code only works if the post.username === req.body.username
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true } //Apparently by default the findByIdAndUpdate method returns the document as it was before the update,
          //But if you set new: true, It will give you how you the object after the update was applied
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can only update your post"); //This else statement only runs if you try to update a post that isn't having your username
    }
  } catch (err) {
    res.status(500).json(err); //This else statement only runs if the Id if the user isn't matching
  }
});

//DELETE POST - It's the post id we copy to delete the post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id); //Finding the id of the Post in the url params
    if (post.username === req.body.username) {
      //If username from the post is the same as username of the post in the request then we want the user to be able to update the post
      try {
        // updatedpost checks for the id and update, This tryCatch code only works if the post.username === req.body.username
        await post.delete();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can only delete your post"); //This else statement only runs if you try to update a post that isn't having your username
    }
  } catch (error) {
    res.status(500).json(error); //This else statement only runs if the Id if the user isn't matching
  }
});

//GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET all posts
//Step 1: Get username and catName from req.query.user
//Step 2: Let posts be anything, meaning it could be anything
//Step 3: If it's username, find username in Post and assign it to posts which could be anything
//step 4: Else if there's no username let's find categories then we use the $in method to say (if it's inside) that's our catName
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
