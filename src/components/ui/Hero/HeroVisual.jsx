import BallotBox from "./BallotBox";
import FloatingCard from "./FloatingCard";
import { FaUsers, FaShieldAlt, FaCheckCircle } from "react-icons/fa";

function HeroVisual() {
  return (
    <div className="relative flex-1 flex items-center justify-center h-[480px] w-full">

      {/* Local glow — sits directly behind the glass box so backdrop-blur
          actually has something to distort */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-indigo-300/40 rounded-full blur-3xl" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-300/30 rounded-full blur-2xl" />

      <FloatingCard
        icon={FaUsers}
        title="Total Voters"
        value="4,289"
        trend="↑ 12.5%"
        position="top-4 left-0 lg:-left-4"
      />

      <FloatingCard
        icon={FaCheckCircle}
        title="Election Active"
        value="Live Now"
        badge
        position="top-0 right-0 lg:-right-6"
      />

      <BallotBox />

      <FloatingCard
        icon={FaShieldAlt}
        title="Security"
        value="98%"
        trend="Secure & Verified"
        position="bottom-4 right-0 lg:-right-2"
      />

    </div>
  );
}

export default HeroVisual;