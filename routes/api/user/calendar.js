const express = require('express');
const router = express.Router();

const Team = require('../../../models/Team');
const Training = require('../../../models/Training');
const UserSession = require('../../../models/UserSession');


router.get('/appointments', (req, res) => {
    const { query } = req;
    const { teamId } = query;
    
    Training.find({
        teamId : teamId
    }, (err, trainings) => {
        if(err) {
            return res.send({
            success : false,
            message : 'Error : Server error'
            });
        } else {
            return res.send({
                success : true,
                message : "Team's trainings sent from sever",
                trainings : trainings,
                matches : []
            });
        }
    });
});


router.post('/add-training', (req, res) => {
    const { body } = req;
    const {
        teamId,
        title,
        startDate,
        endDate,
        location
      } = body;
  
    //Save new training
    const newTraining = new Training(body);
    console.log("Saving new training appointment");
    newTraining.save((err, training) => {
        if(err) {
            return res.send({
            success : false,
            message : "Error: Server error"
            });
        } else {
            return res.send({
            success : true,
            message : "Training appointment added"
            });
        }
    });
  });


module.exports = router;