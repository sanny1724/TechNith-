import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaYoutube, FaGithub, FaInstagram, FaArrowRight, FaCode, FaReact, FaNodeJs, FaPython, FaDatabase, FaLinkedin, FaUserCircle } from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiTailwindcss, SiMongodb } from 'react-icons/si';
import profileImg from '../assets/profile_new.png';

const Home = () => {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    const techStack = [
        { icon: <FaReact />, name: "React", color: "text-blue-400" },
        { icon: <FaNodeJs />, name: "Node.js", color: "text-green-500" },
        { icon: <SiJavascript />, name: "JavaScript", color: "text-yellow-400" },
        { icon: <SiTypescript />, name: "TypeScript", color: "text-blue-600" },
        { icon: <FaPython />, name: "Python", color: "text-yellow-300" },
        { icon: <SiTailwindcss />, name: "Tailwind", color: "text-cyan-400" },
        { icon: <SiMongodb />, name: "MongoDB", color: "text-green-400" },
        { icon: <FaDatabase />, name: "SQL", color: "text-gray-300" },
    ];

    const videos = [
        {
            id: 1,
            title: "My Experience at Telangana Global Summit 2024 | Meeting Swiggy Co-Founder!",
            description: "Full vlog on Telangana Global Summit 2047. Sharing my insights and experience.",
            views: "1.2K",
            time: "1 hour ago",
            thumbnail: "https://img.youtube.com/vi/f4o5N0bGphA/maxresdefault.jpg",
            link: "https://www.youtube.com/watch?v=f4o5N0bGphA"
        },
        {
            id: 2,
            title: "Run Java on VS Code in 2025 | Complete JDK Installation & Setup Tutorial",
            description: "Step-by-step guide to setting up Java development environment in VS Code for 2025.",
            views: "3.5K",
            time: "1 day ago",
            thumbnail: "https://img.youtube.com/vi/kJe5bK6g9pg/maxresdefault.jpg",
            link: "https://www.youtube.com/watch?v=kJe5bK6g9pg"
        },
        {
            id: 3,
            title: "The Fastest Way to Build Websites in 2025! Google Antigravity Creates...",
            description: "Exploring Gemini 3 Pro and Google Antigravity as a Cursor Killer? Let's find out.",
            views: "5.1K",
            time: "7 days ago",
            thumbnail: "https://img.youtube.com/vi/IjJiuegSGnQ/maxresdefault.jpg",
            link: "https://www.youtube.com/watch?v=IjJiuegSGnQ"
        }
    ];

    return (
        <div className="bg-[#050510] min-h-screen text-white overflow-hidden font-inter relative">
            {/* Ambient Background Glows */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Hero Section */}
            <section className="relative py-20 md:py-0 md:min-h-screen flex items-center justify-center px-4 md:px-6 z-10 w-full overflow-hidden">
                <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Text Content */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-left w-full"
                    >
                        <motion.div variants={itemVariants} className="inline-block px-3 py-1 md:px-4 md:py-2 bg-cyan-900/20 border border-cyan-500/30 rounded-full text-cyan-400 text-xs md:text-sm font-semibold mb-4 md:mb-6">
                            🚀 Welcome to the Future of Tech
                        </motion.div>
                        <motion.div
                            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-4 md:mb-6 tracking-wider select-none"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: { opacity: 1 },
                                visible: {
                                    opacity: 1,
                                    transition: { staggerChildren: 0.15 }
                                }
                            }}
                        >
                            {"TECHNITH".split("").map((char, index) => (
                                <motion.span
                                    key={index}
                                    variants={{
                                        hidden: { opacity: 0, x: -50, filter: 'blur(10px)' },
                                        visible: {
                                            opacity: 1,
                                            x: 0,
                                            filter: 'blur(0px)',
                                            transition: { type: "spring", damping: 12, stiffness: 100 }
                                        }
                                    }}
                                    className="inline-block text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]"
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </motion.div>
                        <motion.p variants={itemVariants} className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 md:mb-8 max-w-lg leading-relaxed">
                            Join <span className="text-white font-bold">TECHNITH</span> to master modern web development,
                            AI integration, and build projects that standout.
                        </motion.p>

                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <a href="https://www.youtube.com/@SannithReddyBanappagari" target="_blank" className="flex items-center justify-center space-x-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-bold hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] transition transform hover:scale-105 w-full sm:w-auto text-sm md:text-base">
                                <FaYoutube size={20} />
                                <span>Subscribe</span>
                            </a>
                            <a href="https://github.com/sanny1724" target="_blank" className="flex items-center justify-center space-x-2 bg-white/5 border border-white/10 text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-bold hover:bg-white/10 transition backdrop-blur-md w-full sm:w-auto text-sm md:text-base">
                                <span>View Projects</span>
                                <FaGithub size={20} />
                            </a>
                        </motion.div>

                        {/* Social Proof */}
                        <motion.div variants={itemVariants} className="mt-8 md:mt-12 flex flex-wrap items-center gap-6 text-gray-400">
                            <div className="text-center">
                                <h3 className="text-xl md:text-2xl font-bold text-white">2K+</h3>
                                <p className="text-[10px] md:text-xs uppercase tracking-wider">Subscribers</p>
                            </div>
                            <div className="hidden sm:block h-8 w-[1px] bg-gray-700"></div>
                            <div className="text-center">
                                <h3 className="text-xl md:text-2xl font-bold text-white">500K+</h3>
                                <p className="text-[10px] md:text-xs uppercase tracking-wider">Views</p>
                            </div>
                            <div className="hidden sm:block h-8 w-[1px] bg-gray-700"></div>
                            <div className="text-center">
                                <h3 className="text-xl md:text-2xl font-bold text-white">100+</h3>
                                <p className="text-[10px] md:text-xs uppercase tracking-wider">Tutorials</p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Visual/Image Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="relative hidden lg:flex justify-center items-center"
                    >
                        {/* Animated Profile Glow */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="absolute w-[400px] h-[400px] rounded-full border border-cyan-500/30 border-dashed"
                        ></motion.div>
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="absolute w-[450px] h-[450px] rounded-full border border-blue-600/20 border-dotted"
                        ></motion.div>

                        {/* Profile Image Container */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="relative z-10 w-[300px] h-[300px] rounded-full p-2 bg-gradient-to-b from-cyan-400 to-blue-600"
                        >
                            <div className="w-full h-full rounded-full overflow-hidden bg-gray-900 border-4 border-black box-border relative">
                                {/* Placeholder Image - REPLACE SRC WITH YOUR PHOTO */}
                                <img
                                    src={profileImg}
                                    alt="Sannith Reddy"
                                    className="w-full h-full object-cover hover:scale-110 transition duration-500"
                                />
                            </div>
                        </motion.div>

                        {/* Floating Icons */}
                        <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute top-[0px] right-[50px] text-cyan-400 text-5xl drop-shadow-lg z-20 bg-black/50 rounded-full p-2 backdrop-blur-md border border-cyan-500/30">
                            <FaReact />
                        </motion.div>
                        <motion.div animate={{ y: [0, -30, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute bottom-[50px] left-[50px] text-green-500 text-5xl drop-shadow-lg z-20 bg-black/50 rounded-full p-2 backdrop-blur-md border border-green-500/30">
                            <FaNodeJs />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-24 px-6 relative z-10 bg-black/40 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Our <span className="text-cyan-400">Services</span></h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">Expert solutions tailored to your needs. From personal guidance to enterprise-grade applications.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Service 1: 1:1 Mentorship */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="bg-tech-card border border-gray-800 p-8 rounded-2xl hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] transition duration-300"
                        >
                            <div className="w-16 h-16 bg-cyan-900/30 rounded-full flex items-center justify-center mb-6 text-cyan-400">
                                <FaUserCircle size={32} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-white">1:1 Mentorship Sessions</h3>
                            <p className="text-gray-400 mb-6 leading-relaxed">
                                Get personalized guidance on your coding journey. whether you're stuck on a project, need career advice, or want to master a specific tech stack.
                            </p>
                            <Link to="/mentorship" className="inline-flex items-center text-cyan-400 font-semibold hover:text-white transition">
                                Book a Session <FaArrowRight className="ml-2" />
                            </Link>
                        </motion.div>

                        {/* Service 2: Commercial Web Development */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="bg-tech-card border border-gray-800 p-8 rounded-2xl hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition duration-300"
                        >
                            <div className="w-16 h-16 bg-blue-900/30 rounded-full flex items-center justify-center mb-6 text-blue-400">
                                <FaCode size={32} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-white">Commercial Web Development</h3>
                            <p className="text-gray-400 mb-6 leading-relaxed">
                                Need a stunning, high-performance website for your business? We build scalable, modern web applications that drive results.
                            </p>
                            <Link to="/start-project" className="inline-flex items-center text-blue-400 font-semibold hover:text-white transition">
                                Start a Project <FaArrowRight className="ml-2" />
                            </Link>
                        </motion.div>

                        {/* Service 3: Content Creator Guide */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="bg-tech-card border border-gray-800 p-8 rounded-2xl hover:border-red-500/50 hover:shadow-[0_0_30px_rgba(239,68,68,0.1)] transition duration-300 md:col-span-2 lg:col-span-1"
                        >
                            <div className="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center mb-6 text-red-400">
                                <FaYoutube size={32} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-white">Creator Guide</h3>
                            <p className="text-gray-400 mb-6 leading-relaxed">
                                Zero to Hero. Master the art of content creation, video editing, and YouTube growth with our proven roadmap.
                            </p>
                            <Link to="/creator-guide" className="inline-flex items-center text-red-500 font-semibold hover:text-white transition">
                                Start Journey <FaArrowRight className="ml-2" />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>




            <section className="py-10 bg-black/30 border-y border-gray-800 backdrop-blur-sm overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 mb-6">
                    <p className="text-center text-gray-500 text-sm tracking-[0.2em] uppercase">Technologies We Master</p>
                </div>
                <div className="flex space-x-12 animate-marquee whitespace-nowrap">
                    {/* Doubled for seamless loop */}
                    {[...techStack, ...techStack].map((tech, index) => (
                        <div key={index} className="flex items-center space-x-3 text-2xl font-bold bg-white/5 px-6 py-3 rounded-xl border border-white/5 hover:border-cyan-500/50 transition duration-300 cursor-pointer group">
                            <span className={`${tech.color} group-hover:scale-110 transition`}>{tech.icon}</span>
                            <span className="text-gray-300 group-hover:text-white">{tech.name}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Latest Videos */}
            <section id="videos" className="py-24 px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-4xl font-bold mb-2">Latest <span className="text-red-500">Uploads</span></h2>
                            <p className="text-gray-400">Watch the newest tutorials and tech breakdowns.</p>
                        </div>
                        <a href="https://www.youtube.com/@SannithReddyBanappagari/videos" target="_blank" className="hidden md:flex items-center text-cyan-400 hover:text-cyan-300 transition">
                            View All Videos <FaArrowRight className="ml-2" />
                        </a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {videos.map((video) => (
                            <motion.div
                                key={video.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: video.id * 0.1 }}
                                viewport={{ once: true }}
                                className="group bg-tech-card rounded-2xl overflow-hidden border border-gray-800 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition duration-300"
                            >
                                <a href="https://www.youtube.com/@SannithReddyBanappagari/videos" target="_blank" rel="noopener noreferrer" className="block h-full">
                                    <div className="relative h-48 bg-gray-800 overflow-hidden">
                                        {/* Thumbnail */}
                                        <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700 opacity-80 group-hover:opacity-100" />

                                        <div className="absolute inset-0 flex items-center justify-center group-hover:scale-105 transition duration-500">
                                            <div className="bg-red-600/90 text-white rounded-full p-4 shadow-lg backdrop-blur-sm group-hover:bg-red-600 transition">
                                                <FaYoutube className="text-2xl" />
                                            </div>
                                        </div>
                                        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">12:45</div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center space-x-2 text-xs text-cyan-400 mb-2">
                                            <span>Tech Showcase</span>
                                            <span>•</span>
                                            <span>{video.time}</span>
                                        </div>
                                        <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-cyan-300 transition">
                                            {video.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                            {video.description}
                                        </p>
                                        <div className="flex items-center text-gray-500 text-sm">
                                            <FaYoutube className="mr-2 text-red-500" />
                                            <span>{video.views} views</span>
                                        </div>
                                    </div>
                                </a>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-8 text-center md:hidden">
                        <a href="https://www.youtube.com/@SannithReddyBanappagari/videos" target="_blank" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition">
                            View All Videos <FaArrowRight className="ml-2" />
                        </a>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-24 px-6 relative z-10 bg-[#050510]">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold mb-16 text-center">What People <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Say</span></h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Srinath Silla",
                                role: "Content Creator",
                                quote: "The mentorship provided by Sannith was a game-changer. He helped me debug a complex React issue in minutes that I was stuck on for days!"
                            },
                            {
                                name: "Somesh Kejriwal",
                                role: "Career Guidance",
                                quote: "The 'Zero to Hero' guide is exactly what I needed. My channel grew from 100 to 1,000 subscribers in just a month after following the strategies."
                            },
                            {
                                name: "Nagesh",
                                role: "Startup Founder",
                                quote: "We hired TECHNITH to build our MVP. The code quality was top-notch, and the delivery was on time. Highly recommended for web development."
                            }
                        ].map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className="bg-white/5 border border-white/10 p-8 rounded-2xl relative hover:border-purple-500/50 transition duration-300"
                            >
                                <div className="absolute top-[-20px] left-8 text-6xl text-purple-600 opacity-50 font-serif">"</div>
                                <p className="text-gray-300 italic mb-8 relative z-10">
                                    {testimonial.quote}
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-white font-bold text-xl border border-purple-500/30">
                                        {testimonial.name[0]}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold">{testimonial.name}</h4>
                                        <p className="text-purple-400 text-sm">{testimonial.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 px-6 relative z-10 bg-black/40 backdrop-blur-sm">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold mb-12 text-center">Frequently Asked <span className="text-cyan-400">Questions</span></h2>
                    <div className="space-y-6">
                        {[
                            {
                                question: "How does the 1:1 Mentorship work?",
                                answer: "You book a slot based on your availability. We connect via Google Meet to discuss your specific goals, debug code, or plan your career roadmap."
                            },
                            {
                                question: "Can you help me build my startup idea?",
                                answer: "Absolutely! I specialize in taking ideas from zero to MVP. Check out the 'Commercial Web Development' service to get started."
                            },
                            {
                                question: "Is the Creator Guide suitable for beginners?",
                                answer: "Yes, the 'Zero to Hero' program is designed for complete beginners. We cover everything from setting up your channel to advanced editing and monetization."
                            },
                            {
                                question: "Do you offer refunds for mentorship sessions?",
                                answer: "If you are not satisfied with the session or if we cannot reschedule, we offer a full refund within 24 hours of the scheduled time."
                            }
                        ].map((faq, index) => (
                            <details key={index} className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden cursor-pointer transition duration-300 open:bg-white/10 open:border-cyan-500/50">
                                <summary className="flex justify-between items-center p-6 text-lg font-medium select-none group-hover:text-cyan-400 transition">
                                    {faq.question}
                                    <span className="transform transition-transform group-open:rotate-180 text-cyan-500">
                                        ▼
                                    </span>
                                </summary>
                                <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5 group-open:border-cyan-500/20">
                                    {faq.answer}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter / CTA */}
            <section className="py-24 px-6 relative z-10">
                <div className="max-w-4xl mx-auto relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-3xl blur-2xl opacity-20"></div>
                    <div className="relative bg-[#0b1120] border border-gray-700 rounded-3xl p-12 text-center shadow-2xl overflow-hidden">
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>

                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Community</span></h2>
                        <p className="text-gray-400 mb-10 max-w-lg mx-auto text-lg">
                            Get exclusive access to source codes, tech tips, and behind-the-scenes content delivered to your inbox.
                        </p>

                        <form className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 bg-black/50 border border-gray-600 rounded-full px-6 py-4 text-white focus:outline-none focus:border-cyan-400 transition"
                            />
                            <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold px-8 py-4 rounded-full hover:shadow-lg hover:brightness-110 transition transform active:scale-95">
                                Join Now
                            </button>
                        </form>

                        <div className="mt-10 flex justify-center space-x-8 text-gray-400">
                            <a href="https://github.com/sanny1724" target="_blank" rel="noopener noreferrer" className="hover:text-white transition"><FaGithub size={24} /></a>
                            <a href="https://www.instagram.com/technnith/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition"><FaInstagram size={24} /></a>
                            <a href="https://www.linkedin.com/in/sannithreddy17/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition"><FaLinkedin size={24} /></a>
                        </div>
                    </div>
                </div>
            </section>
        </div >
    );
};

export default Home;
