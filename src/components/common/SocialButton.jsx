function SocialButton({ icon: Icon, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-center gap-2.5 w-full border border-slate-200  rounded-xl py-3 text-sm font-medium   hover:bg-slate-50  hover:border-slate-300  transition-colors"
    >
      <Icon className="text-base" />
      {label}
    </button>
  );
}

export default SocialButton;