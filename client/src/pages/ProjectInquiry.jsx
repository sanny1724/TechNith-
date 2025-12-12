import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRocket, FaCode, FaMobileAlt, FaPaintBrush, FaCheck, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProjectInquiry = () => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        projectType: '',
        goal: '',
        designStatus: '',
        budget: '',
        timeline: '',
        name: '',
        email: '',
        details: ''
    });

    const updateData = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            // Reusing the mentorship endpoint structure or a new one? 
            // For now, let's assume we'll create a generic 'contact' or specific 'project' endpoint.
            // I'll stick to a new dedicated route for clarity: /api/project/inquiry
            await axios.post('http://localhost:5000/api/project/inquiry', formData);
            setSubmitted(true);
        } catch (error) {
            console.error(error);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const questions = [
        {
            step: 1,
            title: "What are we building?",
            field: "projectType",
            options: [
                { icon: <FaCode />, label: "Web Application", value: "Web App" },
                { icon: <FaMobileAlt />, label: "Mobile App", value: "Mobile App" },
                { icon: <FaPaintBrush />, label: "Portfolio / Landing Page", value: "Portfolio" },
                { icon: <FaRocket />, label: "SaaS Product", value: "SaaS" }
            ]
        },
        {
            step: 2,
            title: "What is your primary goal?",
            field: "goal",
            options: [
                { label: "Sell Products (E-commerce)", value: "E-commerce" },
                { label: "Showcase Work/Brand", value: "Branding" },
                { label: "Automate Business Processes", value: "Automation" },
                { label: "Build a Community", value: "Community" }
            ]
        },
        {
            step: 3,
            title: "Do you have a design ready?",
            field: "designStatus",
            options: [
                { label: "I have full designs (Figma/Sketch)", value: "Ready" },
                { label: "I have a rough idea/wireframe", value: "Wireframe" },
                { label: "I need you to design it from scratch", value: "Need Design" }
            ]
        },
    ];

    if (submitted) {
        return (
            <div className="min-h-screen bg-[#050510] text-white flex items-center justify-center p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-600/10 blur-[100px]"></div>
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-gray-900/80 p-8 rounded-2xl border border-cyan-500/30 text-center max-w-md backdrop-blur-xl relative z-10"
                >
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500 text-4xl">
                        <FaCheck />
                    </div>
                    <h2 className="text-3xl font-bold mb-4">Project Initiated!</h2>
                    <p className="text-gray-400 mb-8">
                        Thanks for reaching out! We've sent a confirmation to <strong>{formData.email}</strong>. Our team will review your brief and contact you shortly.
                    </p>
                    <Link to="/" className="inline-block bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-full transition">
                        Back to Home
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050510] text-white font-inter flex flex-col items-center justify-center p-6 relative">
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="w-full max-w-2xl relative z-10">
                {/* Progress Bar */}
                <div className="mb-12">
                    <div className="flex justify-between text-xs uppercase tracking-widest text-gray-500 mb-2">
                        <span>Start</span>
                        <span>Details</span>
                        <span>Finish</span>
                    </div>
                    <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-cyan-400 to-blue-600"
                            initial={{ width: 0 }}
                            animate={{ width: `${(step / 5) * 100}%` }}
                        />
                    </div>
                </div>

                <AnimatePresence mode='wait'>
                    {/* Render Steps */}
                    {questions.map((q) => (
                        step === q.step && (
                            <motion.div
                                key={q.step}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="bg-gray-900/50 border border-gray-800 p-8 rounded-3xl backdrop-blur-sm"
                            >
                                <h2 className="text-3xl font-bold mb-8 text-center">{q.title}</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {q.options.map((opt, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => { updateData(q.field, opt.value); nextStep(); }}
                                            className={`p-6 rounded-xl border flex flex-col items-center justify-center transition-all duration-300 group
                                                ${formData[q.field] === opt.value
                                                    ? 'bg-cyan-900/30 border-cyan-500 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)]'
                                                    : 'bg-black/40 border-gray-700 hover:border-gray-500 hover:bg-gray-800'
                                                }`}
                                        >
                                            {opt.icon && <span className="text-3xl mb-4 opacity-70 group-hover:opacity-100 transition">{opt.icon}</span>}
                                            <span className="font-semibold text-lg">{opt.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )
                    ))}

                    {/* Step 4: Contact Info */}
                    {step === 4 && (
                        <motion.div
                            key="contact"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-gray-900/50 border border-gray-800 p-8 rounded-3xl backdrop-blur-sm"
                        >
                            <h2 className="text-3xl font-bold mb-8 text-center">Where can we reach you?</h2>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">Your Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => updateData('name', e.target.value)}
                                        className="w-full bg-black/50 border border-gray-700 rounded-xl px-5 py-4 focus:border-cyan-500 focus:outline-none transition"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => updateData('email', e.target.value)}
                                        className="w-full bg-black/50 border border-gray-700 rounded-xl px-5 py-4 focus:border-cyan-500 focus:outline-none transition"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div className="flex justify-between pt-6">
                                    <button onClick={prevStep} className="flex items-center text-gray-500 hover:text-white transition px-6 py-3">
                                        <FaArrowLeft className="mr-2" /> Back
                                    </button>
                                    <button
                                        onClick={nextStep}
                                        disabled={!formData.name || !formData.email}
                                        className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold px-8 py-3 rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Next Step
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 5: Additional Details (Previously 6) */}
                    {step === 5 && (
                        <motion.div
                            key="details"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-gray-900/50 border border-gray-800 p-8 rounded-3xl backdrop-blur-sm"
                        >
                            <h2 className="text-3xl font-bold mb-6 text-center">Anything else?</h2>
                            <p className="text-gray-400 text-center mb-8">Briefly describe your vision or specific requirements.</p>

                            <textarea
                                value={formData.details}
                                onChange={(e) => updateData('details', e.target.value)}
                                className="w-full h-40 bg-black/50 border border-gray-700 rounded-xl px-5 py-4 focus:border-cyan-500 focus:outline-none transition mb-8 resize-none"
                                placeholder="I want a website that looks like..."
                            ></textarea>

                            <div className="flex justify-between">
                                <button onClick={prevStep} className="flex items-center text-gray-500 hover:text-white transition px-6 py-3">
                                    <FaArrowLeft className="mr-2" /> Back
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold px-10 py-4 rounded-xl hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition transform hover:scale-105 flex items-center"
                                >
                                    {loading ? 'Launching...' : <><span className="mr-2">Launch Project</span> <FaRocket /></>}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ProjectInquiry;
