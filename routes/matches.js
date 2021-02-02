const express = require('express');
const router = express.Router();
const Match = require('../models/Match');
const Data = require('../models/Data');


// adding new match
router.post('/', async (req, res) => {
   // check if both teams created
   const dataArray = fetch('https://localhost:3000/data');
   const team_a_Exist =
      dataArray.find({ team_id: req.body.team_a_id });
   const team_b_Exist =
      dataArray.find({ team_id: req.body.team_b_id });
   if (team_a_Exist.length != 0 && team_b_Exist.length != 0) {
      // Both teams exist in our data

      const newMatch = new Match({
         team_a_id: req.body.team_a_id,
         team_b_id: req.body.team_b_id,
         team_a_score: req.body.team_a_score,
         team_b_score: req.body.team_b_score
      });

      const updateTeamData = () => {
         // winning and losing team
         const team_a_win = null;
         if (req.body.team_a_score > req.body.team_b_score) {
            team_a_win = 1;   // Team A Win
         } else if (req.body.team_a_score < req.body.team_b_score) {
            team_a_win = -1;   // Team A Lost
         } else {
            team_a_win = 0;   // Draw
         }
         try {
            // const updateDataFromMatch = fetch(`https://localhost:3000/data:${req.body.team_a_id}`);

            const updatedData = {};
            //update data according to the winning team
            switch (team_a_win) {
               case 1: // Team A win
                  updatedData = Data.updateOne(
                     { team_id: req.body.team_a_id },
                     {
                        $set: {
                           played: played + 1,
                           won: won + 1,
                           points: points + 3
                        }
                     }
                  );
                  return updatedData;
                  break;

               case -1: // Team A Loses
                  updatedData = Data.updateOne(
                     { team_id: req.body.team_a_id },
                     {
                        $set: {
                           played: played + 1,
                           drawn: drawn + 1,
                           points: points + 1
                        }
                     }
                  );
                  return updatedData;
                  break;

               case 0: // Teams Draw
                  updatedData = Data.updateOne(
                     { team_id: req.body.team_a_id },
                     {
                        $set: {
                           played: played + 1,
                           lost: lost + 1,
                        }
                     }
                  );
                  return updatedData;
                  break;

               default: // error in switch case
                  console.log("Switch Case error")
                  break;
            }

            res.json(updatedData);

         } catch (error) {
            res.json({ message: error })
         }
      };

      try {
         await updateTeamData();
         const savedMatch = await newMatch.save();
         res.json(savedMatch);
      } catch (error) {
         res.json({ message: error })
      }
   } else {
      console.log("one of the teams doesn't exist");
      res.json({ message: "one of the teams doesn't exist" })
   }
});


// returns all Matches
router.get('/', async (req, res) => {
   try {
      const matches = await Match.find(); //return all matches
      res.json(matches);
   } catch (error) {
      res.json({ message: error })
   }
});


//returns a specific Match
router.get('/:matchId', async (req, res) => {
   try {
      const specificMatch = await Match.findById(req.params.matchId);
      res.json(specificMatch);
   } catch (error) {
      res.json({ message: error })
   }
})


//Update 
// router.patch('/:matchId', async (req, res) => {
//    try {
//       const updatedMatch =
//          await Match.updateOne(
//             { _id: req.params.matchId },
//             {
//                $set: {
//                   team_a_id: req.body.team_a_id,
//                   team_b_id: req.body.team_b_id,
//                   team_a_score: req.body.team_a_score,
//                   team_b_score: req.body.team_b_score
//                }
//             }
//          );
//       res.json(updatedMatch);

//    } catch (error) {
//       res.json({ message: error })
//    }
// })


module.exports = router;