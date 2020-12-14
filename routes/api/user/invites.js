const express = require('express');
const User = require('../../../models/User');
const UserSession = require('../../../models/UserSession');
const Team = require('../../../models/Team');
const router = express.Router();

router.post('/send-invite', (req, res) => {
   
    const { body } = req;
    const { 
        teamId,
        email 
    } = body;

  Team.find({
    _id : teamId
  }, (err, teams) => {
    if(err) {
      return res.send({
        success : false,
        message : "Error: Server error"
      });
    } else if(teams.length !== 1) {
      return res.send({
        success : false,
        message : 'Error : Invalid'
        });
    } else {
      User.find({
        email : email
      }, (err, users) => {
        if(err) {
            return res.send({
              success : false,
              message : "Error: Server error"
            });
          } else if(users.length === 0) {
              return res.send({
                success : false,
                message : "No user found with that email"
              });
          } else if(teams[0].playersIds.includes(users[0]._id)) {
              return res.send({
                success : false,
                message : "User already is a member of the team"
              });
          } else if(users[0].teamInvites.includes(teamId)) {
              return res.send({
                success : false,  
                message : "User is already invited"
              });
          } else {
              users[0].teamInvites.push(teamId);
              users[0].save(err => {
                if(err) {
                    return res.send({
                    success : false,
                    message : "Error: Server error"
                    });
                } else {
                    return res.send({
                      success : true,
                      message : "Invitation to the team sent"
                    });
                }
              });
          }
        });
    }
  });

});

router.get('/invites', (req, res, next) => {
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
      if(sessions.length !== 1) {
          return res.send({
          success : false,
          message : 'Error : Invalid'
          });
      } else {
          User.find({
            _id : sessions[0].userId
          }, (err,users) =>{
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
              return res.send({
                success : true,
                message : "User teams invites sent from sever",
                teamInvites : users[0].teamInvites
              });
            }
          });
      }
  });

});

router.put('/joinInviteTeam', (req, res) => {
  const { body } = req;
  const { 
    teamId,
    userId
  } = body;
  Team.findOneAndUpdate({
      _id : teamId
  }, {
    $addToSet: {
      playersIds: userId
    }
  }, null, (err, team) => {
      if(err) {
          return res.send({
          success : false,
          message : 'Error : Server error'
          });
      } else if(!team) {
          return res.send({
              success : false,
              message : "No team of teamId"
          });
      } else {
          User.findOne({
            _id : userId
          }, (err, user) => {
            const index = user.teamInvites.indexOf(teamId);
            if (index > -1) {
              user.teamInvites.splice(index, 1);
            }
            user.save();
            return res.send({
              success : true,
              message : `Player added to the team ${team.name}`
            });
          });
      }
  });
});
module.exports = router;