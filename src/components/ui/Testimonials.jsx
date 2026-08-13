import Reveal from "../common/Reveal";
import TestimonialCard from "./TestimonialCard";

const testimonials = [
  {
    id: 1,
    quote:
      "We ran our national alumni election on VoteSure with 12,000 voters and had zero disputes about the count for the first time in a decade.",
    name: "Ifeoma Adeyemi",
    role: "Electoral Committee Chair",
    org: "Nigerian Alumni Association",
  },
  {
    id: 2,
    quote:
      "The live results dashboard alone justified switching. Our board could watch the count happen instead of waiting three days for a manual tally.",
    name: "Tunde Bakare",
    role: "Operations Director",
    org: "Lagos Cooperative Union",
  },
  {
    id: 3,
    quote:
      "Setup took less than an hour and the voter verification caught two duplicate registrations we would have missed manually.",
    name: "Grace Michael",
    role: "Registrar",
    org: "St. Peter's Student Union",
  },
];

function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <Reveal className="text-center max-w-2xl mx-auto">
          <p className="text-blue-600 font-semibold uppercase tracking-widest text-sm">
            Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-3">
            Trusted by election committees everywhere
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {testimonials.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.15}>
              <TestimonialCard {...t} />
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Testimonials;