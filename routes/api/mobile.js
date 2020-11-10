const express = require('express');
const router = express.Router();

const matches = require('../../matches');

router.get('/matches', (req, res) => {
    res.json(matches)
});

module.exports = router;
