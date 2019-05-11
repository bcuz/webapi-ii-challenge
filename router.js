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

router.get('/:id', async (req, res) => {
  try {
    // give bogus func for catch error
    const posts = await db.findById(req.params.id);
    
    if (posts.length > 0) {
      res.status(200).json(posts[0]);
    } else {
      res.status(404).json({message: "The post with the specified ID does not exist."});
    }
  } catch (error) {
    res.status(500).json({
      error: "The post information could not be retrieved." 
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

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    let posts = await db.findById(id)

    if (posts.length > 0) {
      try {
        await db.remove(id)   
  
        res.status(200).json(posts[0]);
        
      } catch (err) {
          res.status(500).json({ error: "The post could not be removed" })
      }
    } else {
      res.status(404).json({ error: "The post with the specified ID does not exist." })
    }
  } catch (err) {
      res.status(500).json({ error: "The post information could not be retrieved." })
  }
})

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  let { title, contents } = req.body;

  if (!title || !contents) {    
    return res.status(400).json({errorMessage: "Please provide title and contents for the post." });
  }

  try {
    let updated = await db.update(id, req.body)    

    if (updated) {
      try {

        // if it gets to this point the post will def exist
        let posts = await db.findById(id)
  
        res.status(200).json(posts[0]);
        
      } catch (err) {
        res.status(500).json({
          error: "The post information could not be retrieved." 
        });
      }
    } else {
      res.status(404).json({ message: "The post with the specified ID does not exist." })
    }

  } catch (err) {
    res.status(500).json({ error: "The post information could not be modified." })
}
})

module.exports = router;