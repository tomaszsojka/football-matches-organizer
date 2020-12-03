const express = require('express');
const router = express.Router();

// const matches = require('../../matches');
const Match = require('../../models/Match');

router.get('/matches', (req, res) => {
    Match.find({}, (err, matches) => {
        if(err) {
            return res.send({
            success : false,
            message : 'Error : Server error'
            });
        } else {
            res.json(matches);  
        }
    });
});

router.put('/update-matchinfo', (req, res) => {
    
    const { body } = req;

    Match.findOneAndUpdate({
        _id : body._id
      }, {
        $set: {
            homeTeam : body.homeTeam,
            awayTeam : body.awayTeam 
        }
      }, null, (err, match) => {
         if(err) {
           return res.send({
            success : false,
            message : 'Error : Server error'
           });
         }
    
         if(!match) {
            return res.send({
              success : false,
              message : 'Error : Match does not exist'
            });
         } else {
             console.log("HOMETEAM \n\n\n\n\n");
             console.log(match.homeTeam);
             
             console.log("BODY \n\n\n\n\n");
             console.log(body);
            return res.send({
              success : true,
              message : 'Match info updated with success'
            });
        }
      });
});

module.exports = router;
