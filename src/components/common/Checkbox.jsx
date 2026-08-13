import { FaCheck } from "react-icons/fa";

function Checkbox({ checked, onChange, label, id }) {
  return (
    <label htmlFor={id} className="flex items-start gap-2.5 cursor-pointer select-none">

      <span className="relative w-[18px] h-[18px] mt-0.5 shrink-0">

        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer m-0"
        />

        <span
          className={`absolute inset-0 rounded-md border flex items-center justify-center transition-colors pointer-events-none
            ${checked ? "bg-indigo-600 border-indigo-600" : "border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"}`}
        >
          {checked && <FaCheck className="text-white text-[9px]" />}
        </span>

      </span>

      <span className="text-sm text-slate-600 dark:text-slate-400 leading-snug">{label}</span>

    </label>
  );
}

export default Checkbox;