import { motion } from "framer-motion";
import Button from "../components/Button";

function Home() {
  return (
    <div>
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center justify-center text-center px-6 py-24"
      >
        <p className="text-blue-500 font-semibold mb-4">
          AI-Powered Interview Preparation
        </p>

        <h1 className="text-5xl md:text-7xl font-bold max-w-4xl leading-tight">
          Crack Your Next Interview With AI Coaching
        </h1>

        <p className="text-gray-400 text-lg mt-6 max-w-2xl">
          Practice real interview questions, get AI-generated
          feedback, improve confidence, and land your dream
          job faster.
        </p>

        <div className="flex gap-4 mt-10">
          <Button>
            Start Free
          </Button>

          <Button variant="secondary">
            Watch Demo
          </Button>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="px-6 pb-24"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

          <motion.div
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold mb-4">
              AI Feedback
            </h3>

            <p className="text-gray-400">
              Get intelligent feedback on communication,
              technical answers, confidence, and clarity.
            </p>
          </motion.div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-4">
              Mock Interviews
            </h3>

            <p className="text-gray-400">
              Practice realistic interview scenarios powered
              by AI-generated questions and workflows.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-4">
              Performance Analytics
            </h3>

            <p className="text-gray-400">
              Track your progress with detailed reports,
              scores, strengths, and improvement areas.
            </p>
          </div>

        </div>
      </motion.section>
    </div>
  );
}

export default Home;