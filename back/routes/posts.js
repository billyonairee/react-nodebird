const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/', async (req, res, next) => { // GET /api/posts
  try {
    const posts = await db.Post.findAll({
      include: [{
        model: db.User,
        attiributes: ['id', 'nickname'],
      }],
      order: [['createdAt', 'DESC'], ['updatedAt', 'ASC']] // DESC는 내림차순, ASC는 오름차순
    });
    res.json(posts);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
