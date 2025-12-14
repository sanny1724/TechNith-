import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import api from '../api/axios';
import { FaUser, FaLock } from 'react-icons/fa';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState('login'); // login, otp-sent, verify
    const { login, loginWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (!password) {
                // Assume passwordless
                await api.post('/auth/login-otp', { email });
                setStep('otp-sent');
            } else {
                await login(email, password);
                navigate('/');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/verify-otp', { email, otp });
            localStorage.setItem('token', res.data.token);
            window.location.href = '/dashboard';
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid OTP');
        }
    };

    const googleSuccess = async (credentialResponse) => {
        try {
            await loginWithGoogle(credentialResponse.credential);
            navigate('/');
        } catch (err) {
            console.error(err);
            const detailed = err.response?.data?.error;
            const msg = err.response?.data?.message;
            setError(detailed || msg || err.message || 'Server Login Failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#050510] relative overflow-hidden">
            {/* Background elements for atmosphere */}
            <div className="absolute top-0 left-0 w-full h-full bg-[#050510]"></div>
            <div className="absolute top-[-50%] left-[-20%] w-[1000px] h-[1000px] bg-cyan-500/10 rounded-full blur-[100px]"></div>

            {/* Main Card */}
            <div className="relative w-full max-w-[900px] h-[550px] bg-black/80 backdrop-blur-md rounded-2xl shadow-[0_0_40px_rgba(6,182,212,0.3)] border border-cyan-500/30 overflow-hidden flex">

                {/* Diagonal Split Background */}
                <div className="absolute inset-0 w-full h-full">
                    {/* The cyan gradient shape on the right */}
                    <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-bl from-cyan-600/80 via-cyan-900/50 to-transparent transform skew-x-[-12deg] origin-top translate-x-[20%]"></div>
                </div>

                {/* Left Side - Login Form */}
                <div className="relative w-1/2 h-full flex flex-col justify-center px-12 z-10">
                    <h2 className="text-4xl font-bold text-white mb-10 tracking-wider">Login</h2>

                    {error && <div className="text-red-400 text-sm mb-4 bg-red-500/10 p-2 rounded border border-red-500/20">{error}</div>}

                    {step === 'login' ? (
                        <form onSubmit={handleLogin} className="space-y-8">
                            <div className="relative">
                                <FaUser className="absolute left-0 top-3 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Username / Email"
                                    className="w-full bg-transparent border-b border-gray-600 py-2 pl-8 text-white focus:outline-none focus:border-cyan-400 transition-colors placeholder-gray-500"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="relative">
                                <FaLock className="absolute left-0 top-3 text-gray-400" />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="w-full bg-transparent border-b border-gray-600 py-2 pl-8 text-white focus:outline-none focus:border-cyan-400 transition-colors placeholder-gray-500"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="flex justify-end mt-2">
                                <Link to="/forgot-password" className="text-xs text-gray-400 hover:text-cyan-400 transition-colors">
                                    Forgot Password?
                                </Link>
                            </div>

                            <button className="w-full bg-gradient-to-r from-cyan-500 to-cyan-700 text-white font-bold py-3 rounded-full hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition duration-300 transform hover:scale-[1.02] mt-4">
                                Login
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleVerifyOtp} className="space-y-6">
                            <div className="relative">
                                <label className="block text-cyan-400 text-sm mb-2">OTP Sent to {email}</label>
                                <input
                                    type="text"
                                    placeholder="Enter OTP"
                                    className="w-full bg-transparent border-b border-gray-600 py-2 text-white text-center text-xl tracking-[0.5em] focus:outline-none focus:border-cyan-400 transition-colors"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                />
                            </div>
                            <button className="w-full bg-green-500 text-white font-bold py-3 rounded-full hover:bg-green-600 transition duration-300">
                                Verify OTP
                            </button>
                        </form>
                    )}

                    <div className="mt-8 text-center">
                        <p className="text-gray-400 text-sm">
                            Don't have an account? <Link to="/signup" className="text-cyan-400 hover:text-cyan-300 font-semibold ml-1">Sign Up</Link>
                        </p>
                    </div>

                    <div className="mt-6 flex justify-center">
                        <GoogleLogin onSuccess={googleSuccess} onError={() => { console.error('Popup Failed'); setError('Google Popup Blocked (AdBlock?)'); }} theme="filled_black" shape="pill" size="medium" />
                    </div>
                </div>

                {/* Right Side - Decorative/Welcome */}
                <div className="relative w-1/2 h-full flex flex-col justify-center items-end px-12 z-10 text-right">
                    <h1 className="text-5xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-200 neon-text">
                        WELCOME
                        <br />
                        BACK!
                    </h1>
                </div>

                {/* Glow Border Effect (using pseudo element idea or just styling the main div) */}
                {/* The main div already has border and shadow styling */}
            </div>
        </div>
    );
};

export default Login;
