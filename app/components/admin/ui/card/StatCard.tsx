import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;           
  value: number | string;     
  label: string;            
  color?: string;         
}

export default function StatCard({
  icon: Icon,
  value,
  label,
  color = "#15B088",
}: StatCardProps) {
  return (
    <div className="rounded-xl flex justify-center gap-10 items-center border border-white/10 bg-white shadow-xl  dark:bg-[#0f1a1f] p-6">
      <Icon className="transition-all flex-[0.3]" color={color} size={50} />
      <span className="flex-[0.7]">
        <h1 className="text-5xl font-bold text-[var(--primary-hover)]">{value}</h1>
        <p className="dark:text-white/70 text-gray-600 text-sm">{label}</p>
      </span>
    </div>
  );
}
