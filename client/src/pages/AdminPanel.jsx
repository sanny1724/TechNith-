import { useState, useEffect } from 'react';
import api from '../api/axios';
import { FaUser, FaRocket, FaChalkboardTeacher, FaCheck, FaTimes, FaNewspaper, FaTrash, FaPlus } from 'react-icons/fa';

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState('users');
    const [data, setData] = useState({ users: [], projects: [], mentorships: [], blogs: [] });
    const [loading, setLoading] = useState(true);
    const [newBlog, setNewBlog] = useState({ title: '', content: '', image: '', tags: '' });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [usersRes, projectsRes, mentorshipRes, blogsRes] = await Promise.all([
                api.get('/auth/users'),
                api.get('/projects/all'),
                api.get('/mentorship/requests'),
                api.get('/blogs')
            ]);
            setData({
                users: usersRes.data,
                projects: projectsRes.data,
                mentorships: mentorshipRes.data,
                blogs: blogsRes.data
            });
        } catch (err) {
            console.error('Failed to fetch admin data', err);
        } finally {
            setLoading(false);
        }
    };

    const handleProjectStatusUpdate = async (id, newStatus) => {
        try {
            await api.put(`/projects/${id}`, { status: newStatus });
            // Optimistic update or refetch
            setData(prev => ({
                ...prev,
                projects: prev.projects.map(p => p._id === id ? { ...p, status: newStatus } : p)
            }));
        } catch (error) {
            console.error('Update failed', error);
            alert('Failed to update status');
        }
    };

    const handleMentorshipStatusUpdate = async (id, newStatus) => {
        try {
            await api.put(`/mentorship/${id}`, { status: newStatus });
            setData(prev => ({
                ...prev,
                mentorships: prev.mentorships.map(m => m._id === id ? { ...m, status: newStatus } : m)
            }));
        } catch (error) {
            console.error('Update failed', error);
            alert('Failed to update status');
        }
    };

    const handleCreateBlog = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/blogs', newBlog);
            setData(prev => ({ ...prev, blogs: [res.data, ...prev.blogs] }));
            setNewBlog({ title: '', content: '', image: '', tags: '' });
            alert('Blog created successfully!');
        } catch (err) {
            console.error(err);
            alert('Failed to create blog');
        }
    };

    const handleDeleteBlog = async (id) => {
        if (!window.confirm("Are you sure you want to delete this blog?")) return;
        try {
            await api.delete(`/blogs/${id}`);
            setData(prev => ({ ...prev, blogs: prev.blogs.filter(b => b._id !== id) }));
        } catch (err) {
            console.error(err);
            alert('Failed to delete blog');
        }
    };

    if (loading) return <div className="pt-32 text-center text-white">Loading Admin Dashboard...</div>;

    const TabButton = ({ id, label, icon: Icon }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${activeTab === id ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
        >
            <Icon /> {label}
        </button>
    );

    return (
        <div className="pt-24 min-h-screen bg-[#050510] px-6 pb-12">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-8">Admin Dashboard</h1>

            <div className="flex gap-4 mb-8 overflow-x-auto">
                <TabButton id="users" label={`Users (${data.users.length})`} icon={FaUser} />
                <TabButton id="projects" label={`Projects (${data.projects.length})`} icon={FaRocket} />
                <TabButton id="mentorships" label={`Mentorship (${data.mentorships.length})`} icon={FaChalkboardTeacher} />
                <TabButton id="blogs" label={`Blogs (${data.blogs.length})`} icon={FaNewspaper} />
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 overflow-hidden min-h-[500px]">
                {activeTab === 'users' && (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-black/20 text-gray-400 uppercase text-xs">
                                <tr>
                                    <th className="p-4">User</th>
                                    <th className="p-4">Email</th>
                                    <th className="p-4">Role</th>
                                    <th className="p-4">Joined</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-300">
                                {data.users.map(u => (
                                    <tr key={u._id} className="border-b border-gray-800 hover:bg-white/5">
                                        <td className="p-4 font-bold text-white">{u.fullName}</td>
                                        <td className="p-4">{u.email}</td>
                                        <td className="p-4"><span className={`px-2 py-1 rounded text-xs ${u.role === 'admin' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'}`}>{u.role}</span></td>
                                        <td className="p-4 text-gray-500">{new Date(u.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'projects' && (
                    <div className="grid gap-4">
                        {data.projects.length === 0 && <p className="text-gray-500 text-center py-10">No project inquiries yet.</p>}
                        {data.projects.map(p => (
                            <div key={p._id} className="border border-white/10 rounded-lg p-6 hover:bg-white/5 cursor-pointer relative group">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold text-cyan-400">{p.projectType}</h3>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-gray-500">{new Date(p.createdAt).toLocaleDateString()}</span>
                                        <select
                                            value={p.status}
                                            onChange={(e) => handleProjectStatusUpdate(p._id, e.target.value)}
                                            className="bg-black/40 text-xs border border-white/20 rounded px-2 py-1 text-white focus:outline-none focus:border-cyan-500"
                                        >
                                            <option value="New">New</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Completed">Completed</option>
                                            <option value="Archived">Archived</option>
                                        </select>
                                    </div>
                                </div>
                                <p className="text-white mb-2"><span className="text-gray-400">Client:</span> {p.name} ({p.email})</p>
                                <p className="text-gray-300 mb-4 line-clamp-2">{p.details}</p>
                                <div className="flex gap-2 text-xs">
                                    <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded">{p.budget}</span>
                                    <span className={`px-2 py-1 rounded ${p.status === 'Completed' ? 'bg-green-500/20 text-green-400' : p.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{p.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'mentorships' && (
                    <div className="grid gap-4">
                        {data.mentorships.length === 0 && <p className="text-gray-500 text-center py-10">No mentorship requests yet.</p>}
                        {/* Display Mentorship Data similar to Projects */}
                        {data.mentorships.map(m => (
                            <div key={m._id} className="border border-white/10 rounded-lg p-6 hover:bg-white/5">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-xl font-bold text-green-400 mb-2">{m.sessionType || 'Mentorship Session'}</h3>
                                    <select
                                        value={m.status}
                                        onChange={(e) => handleMentorshipStatusUpdate(m._id, e.target.value)}
                                        className="bg-black/40 text-xs border border-white/20 rounded px-2 py-1 text-white focus:outline-none focus:border-green-500"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Approved">Approved</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>
                                </div>
                                <p className="text-white"><span className="text-gray-400">Request from:</span> {m.name} ({m.email})</p>
                                <div className="mt-2 text-sm text-gray-400 grid grid-cols-2 gap-2">
                                    <p>📅 {m.date}</p>
                                    <p>⏰ {m.timeSlot}</p>
                                    <p>⏳ {m.duration}</p>
                                </div>
                                <p className="mt-4 text-gray-300 text-sm bg-white/5 p-3 rounded italic">"{m.message}"</p>
                                <div className="mt-3">
                                    <span className={`text-xs px-2 py-1 rounded ${m.status === 'Approved' ? 'bg-green-500/20 text-green-400' : m.status === 'Rejected' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                        Status: {m.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'blogs' && (
                    <div className="space-y-8">
                        {/* Create Blog Form */}
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center"><FaPlus className="mr-2" /> Create New Blog</h3>
                            <form onSubmit={handleCreateBlog} className="space-y-4">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Title"
                                        value={newBlog.title}
                                        onChange={e => setNewBlog({ ...newBlog, title: e.target.value })}
                                        className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Image URL"
                                        value={newBlog.image}
                                        onChange={e => setNewBlog({ ...newBlog, image: e.target.value })}
                                        className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Tags (comma separated)"
                                        value={newBlog.tags}
                                        onChange={e => setNewBlog({ ...newBlog, tags: e.target.value })}
                                        className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
                                    />
                                </div>
                                <div>
                                    <textarea
                                        placeholder="Content"
                                        value={newBlog.content}
                                        onChange={e => setNewBlog({ ...newBlog, content: e.target.value })}
                                        className="w-full h-32 bg-black/40 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-6 rounded-lg transition">
                                    Publish Blog
                                </button>
                            </form>
                        </div>

                        {/* List Existing Blogs */}
                        <div className="grid gap-4">
                            {data.blogs.length === 0 && <p className="text-gray-500">No blogs published.</p>}
                            {data.blogs.map(blog => (
                                <div key={blog._id} className="border border-white/10 rounded-lg p-4 flex justify-between items-center bg-white/5">
                                    <div className="flex items-center space-x-4">
                                        {blog.image && <img src={blog.image} alt={blog.title} className="w-16 h-16 object-cover rounded-lg" />}
                                        <div>
                                            <h4 className="font-bold text-white text-lg">{blog.title}</h4>
                                            <p className="text-gray-400 text-sm line-clamp-1">{blog.content}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <span className="text-xs text-gray-500">{new Date(blog.createdAt).toLocaleDateString()}</span>
                                        <button onClick={() => handleDeleteBlog(blog._id)} className="text-red-500 hover:text-red-400 transition p-2 hover:bg-white/10 rounded">
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPanel;
