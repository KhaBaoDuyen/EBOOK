import { Link, useLocation } from "@remix-run/react";

type UserContext = {
    user: {
        id: string;
        name: string;
        email: string;
        role: string;
    } | null;
};
import {
    User,
    Heart,
    Book,
    BookOpen,
    CheckCircle,
    Trophy,
    Settings,
    LogOut,
} from "lucide-react";
import { useUser } from "~/context/UserContext";
import { UserRankText } from "~/components/users/UserRank";

const icons = {
    user: User,
    heart: Heart,
    book: Book,
    "book-open": BookOpen,
    "check-circle": CheckCircle,
    trophy: Trophy,
    settings: Settings,
    "log-out": LogOut,
};

export const sider = [
    { title: "Thông tin cá nhân", slug: "thong-tin-ca-nhan", icon: "user" },
    { title: "Sách yêu thích", slug: "sach-yeu-thich", icon: "heart" },
    { title: "Thư viện của tôi", slug: "thu-vien-cua-toi", icon: "book" },
    { title: "Thành tích & Huy hiệu", slug: "thanh-tich", icon: "trophy" },
    { title: "Cài đặt tài khoản", slug: "cai-dat", icon: "settings" },
    { title: "Đăng xuất", slug: "logout", icon: "log-out" },
];

export default function SidebarProfile({ user }: { user: any }) {
    const location = useLocation();
    const { userData, reloadUser } = useUser();


    return (
        <aside className="w-64 bg-[#1e1e2d] text-white rounded-md p-5 flex flex-col gap-4">
            <div className="text-center border-b border-white/10 pb-4">
                <img
                    src={userData?.avatar || "/Images/Main/user.png"}
                    alt="avatar"
                    className="w-20 h-20 rounded-full mx-auto"
                />
                <h3 className="mt-3 text-lg font-semibold">{userData?.name}</h3>
                <p className="text-sm text-gray-400"><UserRankText  rank={userData.rank}/></p>
            </div>

            <nav className="flex flex-col gap-2 mt-4">
                {sider.map((item) => {
                    const Icon = icons[item.icon];
                    const active =
                        location.pathname.includes(item.slug) && item.slug !== "logout";

                    return (
                        <Link
                            key={item.slug}
                            to={`/profile/${item.slug}`}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${active
                                ? "bg-green-500/20 text-[var(--primary)]"
                                : "hover:bg-white/10 text-gray-300 hover:text-white"
                                }`}
                        >
                            {Icon && <Icon size={18} />}
                            <span>{item.title}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
