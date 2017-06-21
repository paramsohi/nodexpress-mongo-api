var express = require('express');
var router = express.Router();

const spaceController = require('../controllers/SpaceController');
const authentication = require('../middlewares/userToken');

router.get('/', authentication, spaceController.getNearBySpaces);
router.post('/', authentication, spaceController.createSpace);
router.put('/:spaceId', authentication, spaceController.updateSpace);
router.get('/:spaceId', authentication, spaceController.getSpace);
router.get('/:spaceId/posts', authentication, spaceController.getSpace);
router.delete('/:spaceId', authentication, spaceController.deleteSpace);

module.exports = router;