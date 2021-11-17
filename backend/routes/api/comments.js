const express = require("express");
const asyncHandler = require("express-async-handler");
const { requireAuth } = require("../../utils/auth");
const { Comment } = require("../../db/models");
const router = express.Router();

//get all comments
router.get("/", asyncHandler(async (req, res) => {
    const comments = await Comment.findAll();
    return res.json(comments);
  })
);

//get specific comment
router.get("/:id(\\d+)", asyncHandler(async (req, res) => {
    const comment = await Comment.findByPk(req.params.id);
    return res.json(comment);
  })
);

//edit comment
router.put("/:id(\\d+)", requireAuth, asyncHandler(async (req, res) => {
    const comment = await Comment.findByPk(req.params.id);
    const { content } = req.body;
    const oneComment = await comment.update({
      content,
    });
    return res.json(oneComment);
  })
);

//delete comment
router.delete("/:id(\\d+)", requireAuth, asyncHandler(async (req, res) => {
    const comment = await Comment.findByPk(req.params.id);
    comment.destroy();
    return res.json({ deleted: comment });
  })
);


module.exports = router;