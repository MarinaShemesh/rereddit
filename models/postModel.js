const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let commentSchema = new Schema({
    author: Object,
    body: {type: String},
    upvotes: {type: Number},
    post: {type: Schema.Types.ObjectId, ref: 'post'}//note the population
});

let Comment = mongoose.model("comment", commentSchema);

let postSchema = new Schema({
    text: {type: String},
    author: Object,
    upvotes: {type: Number},
    comments: [{type: Schema.Types.ObjectId, ref: 'comment'}]//note the population
});

postSchema.methods.upvote=function(){
    this.upvotes++;
}

postSchema.methods.downvote=function(){
    this.upvotes--;
}


let Post = mongoose.model('post', postSchema);
//Be carefull how u required the models in the server
module.exports = {
    Post: Post,
    Comment: Comment

};