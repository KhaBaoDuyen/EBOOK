import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import React from "react";

type ButtonProps = {
  text: string;
  href?: string;
  icon?: IconDefinition;
  iconPosition?: "left" | "right" | "none";
  onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  className?: string;
};

export default function Button({
  text = "Click me",
  href,
  icon,
  iconPosition = "none",
  onClick,
  className = "",
}: ButtonProps) {
const baseClasses =
  "button-primary flex items-center justify-center gap-2 px-4 py-2 rounded-3xl " +
  "bg-emerald-600 text-white hover:bg-emerald-700";

  const classes = `${baseClasses} ${className}`;

  if (href) {
    return (
      <a href={href} onClick={onClick} className={classes}>
        {icon && iconPosition === "left" && (
          <FontAwesomeIcon icon={icon} className="w-4 h-4" />
        )}
        <span className="min-w-max">{text}</span>
        {icon && iconPosition === "right" && (
          <FontAwesomeIcon icon={icon} className="w-4 h-4" />
        )}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {icon && iconPosition === "left" && (
        <FontAwesomeIcon icon={icon} className="w-4 h-4" />
      )}
      <span className=" text-center">{text}</span>
      {icon && iconPosition === "right" && (
        <FontAwesomeIcon icon={icon} className="w-4 h-4" />
      )}
    </button>
  );
}
