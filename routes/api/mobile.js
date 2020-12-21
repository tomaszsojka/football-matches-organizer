const express = require('express');
const router = express.Router();

// const matches = require('../../matches');
const Match = require('../../models/Match');

router.get('/matches', (req, res) => {
    Match.find({
        isUpdated : false
    }, (err, matches) => {
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

router.get('/updated-matches', (req, res) => {
    Match.find({
        isUpdated : true
    }, (err, matches) => {
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
        _id : body._id,
        isUpdated : false,
        isAccepted : true
      }, {
        $set: {
            isUpdated : true,
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
              message : 'Error : Match does not exist or is already updated'
            });
         }else {
            return res.send({
              success : true,
              message : 'Match info updated with success'
            });
        }
      });
});

module.exports = router;
