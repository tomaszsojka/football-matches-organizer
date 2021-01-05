const express = require('express');
const router = express.Router();

const Team = require('../../../models/Team');
const Training = require('../../../models/Training');
const Match = require('../../../models/Match');
const UserSession = require('../../../models/UserSession');
const mongoose = require('mongoose');


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
                //team is a hometeam or awayteam
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
                                    const defaultLineup = [
                                        {playerName: "Manuel Neuer", tShirtNumber: "1", position: "GK"},
                                        {playerName: "Alphonso Davies", tShirtNumber: "19", position: "LB"},
                                        {playerName: "David Alaba", tShirtNumber: "27", position: "LCB"},
                                        {playerName: "Niclas Sule", tShirtNumber: "4", position: "RCB"},
                                        {playerName: "Benjamin Pavard", tShirtNumber: "5", position: "RB"},
                                        {playerName: "Leon Goretzka", tShirtNumber: "18", position: "LDM"},
                                        {playerName: "Joshua Kimmich", tShirtNumber: "6", position: "RDM"},
                                        {playerName: "Leroy Sane", tShirtNumber: "10", position: "LW"},
                                        {playerName: "Thomas Muller", tShirtNumber: "25", position: "CM"},
                                        {playerName: "Kingsley Coman", tShirtNumber: "29", position: "RW"},
                                        {playerName: "Robert Lewandowski", tShirtNumber: "9", position: "FW"}
                                    ];
                                    newMatch.homeTeam = {
                                        teamName : homeTeam.name,
                                        teamId : homeTeam._id,
                                        lineup : defaultLineup
                                    };
                                    newMatch.awayTeam = {
                                        teamName : opponentTeam.name,
                                        teamId : opponentTeam._id,
                                        lineup : defaultLineup
                                    };
                                    //Saving new match appointments
                                    newMatch.save((err, match) => {
                                        if(err) {
                                            return res.send({
                                            success : false,
                                            message : "Error: Server error"
                                            });
                                        } else {
                                            //sending invite to the opponent team
                                            opponentTeam.matchInvites.push(mongoose.Types.ObjectId(match._id));
                                            opponentTeam.save(err => {
                                              if(err) {
                                                  return res.send({
                                                  success : false,
                                                  message : "Error: Server error"
                                                  });
                                              } else {
                                                  return res.send({
                                                    success : true,
                                                    message : "Match added and invitation for the match sent"
                                                  });
                                              }
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

  /* Match invites */

  
router.put('/acceptInviteMatch', (req, res) => {
    const { body } = req;
    const {
      matchId,
      title,
      teamId,
      teamName,
      startDate,
      endDate,
      location,

      invitedTeamId
    } = body;
    //looking for the invited team (the one that has invitation in matchInvites list)
    Team.findOne({
        _id : invitedTeamId
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
        } else if(!team.matchInvites.includes(matchId)) {
          return res.send({
            success : false,
            message : "Invite not found"
          });
        } else {
            Match.findOne({
              _id : matchId
            }, (err, match) => {
              if(err) {
                return res.send({
                  success : false,
                  message : 'Error : Server error'
                });
              } else if(!match) {
                  return res.send({
                    success : false,
                    message : "No match of matchId"
                  });
              } else if(match.isAccepted) {
                  return res.send({
                      success : false,
                      message : `Invitation from the team ${teamName} already accepted`
                  });
              } else {
                //team of teamId and match of matchId found, now update teams's matchInvites list 
                //and add match to the calendar of the invited team and updated isAccepted=true
                const index = team.matchInvites.indexOf(matchId);
                    if (index > -1) {
                      team.matchInvites.splice(index, 1);
                    }
                team.save(err => {
                  if(err) {
                      return res.send({
                        success : false,
                        message : "Error: Server error"
                      });
                  } else {
                    match.isAccepted = true;                    
                    match.save(err => {
                      if(err) {
                          return res.send({
                            success : false,
                            message : "Error: Server error"
                          });
                      } else {
                          const newMatch = new Match();
                          newMatch.title = title;
                          newMatch.startDate = startDate;
                          newMatch.endDate = endDate;
                          newMatch.location = location;
                          newMatch.homeTeam = {
                              teamName : team.teamName,
                              teamId : team._id,
                              lineup : []
                          };
                          newMatch.awayTeam = {
                              teamName : teamName,
                              teamId : teamId,
                              lineup : []
                          };
                          return res.send({
                            success : true,
                            message : `Invite from the team ${teamName} accepted`, 
                        
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

  
router.delete('/deleteInviteMatch', (req, res) => {
    const { body } = req;
    const {
      matchId,
      teamName,
      invitedTeamId
    } = body;
    //looking for the invited team (the one that has invitation in matchInvites list)
    Team.findOne({
        _id : invitedTeamId
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
        } else if(!team.matchInvites.includes(matchId)) {
          return res.send({
            success : false,
            message : "Invite not found"
          });
        } else {
            //team found, now delete invite from matchInvites list
            const index = team.matchInvites.indexOf(matchId);
            if (index > -1) {
                team.matchInvites.splice(index, 1);
            }
            team.save(err => {
                if(err) {
                    return res.send({
                        success : false,
                        message : "Error: Server error"
                    });
                } else {
                    //delete not accepted match document
                    Match.deleteOne({
                        _id : matchId
                    }, (err, match) => {
                        if(err) {
                            return res.send({
                                success : false,
                                message : "Error: Server error"
                            });
                        } else if(!match) {
                            return res.send({
                                success : false,
                                message : "Match not found"
                            });
                        } else {
                            return res.send({
                                success : true,
                                message : `Invite from the team ${teamName} deleted`, 
                            
                            }); 
                        }
                    });
                }
            });
        }
    });
  });
  

module.exports = router;