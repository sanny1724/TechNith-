import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { FaUser, FaEnvelope, FaPhone, FaCalendar, FaCamera, FaChalkboardTeacher, FaRocket } from 'react-icons/fa';
import api from '../api/axios';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const [activity, setActivity] = useState({ mentorships: [], projects: [] });

    useEffect(() => {
        if (user) {
            fetchUserActivity();
        }
    }, [user]);

    const fetchUserActivity = async () => {
        try {
            // We need endpoints that return *my* text data.
            // Assuming we'll implement these or they exist. 
            // If not, we might need to filter client side (not ideal but works for now if admin API returns all).
            // BETTER: Let's add /my-requests to endpoints. 
            // For now, I'll attempt to fetch from a hypothetically created route or existing one.
            const [mentorshipRes, projectRes] = await Promise.all([
                api.get('/mentorship/my-requests'),
                api.get('/projects/my-projects')
            ]);
            setActivity({
                mentorships: mentorshipRes.data,
                projects: projectRes.data
            });
        } catch (error) {
            console.error("Failed to fetch activity", error);
        }
    };

    if (!user) return <div className="text-center pt-32">Loading...</div>;

    return (
        <div className="pt-24 pb-12 min-h-screen px-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-white">Dashboard</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Card */}
                    <div className="col-span-1 bg-tech-card p-6 rounded-xl border border-gray-700 text-center h-fit">
                        <div className="relative inline-block mb-4">
                            {user.avatar ?
                                <img src={user.avatar} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-tech-primary" /> :
                                <div className="w-32 h-32 rounded-full bg-gray-700 mx-auto flex items-center justify-center border-4 border-gray-600">
                                    <FaUser size={48} className="text-gray-400" />
                                </div>
                            }
                            <button className="absolute bottom-0 right-0 bg-tech-primary p-2 rounded-full text-white hover:bg-blue-600 transition">
                                <FaCamera size={16} />
                            </button>
                        </div>
                        <h2 className="text-2xl font-bold text-white">{user.fullName}</h2>
                        <p className="text-gray-400">{user.email}</p>

                        <button onClick={logout} className="mt-6 w-full py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500/10 transition">
                            Logout
                        </button>
                    </div>

                    {/* Details & Activity */}
                    <div className="col-span-1 lg:col-span-2 space-y-8">
                        {/* Personal Info */}
                        <div className="bg-tech-card p-6 rounded-xl border border-gray-700">
                            <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">Personal Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center space-x-4">
                                    <div className="p-3 bg-gray-800 rounded-lg text-tech-accent"><FaUser /></div>
                                    <div>
                                        <p className="text-sm text-gray-400">Full Name</p>
                                        <p className="text-white font-medium">{user.fullName}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="p-3 bg-gray-800 rounded-lg text-tech-accent"><FaEnvelope /></div>
                                    <div>
                                        <p className="text-sm text-gray-400">Email Address</p>
                                        <p className="text-white font-medium">{user.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="p-3 bg-gray-800 rounded-lg text-tech-accent"><FaPhone /></div>
                                    <div>
                                        <p className="text-sm text-gray-400">Phone</p>
                                        <p className="text-white font-medium">{user.phone || 'Not provided'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity / Bookings */}
                        <div className="bg-tech-card p-6 rounded-xl border border-gray-700">
                            <h3 className="text-xl font-bold text-white mb-6 border-b border-gray-700 pb-2">My Activity</h3>

                            {/* Mentorships */}
                            <div className="mb-6">
                                <h4 className="text-lg font-semibold text-cyan-400 mb-3 flex items-center"><FaChalkboardTeacher className="mr-2" /> Mentorship Requests</h4>
                                {activity.mentorships.length === 0 ? (
                                    <p className="text-gray-500 text-sm">No active mentorship sessions.</p>
                                ) : (
                                    <div className="space-y-3">
                                        {activity.mentorships.map((m, idx) => (
                                            <div key={idx} className="bg-white/5 p-4 rounded-lg flex justify-between items-center border border-white/10">
                                                <div>
                                                    <p className="font-bold text-white">{m.sessionType}</p>
                                                    <p className="text-xs text-gray-400">{m.date} at {m.timeSlot}</p>
                                                </div>
                                                <span className={`px-2 py-1 rounded text-xs ${m.status === 'Approved' ? 'bg-green-500/20 text-green-400' :
                                                        m.status === 'Rejected' ? 'bg-red-500/20 text-red-400' :
                                                            'bg-yellow-500/20 text-yellow-400'
                                                    }`}>
                                                    {m.status}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Projects */}
                            <div>
                                <h4 className="text-lg font-semibold text-purple-400 mb-3 flex items-center"><FaRocket className="mr-2" /> Project Inquiries</h4>
                                {activity.projects.length === 0 ? (
                                    <p className="text-gray-500 text-sm">No project inquiries sent.</p>
                                ) : (
                                    <div className="space-y-3">
                                        {activity.projects.map((p, idx) => (
                                            <div key={idx} className="bg-white/5 p-4 rounded-lg flex justify-between items-center border border-white/10">
                                                <div>
                                                    <p className="font-bold text-white">{p.projectType}</p>
                                                    <p className="text-xs text-gray-400">{p.goal}</p>
                                                </div>
                                                <span className={`px-2 py-1 rounded text-xs ${p.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                                                        p.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' :
                                                            'bg-yellow-500/20 text-yellow-400'
                                                    }`}>
                                                    {p.status || 'Received'}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
