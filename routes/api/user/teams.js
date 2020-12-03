const express = require('express');
const router = express.Router();

const Team = require('../../../models/Team');
const User = require('../../../models/User');
const UserSession = require('../../../models/UserSession');


router.post('/add-team', (req, res) => {
    const { body } = req;
  const {
      token,
      name,
      location
    } = body;


  Team.find({
    name : name  
  }, (err, previousTeams) => {
    if(err) {
      return res.send({
        success : false,
        message : "Error: Server error"
      });
    } else if(previousTeams.length > 0){
      return res.send({
        success : false,
        message : "A team with the given name exists."
      }); 
    } else {
        //no team with given name 
        UserSession.find({
            _id : token,
            isDeleted : false 
        }, (err, sessions) => {
                if(err) {
                    return res.send({
                    success : false,
                    message : 'Error : Server error'
                    });
                }
                if(sessions.length != 1) {
                    return res.send({
                    success : false,
                    message : 'Error : Invalid'
                    });
                } else {
                    // proper UserSession found (of the same id as from local storage)
                    
                    //Save new team with UserSession's userId as captain
                    const newTeam = new Team();
                    newTeam.name = name;
                    newTeam.location = location;
                    newTeam.captainId = sessions[0].userId;
                    newTeam.playersIds.push(sessions[0].userId);
                    console.log("Saving new team");
                    newTeam.save((err, team) => {
                        if(err) {
                            return res.send({
                            success : false,
                            message : "Error: Server error"
                            });
                        } else {
                            return res.send({
                            success : true,
                            message : "Team added"
                            });
                        }
                    });
                }
        });
    }
  });
});


router.get('/teams', (req, res) => {
    const { query } = req;
    const { token } = query;
    
    UserSession.find({
        _id : token,
        isDeleted : false 
    }, (err, sessions) => {
        if(err) {
            return res.send({
            success : false,
            message : 'Error : Server error'
            });
        }
        if(sessions.length != 1) {
            return res.send({
            success : false,
            message : 'Error : Invalid'
            });
        } else {
            
            Team.find({
                playersIds : sessions[0].userId
            }, (err, teams) => {
                if(err) {
                    return res.send({
                    success : false,
                    message : 'Error : Server error'
                    });
                } else {
                    return res.send({
                        teams : teams,
                        currentUserId : sessions[0].userId
                    });
                }
            });

        }
    });

});



module.exports = router;