const express = require('express');
const router = express.Router();

const User = require('../../../models/User');
const UserSession = require('../../../models/UserSession');
const Team = require('../../../models/Team');


router.get('/profileData', (req, res) => {
    
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
            User.find({
                _id : sessions[0].userId 
            }, (err, users) => {
                if(err) {
                  return res.send({
                      success : false,
                      message : "Error: Server error"
                  });
                }  else if(users.length != 1) {
                  return res.send({
                      success : false,
                      message : "Error: Invalid"
                  });
                } else {
                  Team.find({
                    _id : users[0].teamInvites
                  }, (err, teams) => {
                    if(err) {
                        return res.send({
                        success : false,
                        message : 'Error : Server error'
                        });
                    } else {
                        const user = users[0];
                        return res.send({
                            success : true,
                            message : "Profile data received from server",
                            name : user.name,
                            email : user.email,
                            teamInvites : teams.map((team) =>{return({ id: team._id, name: team.name })})
                        });
                    }
                  });
                }
            });
        }
    });
});

router.get('/getUserId', (req, res) => {
    
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
          User.find({
              _id : sessions[0].userId 
          }, (err, users) => {
              if(err) {
                return res.send({
                    success : false,
                    message : "Error: Server error"
                });
              }  else if(users.length != 1) {
                return res.send({
                    success : false,
                    message : "Error: Invalid"
                });
              }
          
              return res.send({
                  success : true,
                  message : "Profile data received from server",
                  userId : users[0]._id
              });
          });
      }
  });
});

router.get('/verify', (req, res, next) => {

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
        return res.send({
          success : true,
          message : 'Good'
         });
       }
    });
});  

router.get('/logout', (req, res, next) => { 
    const { query } = req;
    const { token } = query;
  
    UserSession.findOneAndUpdate({
      _id : token,
      isDeleted : false
    }, {
      $set: {
        isDeleted: true
      }
    }, null, (err, session) => {
       if(err) {
         return res.send({
          success : false,
          message : 'Error : Server error'
         });
       }
  
       if(!session) {
          return res.send({
            success : false,
            message : 'Error : Session does not exist'
          });
       } else {
          return res.send({
            success : true,
            message : 'Logged out with success'
          });
      }
    });
});

module.exports = router;