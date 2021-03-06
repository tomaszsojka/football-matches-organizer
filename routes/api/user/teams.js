const express = require('express');
const router = express.Router();

const Team = require('../../../models/Team');
const UserSession = require('../../../models/UserSession');
const Match = require('../../../models/Match');

router.get('/teams', (req, res) => {
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
            
            Team.find({
                playersIds : sessions[0].userId
            }, (err, teams) => {
                if(err) {
                    return res.send({
                    success : false,
                    message : 'Error : Server error'
                    });
                } else {
                    return res.send({
                        success : true,
                        message : "User teams sent from sever",
                        teams : teams
                    });
                }
            });

        }
    });
});

router.post('/add-team', (req, res) => {
    const { body } = req;
    const {
      token,
      name,
      location
    } = body;
    //remove whitespaces from the start and back and make inside whitespaces single
    const trimNoMultipleSpaceName = name.trim().replace(/\s+/g, ' ')

    Team.find({
        // regex option i makes find case insensitive
        name : { $regex: trimNoMultipleSpaceName, $options: "i" }
    }, (err, previousTeams) => {
        if(err) {
        return res.send({
            success : false,
            message : "Error: Server error"
        });
        } else if(previousTeams.length > 0){
        return res.send({
            success : false,
            message : "A team with the given name exists."
        }); 
        } else {
            //no team with given name 
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
                        // proper UserSession found (of the same id as from local storage)
                        
                        //Save new team with UserSession's userId as captain
                        const newTeam = new Team();
                        newTeam.name = trimNoMultipleSpaceName;
                        newTeam.location = location;
                        newTeam.captainId = sessions[0].userId;
                        newTeam.playersIds.push(sessions[0].userId);
                        console.log("Saving new team");
                        newTeam.save((err, team) => {
                            if(err) {
                                return res.send({
                                success : false,
                                message : "Error: Server error"
                                });
                            } else {
                                return res.send({
                                success : true,
                                message : "Team added"
                                });
                            }
                        });
                    }
            });
        }
    });
});

router.get('/getTeamInfo', (req, res) => {
    const { query } = req;
    const { teamId } = query;
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
                message : "No team of query teamId"
            });
        } else {
            Match.find({
                _id : team.matchInvites,
                isAccepted : false
            }, (err, matches) => {
                if(err) {
                    return res.send({
                        success : false,
                        message : 'Error : Server error'
                    });
                } else {
                    return res.send({
                        success : true,
                        message : "Sending team info",
                        name: team.name,
                        captainId : team.captainId,
                        playersIds : team.playersIds,
                        matchInvites : matches.map(match => 
                            {
                                return({ 
                                    matchId : match._id,
                                    title : match.title,
                                    teamId: match.homeTeam.teamId, 
                                    teamName: match.homeTeam.teamName, 
                                    startDate: match.startDate,
                                    endDate: match.endDate,
                                    location : match.location 
                                });
                            })
        
                    });
                }
            });
        }
    });
});



module.exports = router;