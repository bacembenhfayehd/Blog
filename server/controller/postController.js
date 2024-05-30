const Post = require ('../models/postModel')
const User = require ('../models/userModel')
const fs = require ('fs')
const path = require ('path')
const {v4: uuid} = require('uuid')
const HttpError = require('../models/errorModel')








//// Create post
//POST : api/posts
//Protected

const createPost = async (req, res, next) => {
    try {
        let { title, category, description } = req.body;

        if (!title || !category || !description || !req.files ) {
            return next(new HttpError('Fill in all fields. Please choose a thumbnail', 422));
        }

        const {thumbnail} = req.files;

        // Check file size
        if (thumbnail.size > 2000000) {
            return next(new HttpError('File is too big. Please choose a file less than 200mb', 422));
        }

        let fileName = thumbnail.name;
        let splittedFilename = fileName.split('.');
        let newFilename = splittedFilename[0] + uuid() + "." + splittedFilename[splittedFilename.length - 1];

        thumbnail.mv(path.join(__dirname, '..', '/uploads', newFilename), async (err) => {
            if (err) {
                return next(new HttpError(err));
            } else {
                const newPost = await Post.create({
                    title,
                    description,
                    category,
                    thumbnail: newFilename,
                    creator: req.user.id
                });

                if (!newPost) {
                    return next(new HttpError('Post could not be created. ', 422));
                }

                // Find user and increase post count by 1
                const currentUser = await User.findById(req.user.id);
                const userPostCount = currentUser.posts + 1;
                await User.findByIdAndUpdate(req.user.id, { posts: userPostCount });

                res.status(201).json(newPost);
            }
        });
    } catch (error) {
        return next(new HttpError(error));
    }
};



//// get all  posts
//get : api/posts
//UNProtected

const getPosts = async (req, res, next) => {
    try {

        const posts = await Post.find().sort({updateAt: -1})
        res.status(200).json(posts)
        
    } catch (error) {
        return next (new HttpError(error))
        
    }
}


//// get single post
//get : api/posts/:id
//Protected

const getPost = async (req, res, next) => {
    try {

        const postId = req.params.id;
        const post = await Post.findById(postId);

        if (!post){
            return next (new HttpError('Post not found',422))

        }

        res.status(200).json(post)
        
    } catch (error) {
        return next (new HttpError(error))
        
    }
}


//// get post by category
//get : api/posts/categories/:category
//UnProtected

const getCatPots = async (req, res, next) => {
    try {

        const {category} = req.params;
        const catPost = await Post.find({category}).sort({createdAt: -1})
        res.status(200).json(catPost)
        
    } catch (error) {
        return next(new HttpError(error))
        
    }
}

//// get author posts
//get : api/posts/users/:id
//UnProtected

const getUserPosts = async (req, res, next) => {
    try {

        const {id} = req.params;
        const posts = await Post.find({creator: id}).sort({createdAt: -1})
        res.status(200).json(posts)
        
    } catch (error) {
        return next(new HttpError(error))
        
    }
}


//// edit post
//Patch : api/posts/:id
//Protected

const editPost = async (req, res, next) => {
    try {

        let fileName;
        let newFilename;
        let updatedPost;
        const postId = req.params.id;

        let {title, category , description} = req.body;
        
        if(!title || !category || description.length < 12){
            return next (new HttpError('Fill in all fields',422))
        }

        if(!req.files){

            updatedPost = await Post.findByIdAndUpdate(postId, {title,category,description},{new: true})
        } else {

            //get old post from data base
            const oldPost = await Post.findById(postId)
            if (req.user.id == oldPost.creator) {
            
            //delete old thumbnail from upload
            fs.unlink(path.join(__dirname, '..', 'uploads', oldPost.thumbnail),async (err) => {
                if (err){
                    return next (new HttpError(err))
                }
            })

             //upload new thumbnail
             const {thumbnail} = req.files;
             //check the size
             if (thumbnail.size > 2000000){
                 return next (new HttpError('Thumnail too big. Should be less than 2mb'))
             }

             fileName = thumbnail.name;
             let splittedFilename = fileName.split('.')
              newFilename = splittedFilename[0] + uuid() + "." + splittedFilename[splittedFilename.length - 1]
             thumbnail.mv(path.join(__dirname, '..', 'uploads', newFilename), async (err) => {
                 if (err) {
                     return next (new HttpError(err))
                 }
             })

             updatedPost = await Post.findByIdAndUpdate(postId,{title, description, category, thumbnail: newFilename},{new: true})
         }
        }

        if (!updatedPost){
            return next (new HttpError('could not update post',400))
        }

        res.status(200).json(updatedPost)
        
    } catch (error) {
        return next (new HttpError(error))
    }
}



//// delete post
//Delete : api/posts
//Protected

const deletePost = async (req, res, next) => {
    try {

        const postId = req.params.id;
        if (!postId){
            return next (new HttpError('Post unavailable',400))
        }

        const post = await Post.findById(postId)
        const fileName = post?.thumbnail;
        if (req.user.id == post.creator) {
        //delete thumbnail from upload folder
        fs.unlink(path.join(__dirname, '..', 'uploads', fileName), async () => {
            if (err){
                return next (new HttpError(err))
            } else {
                await  Post.findByIdAndDelete(postId)

                //find user and reduce post count by 1
                const currentUser = await User.findById(req.user.id);
                const userPostCount = currentUser?.posts - 1;
                await User.findByIdAndUpdate(req.user.id, {posts: userPostCount})

            }
        })

    }else {
        return next (new HttpError('Post can not be deleted',403))
    }

        res.json(`Post${postId} deleted successfully.`)
        
    } catch (error) {
        return next (new HttpError(error))
        
    }
}


module.exports = {createPost,getCatPots,getPost,getPosts,editPost,getUserPosts,deletePost}