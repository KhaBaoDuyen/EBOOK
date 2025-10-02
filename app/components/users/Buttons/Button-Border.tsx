import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ButtonBorderProps {
  text?: string;
  href?: string;
  icon?: any;
  iconPosition?: "left" | "right" | "none";
  onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
}

export default function ButtonBorder({
  text = "Click me",
  href,
  icon = null,
  iconPosition = "none",
  onClick,
}: ButtonBorderProps) {
   const classes =
    "font-bold flex items-center gap-2 px-4 py-2 rounded-3xl " +
    "bg-white/30 backdrop-blur-md border border-white/40 " +
    "shadow-inner shadow-white/40 text-white " +
    "hover:shadow-white/70 transition";

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
      <span className="min-w-max">{text}</span>
      {icon && iconPosition === "right" && (
        <FontAwesomeIcon icon={icon} className="w-4 h-4" />
      )}
    </button>
  );
}
