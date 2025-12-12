import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaCalendar, FaLock, FaKey, FaArrowRight } from 'react-icons/fa';
import api from '../api/axios';


const Signup = () => {
    const [formData, setFormData] = useState({
        fullName: '',

        email: '',
        phone: '',
        password: ''
    });


    const { register } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await register({ ...formData });
            navigate('/');
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Signup failed');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-[#050510] relative overflow-hidden py-10">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-[#050510]"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[100px]"></div>

            {/* Main Card */}
            <div className="relative w-full max-w-[1000px] min-h-[600px] bg-black/80 backdrop-blur-md rounded-2xl shadow-[0_0_40px_rgba(6,182,212,0.3)] border border-cyan-500/30 overflow-hidden flex flex-row-reverse">

                {/* Visual Side */}
                <div className="absolute inset-0 w-full h-full pointer-events-none">
                    <div className="absolute top-0 left-0 w-[40%] h-full bg-gradient-to-br from-cyan-600/80 via-cyan-900/50 to-transparent transform skew-x-[12deg] origin-top translate-x-[-20%]"></div>
                </div>

                <div className="relative w-[40%] h-full flex flex-col justify-center items-start px-12 z-10 text-left hidden md:flex">
                    <h1 className="text-5xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 to-white neon-text">
                        JOIN THE<br />FUTURE
                    </h1>
                    <p className="text-cyan-100/80 mt-4 text-lg">
                        Create your account and start <br /> monitoring seamlessly.
                    </p>
                </div>

                {/* Form Side */}
                <div className="relative w-full md:w-[60%] h-full flex flex-col justify-center px-8 md:px-12 z-10 py-8">
                    <h2 className="text-4xl font-bold text-white mb-8 tracking-wider text-center md:text-left">
                        Sign Up
                    </h2>

                    {error && <div className="text-red-400 text-sm mb-4 bg-red-500/10 p-2 rounded border border-red-500/20">{error}</div>}

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">


                        <div className="relative">
                            <FaUser className="absolute left-0 top-3 text-gray-400" />
                            <input
                                name="fullName"
                                onChange={handleChange}
                                type="text"
                                placeholder="Full Name"
                                className="w-full bg-transparent border-b border-gray-600 py-2 pl-8 text-white focus:outline-none focus:border-cyan-400 transition-colors placeholder-gray-500"
                                required
                            />

                        </div>
                        <div className="space-y-5"> {/* Wrapper for spacing */}
                            <div className="relative">
                                <FaEnvelope className="absolute left-0 top-3 text-gray-400" />
                                <input
                                    name="email"
                                    type="email"
                                    onChange={handleChange}
                                    placeholder="Email Address"
                                    className="w-full bg-transparent border-b border-gray-600 py-2 pl-8 text-white focus:outline-none focus:border-cyan-400 transition-colors placeholder-gray-500"
                                    required
                                />
                            </div>
                            <div className="relative">
                                <FaPhone className="absolute left-0 top-3 text-gray-400" />
                                <input
                                    name="phone"
                                    type="tel"
                                    onChange={handleChange}
                                    placeholder="Mobile Number (e.g., +919000000000)"
                                    className="w-full bg-transparent border-b border-gray-600 py-2 pl-8 text-white focus:outline-none focus:border-cyan-400 transition-colors placeholder-gray-500"
                                    required
                                />
                            </div>

                        </div>
                        {/* Removed DOB */}
                        <div className="relative">
                            <FaLock className="absolute left-0 top-3 text-gray-400" />
                            <input
                                name="password"
                                type="password"
                                onChange={handleChange}
                                placeholder="Password"
                                className="w-full bg-transparent border-b border-gray-600 py-2 pl-8 text-white focus:outline-none focus:border-cyan-400 transition-colors placeholder-gray-500"
                                required
                            />
                        </div>

                        <div className="mt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-cyan-500 to-cyan-700 text-white font-bold py-3 rounded-full hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition duration-300 transform hover:scale-[1.02] flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Processing...' : 'Sign Up'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-400 text-sm">
                            Already have an account? <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-semibold ml-1">Login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Signup;
