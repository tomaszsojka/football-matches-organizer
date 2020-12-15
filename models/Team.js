const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    name : {
        type : String,
        default: ''
    },
    location : {
        type : String,
        default: ''
    },
    captainId : {
        type : mongoose.Types.ObjectId,
        ref : 'User'
    },
    playersIds : {
        type : [mongoose.Types.ObjectId],
        ref : 'User',
        default : []
    }
});

module.exports = mongoose.model('Team', TeamSchema);