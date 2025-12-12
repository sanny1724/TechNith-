const express = require('express');
const router = express.Router();
const { getAllBlogs, createBlog, getBlogById, deleteBlog } = require('../controllers/blogController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getAllBlogs);
router.get('/:id', getBlogById);
router.post('/', protect, createBlog); // Add admin check later if needed
router.delete('/:id', protect, deleteBlog);

module.exports = router;
