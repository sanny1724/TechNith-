import { motion } from 'framer-motion';
import { FaYoutube, FaGithub, FaInstagram, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

const About = () => {
    return (
        <div className="bg-[#050510] min-h-screen text-white pt-20 pb-12 overflow-hidden font-inter">
            <div className="max-w-7xl mx-auto px-6">

                {/* Hero / Introduction */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight">
                            Meet The <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 neon-text">CREATOR</span>
                        </h1>
                        <p className="text-xl text-gray-300 leading-relaxed mb-8">
                            Hello! I'm <span className="text-white font-bold">Sannith Reddy Banappagari</span>.
                            I'm a pre-final year B.Tech student in <span className="text-cyan-400">AI & Machine Learning</span> with a passion for building innovative, AI-driven solutions.
                        </p>
                        <p className="text-lg text-gray-400 leading-relaxed mb-10">
                            With a CGPA of <span className="text-white font-bold">9.8</span>, I bridge the gap between academic excellence and real-world application.
                            From being a <strong>Tech Lead Intern</strong> to an <strong>Amazon ML Summer School Trainee</strong> and a <strong className="text-yellow-400">1x Hackathon Winner</strong>,
                            I am constantly pushing the boundaries of what's possible with code.
                        </p>

                        <div className="flex space-x-6">
                            <a href="https://github.com/sanny1724" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition transform hover:scale-110"><FaGithub size={32} /></a>
                            <a href="https://www.linkedin.com/in/sannithreddy17/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition transform hover:scale-110"><FaLinkedin size={32} /></a>
                            <a href="https://www.youtube.com/@SannithReddyBanappagari" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition transform hover:scale-110"><FaYoutube size={32} /></a>
                            <a href="https://www.instagram.com/technnith/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition transform hover:scale-110"><FaInstagram size={32} /></a>
                            <a href="mailto:sravssunny15@gmail.com" className="text-gray-400 hover:text-white transition transform hover:scale-110"><FaEnvelope size={32} /></a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        {/* Image Placeholder logic: User can easily swap this URL */}
                        <div className="relative z-10 rounded-3xl overflow-hidden border-2 border-gray-800 shadow-[0_0_50px_rgba(6,182,212,0.15)] group">
                            <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition duration-500"></div>
                            <img
                                src="/sannith.jpg"
                                alt="Sannith Reddy"
                                className="w-full h-auto object-cover transform transition duration-700 group-hover:scale-105"
                            />
                        </div>
                        {/* Background Elements */}
                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
                        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
                    </motion.div>
                </div>

                {/* Experience / Timeline */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-24"
                >
                    <h2 className="text-3xl font-bold mb-12 text-center text-white"><span className="border-b-4 border-cyan-500 pb-2">My Journey</span></h2>

                    <div className="space-y-12 relative border-l-2 border-gray-800 ml-4 md:ml-0 md:pl-0">
                        {/* Item 1: Amazon ML */}
                        <div className="relative pl-8 md:pl-0 md:flex md:justify-between md:items-center group">
                            <div className="md:w-5/12 md:text-right md:pr-12">
                                <h3 className="text-2xl font-bold text-cyan-400 mb-2">Amazon ML Summer School</h3>
                                <p className="text-gray-400">Selected for Amazon's flagship ML program. Gained deep insights into core ML concepts and real-world algorithms.</p>
                            </div>
                            <div className="absolute left-[-9px] md:left-1/2 md:-ml-[9px] w-5 h-5 bg-gray-900 border-4 border-cyan-500 rounded-full group-hover:scale-125 transition duration-300"></div>
                            <div className="md:w-5/12 md:pl-12 mt-2 md:mt-0">
                                <span className="text-sm font-mono text-gray-500">2025</span>
                            </div>
                        </div>

                        {/* Item 2: Tech Lead Intern */}
                        <div className="relative pl-8 md:pl-0 md:flex md:flex-row-reverse md:justify-between md:items-center group">
                            <div className="md:w-5/12 md:pl-12">
                                <h3 className="text-2xl font-bold text-blue-400 mb-2">Tech Lead Intern</h3>
                                <p className="text-gray-400">Led AI initiatives at "Summer of AI" (Viswam.AI, IIITH). Worked on Python-based AI models and supervised learning.</p>
                            </div>
                            <div className="absolute left-[-9px] md:left-1/2 md:-ml-[9px] w-5 h-5 bg-gray-900 border-4 border-blue-500 rounded-full group-hover:scale-125 transition duration-300"></div>
                            <div className="md:w-5/12 md:text-right md:pr-12 mt-2 md:mt-0">
                                <span className="text-sm font-mono text-gray-500">2025</span>
                            </div>
                        </div>

                        {/* Item 3: EduEarn */}
                        <div className="relative pl-8 md:pl-0 md:flex md:justify-between md:items-center group">
                            <div className="md:w-5/12 md:text-right md:pr-12">
                                <h3 className="text-2xl font-bold text-green-400 mb-2">EduEarn Project</h3>
                                <p className="text-gray-400">Developed a gamified quiz app using Android Studio & Firebase. Implemented real-time multiplayer battles.</p>
                            </div>
                            <div className="absolute left-[-9px] md:left-1/2 md:-ml-[9px] w-5 h-5 bg-gray-900 border-4 border-green-500 rounded-full group-hover:scale-125 transition duration-300"></div>
                            <div className="md:w-5/12 md:pl-12 mt-2 md:mt-0">
                                <span className="text-sm font-mono text-gray-500">2024</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Skills Grid */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-3xl font-bold mb-12 text-center text-white">Technical <span className="text-cyan-400">Arsenal</span></h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {['Python', 'Java', 'Android Studio', 'Firebase', 'Machine Learning', 'React/Node.js', 'SQL', 'C Language'].map((skill, index) => (
                            <div key={index} className="bg-tech-card border border-gray-800 p-6 rounded-xl text-center hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)] transition duration-300">
                                <h4 className="font-bold text-lg text-gray-200">{skill}</h4>
                            </div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default About;
