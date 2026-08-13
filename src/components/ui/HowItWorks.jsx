import { motion } from "framer-motion";
import {
  FaClipboardList,
  FaUserCheck,
  FaVoteYea,
  FaChartPie,
} from "react-icons/fa";

const steps = [
  {
    id: 1,
    icon: FaClipboardList,
    title: "Create Election",
    description:
      "Set up candidates, positions, voting period and election rules in minutes.",
  },
  {
    id: 2,
    icon: FaUserCheck,
    title: "Verify Voters",
    description:
      "Invite voters and verify every participant before voting begins.",
  },
  {
    id: 3,
    icon: FaVoteYea,
    title: "Cast Votes",
    description:
      "Eligible voters securely cast their votes from any device.",
  },
  {
    id: 4,
    icon: FaChartPie,
    title: "Live Results",
    description:
      "Watch results update instantly with transparent counting.",
  },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center max-w-2xl mx-auto">

          <p className="text-blue-600 font-semibold uppercase tracking-widest">
            Process
          </p>

          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-3">
            Voting Made Simple
          </h2>

          <p className="text-slate-500 mt-5 leading-7">
            Four simple steps from election setup to transparent results.
          </p>

        </div>

        <div className="relative mt-20">

          <div className="hidden lg:block absolute top-10 left-0 w-full h-1 bg-slate-200 rounded-full"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">

            {steps.map((step) => {

              const Icon = step.icon;

              return (

                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: step.id * 0.15,
                  }}
                  className="relative bg-slate-50 rounded-3xl border border-slate-200 p-6 hover:-translate-y-2 hover:shadow-xl duration-300"
                >

                  <div className="absolute -top-5 left-6 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shadow-lg">

                    {step.id}

                  </div>

                  <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mt-6">

                    <Icon className="text-3xl text-blue-600" />

                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mt-6">

                    {step.title}

                  </h3>

                  <p className="text-slate-500 leading-7 mt-3">

                    {step.description}

                  </p>

                </motion.div>

              );

            })}

          </div>

        </div>

      </div>
            
    </section>
  );
}

export default HowItWorks;