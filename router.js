const express = require('express');
const router = express.Router();
const { getRooms } = require('./rooms.js');

router.get('/', (req, res) => {
    res.send(getRooms());
})

module.exports = router;