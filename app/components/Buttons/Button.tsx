import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

type ButtonProps = {
  text: string;
  href?: string;
  icon?: IconDefinition;
  iconPosition?: "left" | "right" | "none";
};

export default function Button({
  text = "Click me",
  href = "#",
  icon,
  iconPosition = "none",
}: ButtonProps) {
  return (
    <a
      href={href}
      className="button-primary flex items-center gap-2 px-4 py-2 rounded-3xl bg-emerald-600 text-white hover:bg-emerald-700"
    >
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
