import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
    return (
        <div className="bg-[#050510] min-h-screen text-white pt-24 pb-12 font-inter px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto"
            >
                <h1 className="text-4xl font-bold mb-8 text-cyan-400">Privacy Policy</h1>
                <p className="text-gray-400 mb-8">Last Updated: October 2025</p>

                <div className="space-y-8 text-gray-300">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
                        <p>We collect information you provide directly to us when you create an account, request mentorship, or submit a project inquiry.</p>
                        <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-400">
                            <li>Name, email address, and phone number.</li>
                            <li>Payment information (processed securely via Razorpay).</li>
                            <li>Project details and communication logs.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
                        <p>We use the information we collect to:</p>
                        <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-400">
                            <li>Provide, maintain, and improve our services.</li>
                            <li>Process transactions and send related information.</li>
                            <li>Send technical notices, updates, and support messages.</li>
                            <li>Respond to your comments and questions.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. Data Security</h2>
                        <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. We do not store credit card details on our servers.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Sharing of Information</h2>
                        <p>We do not share your personal information with third parties except as necessary to provide our services (e.g., payment processing) or as required by law.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">5. Contact Us</h2>
                        <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:technith1724@gmail.com" className="text-cyan-400 hover:underline">technith1724@gmail.com</a>.</p>
                    </section>
                </div>
            </motion.div>
        </div>
    );
};

export default PrivacyPolicy;
