import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Link } from "@remix-run/react";
import React from "react";

type ButtonProps = {
  text: string;
  href?: string;
  icon?: IconDefinition;
  iconPosition?: "left" | "right" | "none";
  onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  className?: string;
  type?: "button" | "submit" | "reset";
};

export default function Button({
  text = "Click me",
  href,
  icon,
  iconPosition = "none",
  onClick,
  className = "",
  type = "button",
}: ButtonProps) {
  const baseClasses =
    "button-primary flex items-center justify-center gap-2 px-4 py-2 rounded-3xl " +
    "bg-emerald-600 text-white hover:bg-emerald-700 transition-all duration-300";
  const classes = `${baseClasses} ${className}`;

   if (href) {
    return (
      <Link to={href} onClick={onClick} className={classes}>
        {icon && iconPosition === "left" && (
          <FontAwesomeIcon icon={icon} className="w-4 h-4" />
        )}
        <span className="min-w-max">{text}</span>
        {icon && iconPosition === "right" && (
          <FontAwesomeIcon icon={icon} className="w-4 h-4" />
        )}
      </Link>
    );
  }

   return (
    <button type={type} onClick={onClick} className={classes}>
      {icon && iconPosition === "left" && (
        <FontAwesomeIcon icon={icon} className="w-4 h-4" />
      )}
      <span className="text-center">{text}</span>
      {icon && iconPosition === "right" && (
        <FontAwesomeIcon icon={icon} className="w-4 h-4" />
      )}
    </button>
  );
}
