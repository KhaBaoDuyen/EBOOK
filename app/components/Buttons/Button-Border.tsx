import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * @param {string} text - Nội dung nút
 * @param {string} href - Link khi click
 * @param {any} icon - Icon FontAwesome (ví dụ: faUser)
 * @param {"left" | "right" | "none"} iconPosition - Vị trí icon
 */
export default function ButtonBorder({
  text = "Click me",
  href = "#",
  icon = null,
  iconPosition = "none",
}) {
  return (
    <a
      href={href}
      className="font-bold flex items-center gap-2 px-4 py-2 rounded-3xl 
                 bg-white/30 backdrop-blur-md border border-white/40 
                 shadow-inner shadow-white/40 text-white 
                 hover:shadow-white/70 transition"
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
