const express = require('express');
const blogController = require('../controllers/blogController');

const router = express.Router();

router.get('/create', blogController.blog_create_get);
router.get('/', blogController.blog_index);
router.post('/', blogController.blog_create_post);
router.use( function( req, res, next ) {
    if ( req.query._method == 'DELETE' ) {
        // change the original METHOD into DELETE method
        req.method = 'DELETE';
        // and set requested url to /user/12
        req.url = req.path;
    }       
    next(); 
});
router.get('/:id', blogController.blog_details);
router.delete('/:id', blogController.blog_delete);

module.exports = router;