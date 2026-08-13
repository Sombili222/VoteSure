import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaShieldAlt, FaArrowRight } from "react-icons/fa";
import Reveal from "../common/Reveal";
import Button from "../common/Button";

function CTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-600 to-blue-600 py-20">

      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">

        <Reveal>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/30 flex items-center justify-center mx-auto"
          >
            <FaShieldAlt className="text-white text-2xl" />
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-black text-white mt-8 leading-tight">
            Ready to run an election<br className="hidden md:block" /> people actually trust?
          </h2>

          <p className="text-indigo-100 mt-5 max-w-xl mx-auto leading-relaxed">
            Set up your first election free — no credit card, no commitment.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-9">
            <Link to="/register">
              <Button className="bg-white text-indigo-600 w-full sm:w-auto flex items-center justify-center gap-2 shadow-xl">
                Create Election <FaArrowRight className="text-sm" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button className="bg-transparent border border-white/40 text-white w-full sm:w-auto hover:bg-white/10">
                Talk to Sales
              </Button>
            </Link>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

export default CTA;