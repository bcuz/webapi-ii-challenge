const express = require('express');

const db = require('./data/db');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await db.find(req.query);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      error: "The posts information could not be retrieved."
    });
  }
});

router.post('/', async (req, res) => {

  let { title, contents } = req.body;

  if (!title || !contents) {    
    return res.status(400).json({errorMessage: "Please provide title and contents for the post." });
  }

  try {
    const post = await db.insert(req.body);
    res.status(201).json(post);
  } catch (error) {    
    res.status(500).json({
      error: "There was an error while saving the post to the database",
    });
  }
});

module.exports = router;