function Button({children, className, padding = "px-6 py-3", ...props }) {
  return (
    <button
      className={`${padding} rounded-lg font-medium transition hover:opacity-90 ${className}`} {...props}
    >
      {children}
    </button>
  );
}

export default Button;