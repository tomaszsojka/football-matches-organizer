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
        type : [String],
        default : []
    },
    redCards : {
        type : String,
        default: ''
    },
    scoredGoals : {
        type : [String],
        default : []
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
    homeTeam : TeamInfoSchema,
    awayTeam : TeamInfoSchema,
});

module.exports = mongoose.model('Match', MatchSchema);