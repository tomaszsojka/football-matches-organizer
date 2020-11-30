const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    name : {
        type : String,
        default: ''
    },
    captainId : {
        type : String,
        default: ""
    },
    playersIds : {
        type : [String],
        default : []
    }
});

module.exports = mongoose.model('Team', TeamSchema);