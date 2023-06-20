const { Router } = require('express');
const router = Router();
const yup = require('yup');

const postDAO = require('../../daos/post');
const { isLoggedIn, isAdmin } = require('../../middleware/auth');

const postSchema = yup.object({
  title: yup.string().required(),
  content: yup.string().required(),
});

// Create
router.post('/', isLoggedIn, isAdmin, async (req, res, next) => {
  const post = req.body;
  try {
    await postSchema.validate(post, { abortEarly: false });
  } catch (err) {
    return res.status(400).json(err.errors);
  }

  try {
    const savedPost = await postDAO.create(req.user._id, post);
    res.json(savedPost);
  } catch (e) {
    if (e.message.includes('duplicate')) {
      return res.sendStatus(409);
    }
    next(e);
  }
});

// Read - all posts
router.get('/', async (req, res, next) => {
  try {
    let { page, perPage } = req.query;
    page = page ? Number(page) : 0;
    perPage = perPage ? Number(perPage) : 10;
    const posts = await postDAO.getAll(page, perPage);
    res.json(posts);
  } catch (e) {
    next(e);
  }
});

// Read - single post
router.get('/:id', async (req, res, next) => {
  try {
    const post = await postDAO.getById(req.params.id);
    if (post) {
      res.json(post);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

// Update
router.put('/:id', isLoggedIn, isAdmin, async (req, res, next) => {
  const postId = req.params.id;
  const post = req.body;
  try {
    await postSchema.validate(post, { abortEarly: false });
  } catch (err) {
    return res.status(400).json(err.errors);
  }

  try {
    const success = await postDAO.updateById(postId, {
      userId: req.user._id,
      ...post,
    });
    res.sendStatus(success ? 200 : 400);
  } catch (e) {
    if (e instanceof postDAO.BadDataError) {
      res.status(400).send(e.message);
    } else {
      res.status(500).send(e.message);
    }
    next(e);
  }
});

module.exports = router;
