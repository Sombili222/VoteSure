import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "../common/Reveal";
import DashboardCard from "./DashboardCard";

gsap.registerPlugin(ScrollTrigger);

function DashboardPreview() {
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { y: 80, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: cardRef.current, start: "top 85%" },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="dashboard" className="py-24 bg-slate-100">
      <div className="max-w-7xl mx-auto px-6">

        <Reveal className="text-center max-w-2xl mx-auto">
          <p className="text-blue-600 font-semibold uppercase tracking-widest text-sm">
            Dashboard Preview
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-3">
            Everything You Need In One Dashboard
          </h2>
          <p className="text-slate-500 mt-5 leading-7">
            Monitor elections, track participation and view live results from one beautiful dashboard.
          </p>
        </Reveal>

        <div ref={cardRef} className="mt-16">
          <DashboardCard />
        </div>

      </div>
    </section>
  );
}

export default DashboardPreview;