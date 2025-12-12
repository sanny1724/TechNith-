import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaKey } from 'react-icons/fa';
import api from '../api/axios';

const ForgotPassword = () => {
    const [step, setStep] = useState(1); // 1 = Email, 2 = Verify & Reset
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);

        try {
            await api.post('/auth/forgot-password', { email });
            setStep(2);
            setMessage(`OTP sent to ${email}`);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send OTP. Check email.');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);

        try {
            await api.post('/auth/reset-password', { email, otp, newPassword });
            alert('Password reset successful! You can now login.');
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to reset password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#050510] relative overflow-hidden py-10">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-[#050510]"></div>
            <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[100px]"></div>

            {/* Main Card */}
            <div className="relative w-full max-w-[500px] min-h-[500px] bg-black/80 backdrop-blur-md rounded-2xl shadow-[0_0_40px_rgba(168,85,247,0.3)] border border-purple-500/30 overflow-hidden flex flex-col p-8 z-10">

                <h2 className="text-3xl font-bold text-white mb-2 text-center">
                    {step === 1 ? 'Forgot Password?' : 'Reset Password'}
                </h2>
                <p className="text-gray-400 text-center mb-8">
                    {step === 1 ? 'Enter your email to receive a verification code.' : 'Enter the code and your new password.'}
                </p>

                {error && <div className="text-red-400 text-sm mb-4 bg-red-500/10 p-2 rounded border border-red-500/20 text-center">{error}</div>}
                {message && <div className="text-green-400 text-sm mb-4 bg-green-500/10 p-2 rounded border border-green-500/20 text-center">{message}</div>}

                {step === 1 ? (
                    <form onSubmit={handleSendOtp} className="space-y-6">
                        <div className="relative">
                            <FaEnvelope className="absolute left-0 top-3 text-gray-400" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full bg-transparent border-b border-gray-600 py-2 pl-8 text-white focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white font-bold py-3 rounded-full hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition duration-300 transform hover:scale-[1.02] disabled:opacity-70"
                        >
                            {loading ? 'Sending OTP...' : 'Send OTP'}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleResetPassword} className="space-y-6 animate-fadeIn">
                        <div className="relative">
                            <FaKey className="absolute left-0 top-3 text-purple-400" />
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Enter 6-digit OTP"
                                className="w-full bg-transparent border-b border-gray-600 py-2 pl-8 text-white focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-500 tracking-widest"
                                required
                            />
                        </div>
                        <div className="relative">
                            <FaLock className="absolute left-0 top-3 text-gray-400" />
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="New Password"
                                className="w-full bg-transparent border-b border-gray-600 py-2 pl-8 text-white focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white font-bold py-3 rounded-full hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition duration-300 transform hover:scale-[1.02] disabled:opacity-70"
                        >
                            {loading ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </form>
                )}

                <div className="mt-6 text-center">
                    <Link to="/login" className="text-gray-400 hover:text-white text-sm transition-colors">
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
