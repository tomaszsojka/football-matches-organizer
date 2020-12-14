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

  Team.findOne({
    _id : teamId
  }, (err, team) => {
    if(err) {
      return res.send({
        success : false,
        message : "Error: Server error"
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
          } else if(team.playersIds.includes(users[0]._id)) {
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
  Team.findOne({
      _id : teamId
  }, (err, team) => {
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
      } else if(team.playersIds.includes(userId)) {
        return res.send({
          success : false,
          message : `Player is already a member of the ${team.name} team`
        });
      } else {
          User.findOne({
            _id : userId
          }, (err, user) => {
            if(err) {
              return res.send({
                success : false,
                message : 'Error : Server error'
              });
            } else if(!user) {
                return res.send({
                  success : false,
                  message : "No user of userId"
                });
            } else if(!user.teamInvites.includes(teamId)) {
                return res.send({
                    success : false,
                    message : `Invite from the ${team.name} team for the user not found`
                });
            } else {
              //team of teamId and user of userId found, now update team's playersIds list and user's teamInvites list
              team.playersIds.push(userId);
              team.save(err => {
                if(err) {
                    return res.send({
                      success : false,
                      message : "Error: Server error"
                    });
                } else {
                  const index = user.teamInvites.indexOf(teamId);
                  if (index > -1) {
                    user.teamInvites.splice(index, 1);
                  }
                  user.save(err => {
                    if(err) {
                        return res.send({
                          success : false,
                          message : "Error: Server error"
                        });
                    } else {
                      return res.send({
                        success : true,
                        message : `Player added to the team ${team.name}`
                      });
                    }
                  });
                }
              });
            }
          });
      }
  });
});

router.delete('/deleteInviteTeam', (req, res) => {
  const { body } = req;
  const { 
    teamId,
    userId
  } = body;

  User.findOne({
    _id : userId
  }, (err, user) => {
    if(err) {
      return res.send({
        success : false,
        message : 'Error : Server error'
      });
    } else if(!user) {
        return res.send({
          success : false,
          message : "No user of userId"
        });
    } else if(!user.teamInvites.includes(teamId)) {
        return res.send({
            success : false,
            message : `Invite not found`
        });
    } else {
      //userId found, now delete invite from teamInvites list
      const index = user.teamInvites.indexOf(teamId);
      if (index > -1) {
        user.teamInvites.splice(index, 1);
      }
      user.save(err => {
        if(err) {
            return res.send({
              success : false,
              message : "Error: Server error"
            });
        } else {
          return res.send({
            success : true,
            message : `Invite deleted`
          });
        }
      });
    }
  });
});
module.exports = router;