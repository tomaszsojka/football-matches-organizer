const mongoose = require('mongoose');

const LineUpSchema = new mongoose.Schema({
    playerName : {
        type : String,
        default: ''
    },
    tShirtNumber : {
        type : Number,
        default: 0
    },
    position : {
        type : String,
        default: 'CM'
    },
    yellowCards : {
        type : Number,
        default : 0
    },
    redCards : {
        type : Number,
        default: 0
    },
    scoredGoals : {
        type : Number,
        default : 0
    }
});

const TeamInfoSchema = new mongoose.Schema({
    teamName : {
        type : String,
        default: ''
    },
    teamScore : {
        type : String,
        default: ''
    },
    lineup : [LineUpSchema]
});

const MatchSchema = new mongoose.Schema({
    date : {
        type : Date,
        default: Date.now
    },    
    isUpdated : {
        type : Boolean,
        default: false
    },
    homeTeam : TeamInfoSchema,
    awayTeam : TeamInfoSchema,
});

module.exports = mongoose.model('Match', MatchSchema);