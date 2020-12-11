const express = require('express');
// const { emit } = require('../../models/User');
const User = require('../../models/User');
const UserSession = require('../../models/UserSession');
const router = express.Router();

router.post('/register', (req, res) => {
  const { body } = req;
  const {
      name,
      email,
      password
    } = body;

  User.find({
    email : email  
  }, (err, previousUsers) => {
    if(err) {
      return res.send({
        success : false,
        message : "Error: Server error"
      });
    } else if(previousUsers.length > 0){
      return res.send({
        success : false,
        message : "An account with the given email exists."
      }); 
    }
    //Save new user
    const newUser = new User();
    newUser.name = name;
    newUser.email = email;
    newUser.password = newUser.generateHash(password);
    console.log("Saving new user");
    newUser.save((err, user) => {
      if(err) {
        return res.send({
          success : false,
          message : "Error: Server error"
        });
      } else {
        return res.send({
          success : true,
          message : "User signed up"
        });
      }
    });
  });
});


router.post('/login', (req, res) => {
  const { body } = req;
  const {
      email,
      password
    } = body;

  User.find({
    email : email  
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
    console.log(user);
    if(!user.validPassword(password)) {
      return res.send({
        success : false,
        message : "Password is not valid"
      });
    }

    //Correct user
    const userSession = new UserSession();
    userSession.userId = user._id;
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
        token : doc._id,
        userId : user._id
      });
    });
  });
});

module.exports = router;