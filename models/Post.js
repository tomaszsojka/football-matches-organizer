const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    //for main wall undefined, for team wall ref to teamId
    teamId : {
        type : mongoose.Types.ObjectId,
        ref : 'Team',
        default: undefined
    },
    authorId : {
        type : mongoose.Types.ObjectId,
        ref : 'User',
        default : null
    },
    authorName : {
        type : String,
        default : ""
    },
    title : {
        type : String,
        default: ""
    },
    date : {
        type : Date,
        default: Date.now()
    },
    content : {
        type : String,
        default: ""
    }
});

module.exports = mongoose.model('Post', PostSchema);