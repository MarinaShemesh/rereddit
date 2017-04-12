const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let commentSchema = new Schema({
    author: {type: String},
    body: {type: String},
    upvotes: {type: Number},
    post: {type: Schema.Types.ObjectId, ref: 'post'}//note the population
});

let Comment = mongoose.model("comment", commentSchema);

let postSchema = new Schema({
    text: {type: String},
    author: {type: String},
    upvotes: {type: Number},
    comments: [{type: Schema.Types.ObjectId, ref: 'comment'}]
});

//
let Post = mongoose.model('post', postSchema);
//Be carefull how u required the models in the server
module.exports = {
    Post: Post,
    Comment: Comment
};