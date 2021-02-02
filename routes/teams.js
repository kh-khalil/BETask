const express = require('express');
const router = express.Router();
const Team = require('../models/Team');
const Data = require('../models/Data');


// adding new team
router.post('/', async (req, res) => {
   const newTeam = new Team({
      team_name: req.body.team_name,
      _id: req.body._id
   });
   const newData = new Data({
      team_name: req.body.team_name,
      team_id: req.body._id
   });
   try {
      const savedTeam = await newTeam.save();
      res.json(savedTeam);
   } catch (error) {
      res.json({ message: error })
   }
});


// returns all Teams
router.get('/', async (req, res) => {
   try {
      const teams =
         await Team.find({}, { "team_name": 1, "_id": 0 }); //return  field (team_name) only for all teams
      res.json(teams);
   } catch (error) {
      res.json({ message: error })
   }
});


//returns a specific team
router.get('/:teamId', async (req, res) => {
   try {
      const specificTeam = await Team.findById(req.params.teamId);
      res.json(specificTeam);
   } catch (error) {
      res.json({ message: error })
   }
})


//Delete Team
router.delete('/:teamId', async (req, res) => {
   try {
      const removedTeam = await Team.remove({ _id: req.params.teamId });
      res.json(removedTeam);

   } catch (error) {
      res.json({ message: error })
   }
})


//Update 
router.patch('/:teamId', async (req, res) => {
   try {
      const updatedTeam =
         await Team.updateOne(
            { _id: req.params.teamId },
            { $set: { team_name: req.body.team_name } }
         );
      res.json(updatedTeam);

   } catch (error) {
      res.json({ message: error })
   }
})


module.exports = router;