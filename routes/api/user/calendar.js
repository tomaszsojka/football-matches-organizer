const express = require('express');
const router = express.Router();

const Team = require('../../../models/Team');
const Training = require('../../../models/Training');
const Match = require('../../../models/Match');
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
            Match.find({
                $or:[ {'homeTeam.teamId' : teamId}, {'awayTeam.teamId': teamId}],
                isAccepted : true
            }, (err, matches) => {
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
                        matches : matches
                    });
                }
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

  
router.post('/add-match', (req, res) => {
    const { body } = req;
    const {
        homeTeamId,
        title,
        startDate,
        endDate,
        location,
        opponent
      } = body;

    //remove whitespaces from the start and back and make inside whitespaces single
    const trimNoMultipleSpaceName = opponent.trim().replace(/\s+/g, ' ')

    //find opponent by name 
    Team.findOne({
      // regex option i makes find case insensitive
      name : { $regex: trimNoMultipleSpaceName, $options: "i" }
    }, (err, opponentTeam) => {
        if(err) {
            return res.send({
                success : false,
                message : "Error: Server error"
            });
        } else {
            if(!opponentTeam) {
                return res.send({
                    success : false,
                    message : "Opponent team of this name does not exist"
                });
            } else {
                //finding hometeam
                Team.findOne({
                    _id : homeTeamId
                }, (err, homeTeam) => {
                    if(err) {
                        return res.send({
                            success : false,
                            message : "Error: Server error"
                        });
                    } else if(!homeTeam) {
                        return res.send({
                            success : false,
                            message : "Error : Home team does not exist"
                        });
                    } else if(homeTeam._id.equals(opponentTeam._id)) {
                        return res.send({
                            success : false,
                            message : "If you want to make appointment only for this team change Event type to \"training\""
                        });
                    } else {
                        console.log(homeTeam, opponentTeam);
                        Match.find({
                            $and: [
                                //if there is already a match appointment between both teams at the same time
                                { $or: [ 
                                    {'homeTeam.teamId' : homeTeamId, 'awayTeam.teamId' : opponentTeam._id}, 
                                    {'homeTeam.teamId' : opponentTeam._id, 'awayTeam.teamId': homeTeamId}
                                ] },
                                
                                //new match cannot start before and finish in the time of the match or start in the time of the match
                                { $or: [ 
                                    {startDate : {$lte: startDate}, endDate : {$gt: startDate}}, 
                                    {startDate : {$lt: endDate}, endDate : {$gte: endDate}}, 
                                    {startDate : {$gte: startDate}, endDate : {$lte: endDate}}
                                ] }
                            ]
                        }, (err, matches) => {
                            if(err) {
                                return res.send({
                                    success : false,
                                    message : 'Error : Server error'
                                });
                            } else {
                                if(matches.length > 0) {
                                    console.log("Match at this hour exists: ");
                                    console.log(matches[0].startDate);
                                    console.log(matches[0].endDate);
                                    return res.send({
                                        success : false,
                                        message : 'Appointment for the match between those two teams at this hour already exists'
                                    });
                                } else {
                                    const newMatch = new Match();
                                    newMatch.title = title;
                                    newMatch.startDate = startDate;
                                    newMatch.endDate = endDate;
                                    newMatch.location = location;
                                    newMatch.homeTeam = {
                                        teamName : homeTeam.name,
                                        teamId : homeTeam._id,
                                        lineup : []
                                    };
                                    newMatch.awayTeam = {
                                        teamName : opponentTeam.name,
                                        teamId : opponentTeam._id,
                                        lineup : []
                                    };
                                    //Saving new match appointments
                                    newMatch.save((err, match) => {
                                        if(err) {
                                            return res.send({
                                            success : false,
                                            message : "Error: Server error"
                                            });
                                        } else {
                                            return res.send({
                                            success : true,
                                            message : "Match added"
                                            });
                                        }
                                    });
                                }
                            }
                        });
                    }
                });
            }
        }
    });
  });


module.exports = router;