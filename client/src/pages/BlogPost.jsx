import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import { FaArrowLeft, FaCalendar, FaUser, FaTag } from 'react-icons/fa';

const BlogPost = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await api.get(`/blogs/${id}`);
                setBlog(res.data);
            } catch (err) {
                setError("Blog not found");
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id]);

    if (loading) return <div className="min-h-screen bg-[#050510] text-white pt-32 text-center">Loading Article...</div>;
    if (error || !blog) return <div className="min-h-screen bg-[#050510] text-white pt-32 text-center text-red-500">Article not found.</div>;

    return (
        <div className="min-h-screen bg-[#050510] text-white font-inter pt-24 pb-20">
            {/* Reading Progress Bar (Bonus) */}
            <div className="fixed top-0 left-0 h-1 bg-cyan-500 z-50 w-full transform origin-left scale-x-0" style={{ transform: 'scaleX(1)' /* Implement scroll logic later */ }}></div>

            <article className="max-w-4xl mx-auto px-6">
                <Link to="/blogs" className="inline-flex items-center text-gray-400 hover:text-cyan-400 mb-8 transition">
                    <FaArrowLeft className="mr-2" /> Back to Blogs
                </Link>

                <header className="mb-12 text-center">
                    <div className="flex justify-center gap-2 mb-6">
                        {blog.tags && blog.tags.map((tag, i) => (
                            <span key={i} className="bg-cyan-900/20 text-cyan-400 border border-cyan-500/30 px-3 py-1 rounded-full text-sm font-mono">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{blog.title}</h1>
                    <div className="flex items-center justify-center gap-6 text-gray-400 text-sm">
                        <span className="flex items-center gap-2"><FaUser className="text-cyan-500" /> {blog.author}</span>
                        <span className="flex items-center gap-2"><FaCalendar className="text-cyan-500" /> {new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                </header>

                {blog.image && (
                    <div className="mb-12 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                        <img src={blog.image} alt={blog.title} className="w-full h-auto" />
                    </div>
                )}

                <div className="prose prose-invert prose-lg max-w-none prose-a:text-cyan-400 hover:prose-a:text-cyan-300 prose-headings:text-white prose-img:rounded-xl">
                    {/* Simplified render. In production use a markdown parser or HTML sanitizer */}
                    <div dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br />') }} />
                </div>
            </article>
        </div>
    );
};

export default BlogPost;
