const mongoose = require('mongoose');


const TrainingSchema = new mongoose.Schema({
    teamId : {
        type : mongoose.Types.ObjectId,
        ref : 'Team',
        default : ""
    },
    title: {
        type: String,
        defualt: "TRAINING"
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
    }
});

module.exports = mongoose.model('Training', TrainingSchema);