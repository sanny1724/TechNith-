const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }, // Verify if rich text is needed, for now simple string
    author: { type: String, default: 'Sannith Reddy' },
    image: { type: String }, // URL to image
    tags: [{ type: String }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Blog', blogSchema);
