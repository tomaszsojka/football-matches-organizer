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
    teamId : {
        type : mongoose.Types.ObjectId,
        ref : 'Team',
        default : null
    },
    teamName : {
        type : String,
        default: ''
    },
    teamLogoUrl : {
        type : String,
        default: 'https://scontent-frt3-1.xx.fbcdn.net/v/t1.0-9/119037241_3044705132304978_401051008132371636_o.jpg?_nc_cat=102&ccb=2&_nc_sid=825194&_nc_ohc=3NjDDroJbrcAX-GDZQ4&_nc_ht=scontent-frt3-1.xx&oh=8fbd176e068e1bc6a661ff3e7f58740e&oe=5FFF00CB'
    },
    teamScore : {
        type : String,
        default: ''
    },
    lineup : [LineUpSchema]
});


const MatchSchema = new mongoose.Schema({
    title: {
        type: String,
        defualt: "MATCH"
    },
    startDate : {
        type : Date,
        default: Date.now
    },    
    endDate : {
        type : Date,
        default: Date.now
    },
    location : {
        type : String,
        default : ""
    },
    isAccepted : {
        type : Boolean,
        default: false
    },
    isUpdated : {
        type : Boolean,
        default: false
    },
    homeTeam : TeamInfoSchema,
    awayTeam : TeamInfoSchema,
});

module.exports = mongoose.model('Match', MatchSchema);