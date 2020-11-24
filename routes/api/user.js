const express = require('express');
const router = express.Router();

const UserSession = require('../../models/UserSession');
const posts = require('../../posts');

router.get('/posts', (req, res) => {
    res.json(posts);
});

router.get('/profileData', (req, res) => {
    
  const { query } = req;
  const { token } = query;
  const {
      name,
      email,
      password
    };

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
            _id : sessions.userId 
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
        
            const user = users[0];
            console.log("user 0");
            console.log(user);
            if(!user.validPassword(password)) {
              console.log("valid password");
              return res.send({
                success : false,
                message : "Error: Invalid"
              });
            }
        
            console.log("correct user");
            //Correct user
            const userSession = new UserSession();
            userSession.userId = user._id;
            console.log(userSession);
            userSession.save((err, doc) => {
              if(err) {
                return res.send({
                  success : false,
                  message : "Error: Server error"
                });
              }
        
              return res.send({
                success : true,
                message : "Valid login",
                token : doc._id
              });
          


     return res.send({
       success : true,
       message : 'Good'
      });
    }
  });
});

router.get('/verify', (req, res, next) => {

    const { query } = req;
    const { token } = query;
  
    console.log(query);
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
  
    console.log(query);
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
         console.log(token);
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