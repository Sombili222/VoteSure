import Reveal from "../common/Reveal";
import PricingCard from "./PricingCard";

const tiers = [
  {
    name: "Starter",
    price: "Free",
    period: null,
    description: "For small clubs and student unions running a single election.",
    features: ["Up to 200 voters", "1 active election", "Real-time results", "Email support"],
    ctaLabel: "Get Started",
  },
  {
    name: "Professional",
    price: "$79",
    period: "election",
    description: "For associations and cooperatives that need verified voter rolls.",
    features: [
      "Up to 10,000 voters",
      "Unlimited elections",
      "Voter verification",
      "Audit trail export",
      "Priority support",
    ],
    popular: true,
    ctaLabel: "Start Free Trial",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: null,
    description: "For national bodies and institutions with compliance requirements.",
    features: [
      "Unlimited voters",
      "Dedicated infrastructure",
      "Custom integrations",
      "SLA & compliance support",
      "Dedicated account manager",
    ],
    ctaLabel: "Contact Sales",
  },
];

function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        <Reveal className="text-center max-w-2xl mx-auto">
          <p className="text-blue-600 font-semibold uppercase tracking-widest text-sm">
            Pricing
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-3">
            Simple pricing, no surprises
          </h2>
          <p className="text-slate-500 mt-5 leading-7">
            Pay per election or scale up — cancel anytime.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mt-16 items-center">
          {tiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.1}>
              <PricingCard {...tier} />
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Pricing;