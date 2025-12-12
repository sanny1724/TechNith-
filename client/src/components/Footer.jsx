import { Link } from 'react-router-dom';
import { FaYoutube, FaInstagram, FaGithub } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-[#050510] border-t border-gray-800 pt-16 pb-8 mt-20 font-inter">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600 mb-4">TECHNITH</h2>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Empowering the next generation of developers and creators with mentorship, projects, and guidance.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold mb-4">Platform</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="/mentorship" className="hover:text-cyan-400 transition">Mentorship</a></li>
                            <li><a href="/creator-guide" className="hover:text-cyan-400 transition">Creator Guide</a></li>
                            <li><a href="/projects" className="hover:text-cyan-400 transition">Start Project</a></li>
                            <li><a href="/blogs" className="hover:text-cyan-400 transition">Tech Blogs</a></li>
                            <li><a href="/admin-login" className="hover:text-gray-600 transition">Admin Login</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-bold mb-4">Contact</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="mailto:technith1724@gmail.com" className="hover:text-cyan-400 transition">technith1724@gmail.com</a></li>
                            <li>Hyderabad, India</li>
                        </ul>
                    </div>

                    {/* Socials */}
                    <div>
                        <h3 className="text-white font-bold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="https://www.youtube.com/@SannithReddyBanappagari" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-3 rounded-full text-gray-400 hover:text-white hover:bg-red-600 transition"><FaYoutube size={20} /></a>
                            <a href="https://www.instagram.com/technnith/" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-3 rounded-full text-gray-400 hover:text-white hover:bg-pink-600 transition"><FaInstagram size={20} /></a>
                            <a href="https://github.com/sanny1724" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-3 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition"><FaGithub size={20} /></a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
                    <p>© 2025 TECHNITH. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link to="/privacy" className="hover:text-cyan-400 transition">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-cyan-400 transition">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
