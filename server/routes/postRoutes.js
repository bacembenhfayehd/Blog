const {Router} = require ('express')




const  {createPost,getCatPots,getPost,getPosts,editPost,getUserPosts, deletePost} = require('../controller/postController')

const router = Router()
const authMiddleware = require ('../middleware/authMiddleware')

router.post('/',authMiddleware, createPost)
router.get('/', getPosts)
router.get('/:id', getPost )
router.patch('/:id',authMiddleware, editPost)
router.get('/categories/:category', getCatPots)
router.get('/users/:id', getUserPosts)
router.delete('/:id',authMiddleware, deletePost)


module.exports = router