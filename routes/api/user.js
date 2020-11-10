const express = require('express');
const router = express.Router();

const posts = require('../../posts');

router.get('/posts', (req, res) => {
    res.json(posts);
});

module.exports = router;