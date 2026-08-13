import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Input({ label, icon: Icon, type = "text", error, id, ...props }) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (show ? "text" : "password") : type;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
      </label>
      <div
        className={`flex items-center rounded-xl border bg-white transition-colors
          ${error ? "border-red-300 focus-within:border-red-400" : "border-slate-200 focus-within:border-indigo-500"}
        `}
      >
        {Icon && (
          <span className="pl-3.5 text-slate-400">
            <Icon className="text-sm" />
          </span>
        )}
        <input
          id={id}
          type={inputType}
          className="w-full bg-transparent px-3.5 py-3 text-[15px] text-slate-900 placeholder:text-slate-400 outline-none"
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="pr-3.5 text-slate-400 hover:text-slate-600"
            tabIndex={-1}
          >
            {show ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
          </button>
        )}
      </div>
      {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
    </div>
  );
}

export default Input;