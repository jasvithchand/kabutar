const router = require("express").Router();
const Post = require("../models/Post")
const User = require("../models/User");

//Create a Post
router.post("/", async (req,res)=>{
    const newPost = new Post(req.body);
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }catch(err){
        res.status(500).json(err);
    }
})

//Update a Post
router.put("/:id", async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId) {
            await post.updateOne({$set:req.body});
            res.status(200).json("Post updated")
        }else{
            res.status(403).json("You can Update only your post");
        }

    }catch(err){
        res.status(500).json(err);
    }
})

//Delete a Post
router.delete("/:id", async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json("Post Deleted")
        }else{
            res.status(403).json("You can Delete only your post");
        }

    }catch(err){
        res.status(500).json(err);
    }
})

//Like a Post
router.put("/:id/like", async (req,res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push: {likes: req.body.userId}});
            res.status(200).json("The Post has been Liked")
        }else{
            await post.updateOne({$pull: {likes: req.body.userId}});
            res.status(200).json("The Post has been Disliked")
        }
    }catch(err){
        res.status(500).json(err);
    }
})

//Get a Post
router.get("/:id", async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    }catch(err){
        res.status(500).json(err);
    }
})

//Get timeline posts
router.get("/timeline/all", async (req, res) => {
    try {
      const currentUser = await User.findById(req.body.userId);
      const userPosts = await Post.find({ userId: currentUser._id });
      const friendPosts = await Promise.all(
        currentUser.following.map((friendId) => {
          return Post.find({ userId: friendId });
        })
      );
      res.status(200).json(userPosts.concat(...friendPosts))
    } catch (err) {
      res.status(500).json(err);
    }
})


module.exports = router;