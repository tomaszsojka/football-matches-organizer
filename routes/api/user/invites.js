const express = require('express');
const User = require('../../../models/User');
const router = express.Router();

router.post('/send-invite', (req, res) => {
   
    const { body } = req;
    const { 
        teamId,
        email 
    } = body;

  User.findOneAndUpdate({
    email : email  
  }, {
    $addToSet: {
      teamInvites: teamId
    }
  }, null, (err, user) => {
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
});

module.exports = router;