import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { motion } from 'framer-motion';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await api.get('/blogs');
                setBlogs(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    if (loading) return <div className="min-h-screen bg-[#050510] text-white pt-24 text-center">Loading Blogs...</div>;

    return (
        <div className="min-h-screen bg-[#050510] text-white font-inter">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 text-center overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
                <h1 className="relative z-10 text-5xl md:text-7xl font-bold mb-6">
                    Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Chronicles</span>
                </h1>
                <p className="relative z-10 text-xl text-gray-400 max-w-2xl mx-auto">
                    Deep dives into Web Development, AI, and the future of technology.
                </p>
            </section>

            {/* Blog Grid */}
            <section className="max-w-7xl mx-auto px-6 pb-24">
                {blogs.length === 0 ? (
                    <div className="text-center text-gray-500 py-12">No posts yet. Stay tuned!</div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {blogs.map((blog) => (
                            <Link key={blog._id} to={`/blogs/${blog._id}`} className="group block h-full">
                                <motion.div
                                    variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                                    className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition duration-300 h-full flex flex-col"
                                >
                                    <div className="h-48 bg-gray-800 relative overflow-hidden">
                                        {/* Fallback image functionality or default gradient */}
                                        {blog.image ? (
                                            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-gray-600">
                                                TECHNITH
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4">
                                            {blog.tags && blog.tags.map((tag, i) => (
                                                <span key={i} className="bg-black/60 backdrop-blur-md text-cyan-400 text-xs px-2 py-1 rounded mr-2 border border-cyan-500/20">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex items-center text-xs text-gray-400 mb-3 space-x-2">
                                            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                                            <span>•</span>
                                            <span className="text-cyan-500">5 min read</span>
                                        </div>
                                        <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-400 transition leading-tight">
                                            {blog.title}
                                        </h3>
                                        {/* Truncate content for preview - using a simple slice for now */}
                                        <p className="text-gray-400 text-sm line-clamp-3 mb-4 flex-1">
                                            {blog.content.substring(0, 150)}...
                                        </p>
                                        <div className="flex items-center text-sm font-semibold text-cyan-500 mt-auto">
                                            Read Article →
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </motion.div>
                )}
            </section>
        </div>
    );
};

export default Blogs;
