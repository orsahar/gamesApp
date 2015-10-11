var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    created_by : String,
    created_at : {type: Date, default: Date.now},
    name : String,
    description : String,
    images : {type : [String], default:[]}
});

mongoose.model('Post', postSchema);