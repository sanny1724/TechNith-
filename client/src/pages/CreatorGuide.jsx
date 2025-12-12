import { Link } from 'react-router-dom';
import { FaYoutube, FaRocket, FaStar } from 'react-icons/fa';

const CreatorGuide = () => {
    return (
        <div className="min-h-screen bg-[#050510] pt-24 pb-12 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="text-center mb-16 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none"></div>
                    <div className="relative z-10">
                        <span className="inline-block py-1 px-3 rounded-full bg-red-500/20 text-red-400 text-sm font-semibold mb-4 border border-red-500/30">
                            NEW PROGRAM
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                            Zero to <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Hero</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
                            A complete roadmap to becoming a successful Content Creator. Learn recording, editing, SEO, and monetization.
                        </p>
                        <Link to="/mentorship" className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full shadow-[0_0_20px_rgba(220,38,38,0.4)] transition transform hover:scale-105">
                            Start Your Journey
                        </Link>
                    </div>
                </div>

                {/* Steps Section */}
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-red-500/50 transition duration-300">
                        <div className="w-14 h-14 bg-red-500/20 rounded-xl flex items-center justify-center text-red-500 text-2xl mb-6">
                            <FaYoutube />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">1. Channel Setup</h3>
                        <p className="text-gray-400">
                            Learn how to pick a niche, design channel art, and optimize your settings for maximum reach from Day 1.
                        </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-orange-500/50 transition duration-300">
                        <div className="w-14 h-14 bg-orange-500/20 rounded-xl flex items-center justify-center text-orange-500 text-2xl mb-6">
                            <FaRocket />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">2. Viral Strategy</h3>
                        <p className="text-gray-400">
                            Master the art of storytelling, click-worthy thumbnails, and high-retention editing techniques.
                        </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-yellow-500/50 transition duration-300">
                        <div className="w-14 h-14 bg-yellow-500/20 rounded-xl flex items-center justify-center text-yellow-500 text-2xl mb-6">
                            <FaStar />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">3. Monetization</h3>
                        <p className="text-gray-400">
                            Turn your views into income through AdSense, sponsorships, affiliate marketing, and your own products.
                        </p>
                    </div>
                </div>

                {/* Call to Action Container */}
                <div className="bg-gradient-to-r from-red-900/40 to-black border border-red-500/30 rounded-3xl p-12 text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold text-white mb-4">Ready to go live?</h2>
                        <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                            Join our community of aspiring creators. Get access to exclusive tools, templates, and weekly coaching calls.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Link to="/mentorship" className="bg-white text-red-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition">
                                Book Mentorship
                            </Link>
                            <button
                                onClick={() => alert("Coming Soon! Stay tuned for our free intro course.")}
                                className="bg-transparent border border-white text-white font-bold py-3 px-6 rounded-lg hover:bg-white/10 transition"
                            >
                                Watch Free Intro
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatorGuide;
