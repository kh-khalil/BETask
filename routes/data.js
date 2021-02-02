const express = require('express');
const router = express.Router();
const Data = require('../models/Data');


// returns all Data
router.get('/', async (req, res) => {
   try {
      const data = await Data.find();
      res.json(data);
   } catch (error) {
      console.log('returning data error');
      res.json({ message: error })
   }
});

module.exports = router;