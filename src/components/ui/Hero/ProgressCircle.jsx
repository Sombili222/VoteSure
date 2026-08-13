import { motion } from "framer-motion";

function ProgressCircle({
  percentage,
  name = "",
  color = "#2563EB",
  size = 180,
  strokeWidth = 12,
  small = false,
}) {
  // Radius of the circle
  const radius = (size - strokeWidth) / 2;

  // Total length of the circle
  const circumference = 2 * Math.PI * radius;

  // Calculate how much of the circle should be visible
  const offset =
    circumference - (percentage / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
     whileHover={
        small
            ? {}
            : {
                y: -8,
                scale: 1.03,
                transition: {
                duration: 0.2,
                },
            }
        }
      className="relative flex items-center justify-center"
    >
      <svg
        width={size}
        height={size}
        className="-rotate-90"
      >
        {/* Background Circle */}

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
        />

        {/* Animated Progress */}

        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{
            strokeDashoffset: circumference,
          }}
          animate={{
            strokeDashoffset: offset,
          }}
          transition={{
            duration: 1.6,
            ease: "easeOut",
          }}
        />
      </svg>

      {/* Center Content */}

      <div className={` absolute rounded-full
    bg-white shadow-lg border border-gray-100
    flex flex-col items-center justify-center
    ${
      small
        ? "w-12 h-12"
        : "w-28 h-28"
    }
  `}
>

  {small ? (

    <h3
      className="font-bold"
      style={{
        color,
      }}
    >
      {percentage}%
    </h3>

  ) : (

    <>

      {name ? (
        <>
            <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg"
            style={{
                backgroundColor: color,
            }}
            >
            {name
                .split(" ")
                .map((word) => word[0])
                .join("")}
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mt-2">
            {percentage}%
            </h2>

            <p className="text-sm text-gray-500 text-center px-2">
            {name}
            </p>
        </>
        ) : (
        <>
            <h2 className="text-5xl font-black text-blue-600">
            {percentage}%
            </h2>

            <p className="text-sm text-slate-500 mt-2">
            Turnout
            </p>
        </>
        )}

    </>

  )}

      </div>
    </motion.div>
  );
}

export default ProgressCircle;