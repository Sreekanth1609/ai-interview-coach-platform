import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
};

function Button({
  children,
  variant = "primary",
}: ButtonProps) {
  const baseStyles =
    "px-6 py-3 rounded-xl font-semibold transition";

  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white",

    secondary:
      "border border-gray-700 hover:border-gray-500 text-white",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]}`}>
      {children}
    </button>
  );
}

export default Button;