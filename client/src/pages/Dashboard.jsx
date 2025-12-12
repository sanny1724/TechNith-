import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { FaUser, FaEnvelope, FaPhone, FaCalendar, FaCamera } from 'react-icons/fa';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);

    if (!user) return <div className="text-center pt-32">Loading...</div>;

    return (
        <div className="pt-24 pb-12 min-h-screen px-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-white">Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Profile Card */}
                    <div className="col-span-1 bg-tech-card p-6 rounded-xl border border-gray-700 text-center">
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

                    {/* Details & Settings */}
                    <div className="col-span-1 md:col-span-2 space-y-6">
                        <div className="bg-tech-card p-6 rounded-xl border border-gray-700">
                            <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">Personal Information</h3>
                            <div className="space-y-4">
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
                                <div className="flex items-center space-x-4">
                                    <div className="p-3 bg-gray-800 rounded-lg text-tech-accent"><FaCalendar /></div>
                                    <div>
                                        <p className="text-sm text-gray-400">Date of Birth</p>
                                        <p className="text-white font-medium">{user.dob ? new Date(user.dob).toLocaleDateString() : 'Not provided'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-tech-card p-6 rounded-xl border border-gray-700">
                            <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">Subscriptions</h3>
                            <p className="text-gray-400">You are subscribed to the <span className="text-white font-bold">Weekly Tech Newsletter</span>.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
