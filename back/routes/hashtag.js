const express = require('express');
const db = require('../models');

const router = express.Router();

router.get('/:tag', async (req, res, next) => {
  try {
    const posts = await db.Post.findAll({
      include: [
        {
          model: db.Hashtag,
          where: { name: decodeURIComponent(req.params.tag) },
        }, {
          model: db.User,
          attibutes: ['id', 'nickname'],
        }, {
          model: db.Image,
        }, {
        model: db.User,
        through: 'Like',
        as: 'Likers',
        attiributes: ['id']
      }
      ],
    });
    res.json(posts)
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
