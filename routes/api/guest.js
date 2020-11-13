const express = require('express');
// const { emit } = require('../../models/User');
const User = require('../../models/User');
const UserSession = require('../../models/UserSession');
const router = express.Router();

router.post('/register', (req, res) => {
  console.log("Register start on server side");
  const { body } = req;
  const {
      name,
      email,
      password
    } = body;

  const role = "user";
  console.log(body);

  User.find({
    email : email  
  }, (err, previousUser) => {
    if(err) {
      return res.send({
        success : false,
        message : "Error: Server error"
      });
    } else if(previousUser.length > 0){
      return res.send({
        success : false,
        message : "Error: Account already exists"
      }); 
    }

    //Save new user
    console.log("Saving new user");
    const newUser = new User();
    newUser.name = name;
    newUser.email = email;
    newUser.password = newUser.generateHash(password);
    newUser.role = role;
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
  console.log("Login start on server side");
  const { body } = req;
  const {
      email,
      password
    } = body;

  console.log(body);

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
    });


  // if(body.email === userRes.email && body.password === userRes.password) {
  //   console.log("OK");
  //   res.json(userRes);
    
  // } else {
  //     console.log(`NIEOK : ${body.email}   ${userRes.email}`);
  //     res.status(401).json({msg : "User not exists"});
  // }
  });
});


module.exports = router;