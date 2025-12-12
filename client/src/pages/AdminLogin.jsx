import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { FaShieldAlt, FaLock } from 'react-icons/fa';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleAdminLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const data = await login(email, password);
            if (data.user.role === 'admin') {
                navigate('/admin');
            } else {
                setError('Access Denied: You are not an administrator.');
            }
        } catch (err) {
            setError('Access Denied: Invalid Credentials');
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center font-mono relative overflow-hidden">
            {/* Matrix-like background effect placeholder */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(32, 255, 77, .3) 25%, rgba(32, 255, 77, .3) 26%, transparent 27%, transparent 74%, rgba(32, 255, 77, .3) 75%, rgba(32, 255, 77, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(32, 255, 77, .3) 25%, rgba(32, 255, 77, .3) 26%, transparent 27%, transparent 74%, rgba(32, 255, 77, .3) 75%, rgba(32, 255, 77, .3) 76%, transparent 77%, transparent)', backgroundSize: '50px 50px' }}>
            </div>

            <div className="w-full max-w-md bg-black border-2 border-green-500 p-8 shadow-[0_0_20px_rgba(34,197,94,0.4)] relative z-10">
                <div className="text-center mb-8">
                    <FaShieldAlt className="text-green-500 text-5xl mx-auto mb-4 animate-pulse" />
                    <h1 className="text-3xl font-bold text-green-500 tracking-widest uppercase">Admin Console</h1>
                    <p className="text-green-700 text-xs mt-2">RESTRICTED ACCESS // LEVEL 5 SECURITY</p>
                </div>

                {error && (
                    <div className="bg-red-900/30 border border-red-500 text-red-500 p-3 mb-6 text-sm text-center font-bold">
                        [ERROR]: {error}
                    </div>
                )}

                <form onSubmit={handleAdminLogin} className="space-y-6">
                    <div>
                        <label className="block text-green-600 text-xs uppercase mb-1">Administrator ID</label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-gray-900 border border-green-700 text-green-400 p-3 focus:outline-none focus:border-green-400 focus:shadow-[0_0_10px_rgba(34,197,94,0.3)] transition-all"
                            placeholder="admin@tehnith.com"
                        />
                    </div>
                    <div>
                        <label className="block text-green-600 text-xs uppercase mb-1">Passkey</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-gray-900 border border-green-700 text-green-400 p-3 focus:outline-none focus:border-green-400 focus:shadow-[0_0_10px_rgba(34,197,94,0.3)] transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    <button className="w-full bg-green-600 hover:bg-green-500 text-black font-bold py-3 uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_15px_rgba(34,197,94,0.6)]">
                        Authenticate
                    </button>

                    <div className="text-center mt-4">
                        <span className="text-green-800 text-xs cursor-not-allowed hover:text-green-600">Forgot Credentials? Contact System Administrator</span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
