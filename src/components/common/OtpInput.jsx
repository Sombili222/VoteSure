import { useRef } from "react";

function OtpInput({ length = 6, value, onChange }) {
  const inputsRef = useRef([]);

  function handleChange(e, index) {
    const val = e.target.value.replace(/[^0-9]/g, "");
    if (!val) return;
    const chars = value.split("");
    chars[index] = val[val.length - 1];
    const next = chars.join("").slice(0, length);
    onChange(next);
    if (index < length - 1) inputsRef.current[index + 1]?.focus();
  }

  function handleKeyDown(e, index) {
    if (e.key === "Backspace") {
      if (value[index]) {
        const chars = value.split("");
        chars[index] = "";
        onChange(chars.join(""));
      } else if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  }

  function handlePaste(e) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, length);
    onChange(pasted);
    inputsRef.current[Math.min(pasted.length, length - 1)]?.focus();
  }

  return (
    <div className="flex gap-3 justify-center" onPaste={handlePaste}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => (inputsRef.current[i] = el)}
          value={value[i] || ""}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          maxLength={1}
          inputMode="numeric"
          className="w-12 h-14 text-center text-xl font-bold rounded-xl border border-slate-200 dark:border-slate-700 focus:border-indigo-500 outline-none text-slate-900 dark:text-white dark:bg-slate-800"
        />
      ))}
    </div>
  );
}

export default OtpInput;