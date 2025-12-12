import { motion } from 'framer-motion';

const TermsOfService = () => {
    return (
        <div className="bg-[#050510] min-h-screen text-white pt-24 pb-12 font-inter px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto"
            >
                <h1 className="text-4xl font-bold mb-8 text-blue-500">Terms of Service</h1>
                <p className="text-gray-400 mb-8">Last Updated: October 2025</p>

                <div className="space-y-8 text-gray-300">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                        <p>By accessing or using the TECHNITH website and services, you agree to be bound by these Terms of Service. If you do not agree, strictly do not use our services.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Services Offered</h2>
                        <p>TECHNITH provides services including but not limited to:</p>
                        <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-400">
                            <li>1:1 Mentorship Sessions</li>
                            <li>Commercial Web & App Development</li>
                            <li>Educational Content & Guides</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. Payments and Refunds</h2>
                        <p>All payments are processed securely. Mentorship sessions are generally non-refundable unless cancelled by the mentor. Project payments are subject to the specific contract terms agreed upon.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. User Conduct</h2>
                        <p>You agree not to use the website for any unlawful purpose or in any way that interrupts, damages, or impairs the service. Harassment of mentors or staff will result in immediate termination of services.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">5. Intellectual Property</h2>
                        <p>All content included on this site, such as text, graphics, logos, and software, is the property of TECHNITH and protected by copyright laws.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">6. Limitation of Liability</h2>
                        <p>TECHNITH shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or use of, or inability to access or use, the services.</p>
                    </section>
                </div>
            </motion.div>
        </div>
    );
};

export default TermsOfService;
