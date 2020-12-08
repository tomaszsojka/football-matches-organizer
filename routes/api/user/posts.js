const express = require('express');
const router = express.Router();

const Team = require('../../../models/Team');
const User = require('../../../models/User');
const UserSession = require('../../../models/UserSession');
const Post = require('../../../models/Post');

const posts = require('../../../posts');

//get posts by teamId, if no team Id get main wall posts
router.get('/posts', (req, res) => {
    const { query } = req;
    const { teamId } = query;

    // let spaceIndexArray = [];
    // let name = teamName.substring(0, teamName.indexOf("."));
    // let indexes = teamName.replace(`${name}.`, '');
    // console.log(name);
    // console.log(indexes);
    // console.log(teamName);
    if(!teamId) {
        res.json(posts);
    } else {
        Team.find({
            _id : teamId  
          }, (err, teams) => {
            if(err) {
              return res.send({
                success : false,
                message : "Error: Server error"
              });
            } else if(teams.length != 1){
              return res.send({
                success : false,
                message : "Exists more or less than one team with the passed name."
              }); 
            } else {
                //only one team with passed name found
                Post.find({
                    teamId : teams[0]._id
                }, (err, posts) => {
                        if(err) {
                            return res.send({
                                success : false,
                                message : 'Error : Server error'
                            });
                        } else {
                            // proper All posts of team of teamId found
                            return res.send({
                                success : true,
                                message : `${teams[0].name}'s posts loaded`,
                                posts
                            });
                        }
                });
            }
          });

    }
});

router.post('/add-post', (req, res) => {
    const { body } = req;
    const {
        token,
        teamId,
        title,
        content
        } = body;
    
    
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
                User.find({
                    _id : sessions[0].userId 
                }, (err, users) => {
                    if(err) {
                      return res.send({
                          success : false,
                          message : "Error: Server error"
                      });
                    }  else if(users.length != 1) {
                      return res.send({
                          success : false,
                          message : "Error: Invalid"
                      });
                    }

                    const user = users[0];
                    
                    //Save new post 
                    const newPost = new Post();
                    newPost.teamId = teamId;
                    newPost.authorId = user._id;
                    newPost.authorName = user.name;
                    newPost.title = title;
                    newPost.content = content;
                    newPost.date = Date.now();
                    console.log(`Saving new post`);
                    newPost.save((err, post) => {
                        if(err) {
                            return res.send({
                            success : false,
                            message : "Error: Server error"
                            });
                        } else {
                            return res.send({
                            success : true,
                            message : "Post added"
                            });
                        }
                    });
                });
            }
        });
 
});

module.exports = router;