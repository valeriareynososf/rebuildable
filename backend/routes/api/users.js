const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Post, Comment } = require("../../db/models");

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors,
];

// Sign up
router.post(
  '',
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);

// Edit
router.put("/:id(\\d+)", requireAuth, asyncHandler(async (req, res) => {
    const user = await User.findByPk(req.params.id);
    const { email, username, imgUrl } = req.body;
    const users = await user.update({ email, username, imgUrl });
    return res.json(users);
  })
);

//users GET
router.get("/", asyncHandler(async (req, res) => {
    const user = await User.findAll();
    return res.json(user);
  })
);

//users GET each one
router.get("/:id(\\d+)", asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const user = await User.getCurrentUserById(userId);
    return res.json(user);
  })
);

//get users posts
router.get("/:id(\\d+)/posts", asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const user = await User.getCurrentUserById(userId);
    const posts = await Post.findAll({
      where: {
        userId,
      },
    });
    return res.json(posts);
  })
);

//create a post
router.post("/:id(\\d+)/posts", requireAuth, asyncHandler(async (req, res) => {
    const { title, imgUrl, details, instructions } = req.body;
    const userId = req.params.id;
     const user = await User.getCurrentUserById(userId);
    const posts = await Post.create({
      title,
      imgUrl,
      userId,
      details,
      instructions,
    });
    return res.json(posts);
  })
);

//get users comments
router.get('/:id(\\d+)/comments', asyncHandler(async (req, res) => {
   const user_Id = req.params.id;
     const comments = await Comment.findAll({
       where: {
         user_Id,
       },
     });
  return res.json(comments);
}));

module.exports = router;