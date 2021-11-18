const express = require("express");
const asyncHandler = require("express-async-handler");
const { requireAuth } = require("../../utils/auth");
const { Post, Comment } = require("../../db/models");

const router = express.Router();

router.get("/", asyncHandler(async (req, res) => {
    const posts = await Post.findAll();
    return res.json(posts);
  })
);

router.get("/:id(\\d+)", asyncHandler(async (req, res) => {
    const posts = await Post.findByPk(req.params.id);
    return res.json(posts);
  })
);

router.put("/:id(\\d+)", requireAuth, asyncHandler(async (req, res) => {
    const post = await Post.findByPk(req.params.id);
    const { title, imgUrl, details, instructions } = req.body;
    const onepost = await post.update({
      title,
      imgUrl,
      details,
      instructions,
    });
    return res.json(onepost);
  })
);

//delete a post
router.delete("/:id(\\d+)", requireAuth, asyncHandler(async (req, res) => {
    const post = await Post.findByPk(req.params.id);
    post.destroy();
    return res.json({ deleted: post });
  })
);

//create a comment
router.post("/:id(\\d+)/comments", requireAuth, asyncHandler(async (req, res) => {
    const { content } = req.body;
    const postId = req.params.id;
    const userId = req.user.id;
    const comments = await Comment.create({
      userId,
      postId,
      content,
    });
    return res.json(comments);
  })
);

//get posts comments
router.get('/:id(\\d+)/comments', asyncHandler(async (req, res) => {
   const postId = req.params.id;
     const comments = await Comment.findAll({
       where: {
         postId,
       },
     });
  return res.json(comments);
}));

module.exports = router;