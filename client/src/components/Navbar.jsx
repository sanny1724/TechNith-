import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed w-full z-50 top-0 left-0 px-6 py-4 bg-[#050510] border-b border-gray-800">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-tech-primary to-tech-accent">
                    TECHNITH
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-8 items-center text-gray-300">
                    <Link to="/" className="hover:text-tech-primary transition">Home</Link>
                    <Link to="/creator-guide" className="hover:text-red-500 transition font-semibold">Creator Guide</Link>
                    <Link to="/blogs" className="hover:text-tech-primary transition">Blogs</Link>
                    <Link to="/about" className="hover:text-tech-primary transition">About Me</Link>

                    {user ? (
                        <div className="relative group">
                            <button className="flex items-center space-x-2 hover:text-tech-primary">
                                {user.avatar ? <img src={user.avatar} alt="Avatar" className="w-8 h-8 rounded-full" /> : <FaUserCircle size={28} />}
                                <span>{user.fullName?.split(' ')[0]}</span>
                            </button>
                            <div className="absolute right-0 mt-2 w-48 bg-tech-card border border-gray-700 rounded-md shadow-lg hidden group-hover:block">
                                <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-700">Dashboard</Link>
                                <button onClick={logout} className="block w-full text-left px-4 py-2 hover:bg-gray-700 text-red-400">Logout</button>
                            </div>
                        </div>
                    ) : (
                        <Link to="/login" className="px-5 py-2 rounded-full bg-gradient-to-r from-tech-primary to-tech-accent text-white font-medium hover:opacity-90 transition">
                            Login
                        </Link>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-[#050510] border-b border-gray-800 p-4 flex flex-col space-y-4 shadow-xl">
                    <Link to="/" className="hover:text-tech-primary" onClick={() => setIsOpen(false)}>Home</Link>
                    <Link to="/about" className="hover:text-tech-primary" onClick={() => setIsOpen(false)}>About Me</Link>
                    {user ? (
                        <>
                            <Link to="/dashboard" className="hover:text-tech-primary" onClick={() => setIsOpen(false)}>Dashboard</Link>
                            <button onClick={() => { logout(); setIsOpen(false); }} className="text-left text-red-400">Logout</button>
                        </>
                    ) : (
                        <Link to="/login" className="px-5 py-2 rounded-full bg-tech-primary text-center text-white" onClick={() => setIsOpen(false)}>
                            Login
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
