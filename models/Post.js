const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    teamId : {
        type : String,
        default : ""
    },
    authorId : {
        type : String,
        default : ""
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