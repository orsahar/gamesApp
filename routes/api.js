var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = mongoose.model('Post');

//currently anyone is authenticated
//var isAuth = function(req, res, next){
//    return next();
//};
//
//router.use('/posts', isAuth);

router.route('/posts')
    .get(function(req, res) {
        //getting all posts inside the callback
        Post.find(function(err, posts) {
            if(err) {
                return res.status(500).send(err);
            }
            //sending the posts in the response
            return res.status(200).send(posts);
        });
    })
    .post(function(req, res) {
        var newPost = new Post();
        //saving the game's description
        newPost.description = req.body.description;
        //saving the game's name
        newPost.name = req.body.name;
        //saving the images
        newPost.images = req.body.images;
        //saving the creator
        newPost.created_by = req.body.created_by;
        newPost.save(function(err, post) {
            if(err) {
                return res.send(500, err);
            }
            return res.json(post);
        });
    })
    //meaningless
    .delete(function(req, res) {
    })
    //meaningless
    .put(function(req, res) {
    });
router.route('/posts/:id')
    .get(function(req, res) {
        var postId = req.params.id;
        Post.findById(postId, function(err, post) {
            if(err) {
                return res.send(500, err);
            }
            return res.json(post);
        });
    })
    //meaningless
    .post(function(req, res) {
    })

    .delete(function(req, res) {

        var postId = req.params.id;
        Post.remove({_id: postId}, function(err) {
            if(err) {
                return res.send(500, err);
            }
            return res.json({message: 'removved post with id ' + postId});
        });
    })
    .put(function(req, res) {
        var postId = req.params.id;
        var union = function(a,b){
            var c = a;
            var exist = false;
            for(var i = 0; i<=b.length;i++){
                    for(var j = 0;j<= a.length; j++)
                    {
                        if(b[i] === a[j])
                        {
                            exist = true;
                        }
                    }
                if(!exist)
                {
                    c.push(b[i]);
                }
                exist = false;
            }
            return c;
        };
        Post.findById(postId, function(err, post){
            if(err)
            {
                res.status(500).send( err);
            }
            post.description = req.body.description;
            post.images = union(post.images,req.body.images);
            post.save(function(err, post){
                if(err) {
                    return res.send(500, err);
                }
                return res.json(post);
            })
        });
    });

module.exports = router;