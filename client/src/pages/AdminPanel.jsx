import { useState, useEffect } from 'react';
import api from '../api/axios';
import { FaUser, FaRocket, FaChalkboardTeacher, FaCheck, FaTimes } from 'react-icons/fa';

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState('users');
    const [data, setData] = useState({ users: [], projects: [], mentorships: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usersRes, projectsRes, mentorshipRes] = await Promise.all([
                    api.get('/auth/users'),
                    api.get('/projects/all'),
                    api.get('/mentorship/requests')
                ]);
                setData({
                    users: usersRes.data,
                    projects: projectsRes.data,
                    mentorships: mentorshipRes.data
                });
            } catch (err) {
                console.error('Failed to fetch admin data', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

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
                            <div key={p._id} className="border border-white/10 rounded-lg p-6 hover:bg-white/5 cursor-pointer">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold text-cyan-400">{p.projectType}</h3>
                                    <span className="text-xs text-gray-500">{new Date(p.createdAt).toLocaleDateString()}</span>
                                </div>
                                <p className="text-white mb-2"><span className="text-gray-400">Client:</span> {p.name} ({p.email})</p>
                                <p className="text-gray-300 mb-4 line-clamp-2">{p.details}</p>
                                <div className="flex gap-2 text-xs">
                                    <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded">{p.budget}</span>
                                    <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded">{p.status}</span>
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
                                <h3 className="text-xl font-bold text-green-400 mb-2">{m.topic || 'Mentorship Session'}</h3> {/* Assuming topic field */}
                                <p className="text-white">Request from: {m.user?.fullName || 'User'}</p>
                                {/* Add more fields based on your schema */}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPanel;
