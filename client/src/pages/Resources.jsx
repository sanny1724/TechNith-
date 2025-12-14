import { motion } from 'framer-motion';
import { FaFilePdf, FaGithub, FaDownload, FaCode, FaVideo } from 'react-icons/fa';

const Resources = () => {
    const resources = [
        {
            category: "Cheatsheets",
            items: [
                {
                    title: "React.js Ultimate Cheatsheet",
                    description: "Hooks, Lifecycle methods, and common patterns in one PDF.",
                    icon: <FaFilePdf className="text-red-500" />,
                    link: "#",
                    type: "PDF"
                },
                {
                    title: "Git Commands Reference",
                    description: "Essential git commands you need every day.",
                    icon: <FaFilePdf className="text-orange-500" />,
                    link: "#",
                    type: "PDF"
                }
            ]
        },
        {
            category: "Starter Code",
            items: [
                {
                    title: "MERN Stack Boilerplate",
                    description: "Production-ready setup with Authentication, Tailwind, and MongoDB.",
                    icon: <FaGithub className="text-white" />,
                    link: "https://github.com/sanny1724", // Pointing to user github as placeholder
                    type: "Repo"
                },
                {
                    title: "Next.js Portfolio Template",
                    description: "A clean, dark-mode portfolio template for developers.",
                    icon: <FaCode className="text-blue-400" />,
                    link: "https://github.com/sanny1724",
                    type: "Repo"
                }
            ]
        },
        {
            category: "Learning Paths",
            items: [
                {
                    title: "Full Stack Roadmap 2025",
                    description: "Step-by-step guide to becoming a Full Stack Developer.",
                    icon: <FaVideo className="text-purple-500" />,
                    link: "https://www.youtube.com/@SannithReddyBanappagari", // Pointing to youtube
                    type: "Video"
                }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-[#050510] text-white font-inter pt-24 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Hero */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Free <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-500">Resources</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Curated tools, cheatsheets, and code snippets to help you build faster and better.
                    </p>
                </div>

                {/* Resources Grid */}
                <div className="grid gap-12">
                    {resources.map((category, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <h2 className="text-2xl font-bold mb-6 border-l-4 border-cyan-500 pl-4">{category.category}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {category.items.map((item, itemIdx) => (
                                    <div key={itemIdx} className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-cyan-500/50 hover:bg-white/10 transition group">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="text-3xl bg-black/50 p-3 rounded-xl">
                                                {item.icon}
                                            </div>
                                            <span className="text-xs font-mono bg-white/10 px-2 py-1 rounded text-gray-300">
                                                {item.type}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition">{item.title}</h3>
                                        <p className="text-gray-400 text-sm mb-6 min-h-[40px]">
                                            {item.description}
                                        </p>
                                        <a
                                            href={item.link}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-2 text-sm font-bold text-cyan-500 hover:text-cyan-400 transition"
                                        >
                                            <FaDownload /> Download / View
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Newsletter CTA */}
                <div className="mt-24 p-8 md:p-12 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded-3xl border border-cyan-500/20 text-center">
                    <h2 className="text-3xl font-bold mb-4">Want more resources?</h2>
                    <p className="text-gray-400 mb-8">Subscribe to get new cheatsheets and templates delivered to your inbox.</p>
                    <form className="max-w-md mx-auto flex gap-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 bg-black/50 border border-gray-600 rounded-full px-6 py-3 focus:outline-none focus:border-cyan-500"
                        />
                        <button className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-8 py-3 rounded-full transition">
                            Join
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Resources;
