import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaCode, FaUserTie, FaCheckCircle, FaLaptopCode, FaSpinner } from 'react-icons/fa';
import api from '../api/axios';

const Mentorship = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        sessionType: 'Career Guidance',
        duration: '30 Minutes',
        date: '',
        timeSlot: '10:00 AM - 11:00 AM',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePayment = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                // 1. Create Order
                const { data: order } = await api.post('/payment/create-order', { amount: 499 }); // ₹499 for session

                // 2. Fetch Key
                const { data: { key } } = await api.get('/payment/get-key');

                const options = {
                    key: key,
                    amount: order.amount,
                    currency: "INR",
                    name: "TECHNITH Mentorship",
                    description: `Booking: ${formData.sessionType}`,
                    image: "https://your-logo-url.com/logo.png", // Replace with your logo if you have one
                    order_id: order.id,
                    handler: async function (response) {
                        try {
                            // 3. Verify Payment
                            const verifyRes = await api.post('/payment/verify-payment', response);
                            if (verifyRes.data.message === "Payment verified successfully") {
                                resolve(true);
                            } else {
                                reject("Payment verification failed");
                            }
                        } catch (err) {
                            reject(err);
                        }
                    },
                    prefill: {
                        name: formData.name,
                        email: formData.email,
                        contact: "" // Can collect phone number if needed
                    },
                    config: {
                        display: {
                            blocks: {
                                banks: {
                                    name: 'Pay via UPI',
                                    instruments: [
                                        {
                                            method: 'upi'
                                        },
                                        {
                                            method: 'qr'
                                        }
                                    ],
                                },
                            },
                            sequence: ['block.banks'],
                            preferences: {
                                show_default_blocks: true,
                            },
                        },
                    },
                    theme: {
                        color: "#06b6d4"
                    }
                };

                const rzp1 = new window.Razorpay(options);
                rzp1.on('payment.failed', function (response) {
                    reject(response.error.description);
                });
                rzp1.open();

            } catch (err) {
                reject(err);
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Initiate Payment first
            await handlePayment();

            // Only if payment succeeds, save the request
            console.log('Payment successful, saving request...');
            await api.post('/mentorship/request', formData);

            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 5000);
            setFormData({
                name: '', email: '', sessionType: 'Career Guidance', duration: '30 Minutes', date: '', timeSlot: '10:00 AM - 11:00 AM', message: ''
            });

        } catch (err) {
            console.error('Process Error:', err);
            // Handle if it's a string from reject or object from axios
            const errMsg = typeof err === 'string' ? err : (err.response?.data?.message || err.message || 'Payment or Booking Failed');
            setError(`Failed: ${errMsg}`);
        } finally {
            setLoading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };
    // ... rest of the component variants (unchanged)

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    const sessionTypes = [
        {
            title: "Career Guidance",
            icon: <FaUserTie />,
            description: "Navigate your tech career path, resume reviews, and role roadmaps.",
            color: "text-blue-400",
            borderColor: "hover:border-blue-500/50"
        },
        {
            title: "Code Review & Debugging",
            icon: <FaCode />,
            description: "Get expert eyes on your code. Improve quality, security, and performance.",
            color: "text-green-400",
            borderColor: "hover:border-green-500/50"
        },
        {
            title: "Mock Interview",
            icon: <FaCheckCircle />,
            description: "Practice technical interviews with real-world scenarios and feedback.",
            color: "text-purple-400",
            borderColor: "hover:border-purple-500/50"
        },
        {
            title: "Project Architecture",
            icon: <FaLaptopCode />,
            description: "Planning a big project? Let's design a scalable and robust architecture.",
            color: "text-orange-400",
            borderColor: "hover:border-orange-500/50"
        }
    ];

    return (
        <div className="min-h-screen bg-[#050510] text-white py-20 px-6 relative overflow-hidden font-inter">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-center mb-16"
                >
                    <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-bold mb-6">
                        Level Up with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Mentorship</span>
                    </motion.h1>
                    <motion.p variants={itemVariants} className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Personalized sessions to accelerate your growth. Choose your path and book a slot.
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Column: Session Types Info */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-6"
                    >
                        <h2 className="text-2xl font-bold mb-6 border-l-4 border-cyan-500 pl-4">What We Offer</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {sessionTypes.map((type, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className={`bg-white/5 border border-gray-800 p-6 rounded-xl ${type.borderColor} transition duration-300 hover:bg-white/10`}
                                >
                                    <div className={`text-3xl ${type.color} mb-4`}>{type.icon}</div>
                                    <h3 className="text-lg font-bold mb-2">{type.title}</h3>
                                    <p className="text-gray-400 text-sm">{type.description}</p>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-8 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 p-6 rounded-xl border border-cyan-500/20">
                            <h3 className="flex items-center text-xl font-bold mb-4 text-cyan-300">
                                <FaClock className="mr-3" /> Why Mentorship?
                            </h3>
                            <ul className="space-y-3 text-gray-300">
                                <li className="flex items-start"><span className="text-cyan-500 mr-2">✓</span> Accelerate your learning curve significantly.</li>
                                <li className="flex items-start"><span className="text-cyan-500 mr-2">✓</span> Avoid common pitfalls and bad practices.</li>
                                <li className="flex items-start"><span className="text-cyan-500 mr-2">✓</span> Get industry insights not found in tutorials.</li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* Right Column: Booking Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="bg-black/50 backdrop-blur-md border border-gray-800 p-8 rounded-2xl shadow-2xl relative"
                    >
                        {submitted ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 rounded-2xl z-20 text-center p-8">
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-green-500 text-6xl mb-4">
                                    <FaCheckCircle />
                                </motion.div>
                                <h3 className="text-2xl font-bold text-white mb-2">Request Received!</h3>
                                <p className="text-gray-400">We'll get back to you shortly to confirm your slot.</p>
                            </div>
                        ) : null}

                        <h2 className="text-2xl font-bold mb-6">Book Your Session</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-gray-400 text-sm mb-2">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/5 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm mb-2">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/5 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">Session Type</label>
                                    <select
                                        name="sessionType"
                                        value={formData.sessionType}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition [&>option]:bg-gray-900"
                                    >
                                        {sessionTypes.map(t => <option key={t.title} value={t.title}>{t.title}</option>)}
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">Duration</label>
                                    <select
                                        name="duration"
                                        value={formData.duration}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition [&>option]:bg-gray-900"
                                    >
                                        <option value="30 Minutes">30 Minutes</option>
                                        <option value="60 Minutes">60 Minutes ($)</option>
                                        <option value="Custom">Custom</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">Preferred Date</label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-white/5 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition [&::-webkit-calendar-picker-indicator]:invert"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">Time Slot</label>
                                    <select
                                        name="timeSlot"
                                        value={formData.timeSlot}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition [&>option]:bg-gray-900"
                                    >
                                        <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                                        <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                                        <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM</option>
                                        <option value="04:00 PM - 05:00 PM">04:00 PM - 05:00 PM</option>
                                        <option value="07:00 PM - 08:00 PM">07:00 PM - 08:00 PM</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm mb-2">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full bg-white/5 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition resize-none"
                                    placeholder="Tell us what you want to achieve..."
                                ></textarea>
                            </div>
                            {error && <p className="text-red-400 text-sm">{error}</p>}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold py-4 rounded-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition transform hover:scale-[1.02] flex justify-center items-center"
                            >
                                {loading ? <FaSpinner className="animate-spin mr-2" /> : <FaCalendarAlt className="mr-2" />}
                                {loading ? 'Processing...' : 'Book & Pay ₹499'}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Mentorship;
