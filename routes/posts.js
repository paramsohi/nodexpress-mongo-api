var express = require('express');
var router = express.Router();

const postController = require('../controllers/PostController');
const authentication = require('../middlewares/userToken');

router.get('/', authentication, postController.getAllPosts);
router.post('/', authentication, postController.createPost);
router.put('/:spaceId', authentication, postController.updatePost);
router.get('/:spaceId', authentication, postController.getPost);
router.delete('/:spaceId', authentication, postController.deletePost);
router.get('/comments', authentication, postController.getComments);
router.post('/comments', authentication, postController.addComment);
router.put('/comments/:commentId', authentication, postController.updateComment);
router.delete('/comments/:commentId', authentication, postController.deleteComment);
module.exports = router;