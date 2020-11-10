const express = require('express');
const router = express.Router();


router.post('/login', (req, res) => {
    const { body } = req;
    const  userRes = 
      {
        email: "aaa@aaa.com",
        password: "aaa",
        phoneNumber: "123123123",
        role : "User"
  
      };
  
    if(body.email === userRes.email && body.password === userRes.password) {
      console.log("OK");
      res.json(userRes);
      
    } else {
        console.log(`NIEOK : ${body.email}   ${userRes.email}`);
        res.status(401).json({msg : "User not exists"});
    }
});

module.exports = router;