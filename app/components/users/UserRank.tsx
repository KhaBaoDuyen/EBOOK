import React from "react";

const rankImages: Record<string, string> = {
    "đồng": "/Images/rank/dong.png",
    "bạc": "/Images/rank/bac.png",
    "vàng": "/Images/rank/vang.png",
    "lục bảo": "/Images/rank/lucbao.png",
    "thiên thanh": "/Images/rank/thienthanh.png",
    "hồng ngọc": "/Images/rank/hongngoc.png",
    "thạch anh tím": "/Images/rank/thachanhtim.png",
    "ngọc trai": "/Images/rank/ngoctrai.png",
};

const rankColors: Record<string, string> = {
    "đồng": "#C97E3A",
    "bạc": "#C0C0C0",
    "vàng": "#FFD700",
    "lục bảo": "#2ECC71",
    "thiên thanh": "#6FA8DC",
    "hồng ngọc": "#E06666",
    "thạch anh tím": "#A020F0",
    "ngọc trai": "#A3E4D7",
};

export function UserRankCard({ user }: { user: any }) {
    const currentRank = user.rank || "đồng";

    const rankOrder = [
        "đồng", "bạc", "vàng", "lục bảo", "thiên thanh",
        "hồng ngọc", "thạch anh tím", "ngọc trai"
    ];

    const currentIndex = rankOrder.indexOf(currentRank);

    const rankList = rankOrder.map((r, index) => ({
        name: r,
        img: rankImages[r],
        active: index <= currentIndex,
    }));

    return (
        <div className="p-4 text-center flex flex-col justify-center items-center">
            <div className="flex justify-center gap-5 mb-3 flex-wrap">
                {rankList.map((rank) => (
                    <div key={rank.name} className="flex flex-col gap-2 items-center">
                        <img
                            src={rank.img}
                            alt={rank.name}
                            title={rank.name}
                            className={`w-16 h-16 object-contain transition duration-300 ${rank.active
                                ? "opacity-100"
                                : "opacity-25 grayscale"
                                }`}
                        />

                    </div>
                ))}
            </div>
        </div>
    );
}


export function UserRankText({ rank }: { rank: string }) {
    const color = rankColors[rank] || "#ffffff";
    const icon = rankImages[rank];
    return (
        <span
            className="inline-flex items-center gap-2"
            style={{ color, fontWeight: 600, textTransform: "capitalize" }}
        >
            {rank}
            <img
                src={icon}
                alt={rank}
                className="w-5 h-5 object-contain"
            />
        </span>
    );
}

export function UserRank({ user, mode, sizeImg }: { user: any; mode?: string; sizeImg: string }) {
    const currentRank = user.rank || "đồng";

    const currentRankImg = rankImages[currentRank];
    const currentRankColor = rankColors[currentRank] || "#ffffff";

    return (
        <div
            className={`p-1 rounded-2xl text-center flex flex-col justify-center ${mode === "text" ? "border p-5 border-white/10 bg-[#0f1a1f]" : ""
                }`}
        >
            <div className="flex items-center gap-3">
                <img
                    src={currentRankImg}
                    alt={currentRank}
                    title={currentRank}
                    className={`w-${sizeImg} h-${sizeImg} object-contain transition duration-300`}
                />
                {mode === "text" && (<div>
                    <div
                        className="text-lg font-semibold capitalize"
                        style={{ color: currentRankColor }} >
                        {currentRank}
                    </div>
                    <div className="text-white/60 text-sm">Hạng hiện tại</div>
                </div>)}
            </div>
        </div>
    );
}


export function UserStreak({ user, mode }: { user: any; mode?: string }) {
    const isActive = user.streakDays > 1;

    if (mode === "card") {
        return (
            <div className="rounded-2xl border border-white/10 bg-[#0f1a1f] p-5 flex items-center gap-3">
                <img
                    src="/Images/rank/chuoi.png"
                    alt="chuỗi liên tục"
                    className={`w-16 h-16 object-contain transition duration-300 ${isActive ? "animate-pulse brightness-110" : "grayscale opacity-40"
                        }`}
                />

                <div>
                    <div
                        className={`text-white text-xl font-extrabold ${isActive ? "opacity-100" : "opacity-50"
                            }`}
                    >
                        {user.streakDays}
                    </div>
                    <div className="text-white/60 text-sm">Ngày streak</div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 text-center flex flex-col  border-white/10 bg-[#0f1a1f] justify-center items-center">
            <div className="mt-4 flex justify-center">
                <div className="relative w-24 h-24">
                    <img
                        src="/Images/rank/chuoi.png"
                        alt="chuỗi liên tục"
                        className={`w-full h-full object-contain transition duration-300 ${isActive ? "animate-pulse brightness-110" : "grayscale opacity-40"
                            }`} />

                    <span
                        className={`absolute bottom-1 right-2 text-sm font-bold drop-shadow-md transition ${isActive ? "text-white" : "text-gray-400"
                            }`} >
                        {user.streakDays} ngày
                    </span>

                    <span
                        className={`absolute top-1 left-2 text-xs font-semibold drop-shadow-sm transition ${isActive ? "text-orange-300" : "text-gray-500"
                            }`} >
                        Chuỗi liên tục
                    </span>
                </div>
            </div>
        </div>
    );
}

export function UserSomeTime({ user, mode, sizeImg }: { user: any; mode?: string; sizeImg: string }) {
    const streak = user.streakDays || 0;
    const isActive = streak > 1;

    if (streak < 5) return null;

    let badgeImg = "/Images/rank/thuongxuyen.png";
    let badgeTitle = "Truy cập thường xuyên";
    let subTitle = "Giữ thói quen tốt mỗi ngày nhé 🌞";

    if (streak > 100) {
        badgeImg = "/Images/rank/hocsi.png";
        badgeTitle = "Học sĩ";
        subTitle = "Bạn là tấm gương sáng cho mọi người đó ";
    } else if (streak > 50) {
        badgeImg = "/Images/rank/tricot.png";
        badgeTitle = "Trí cốt";
        subTitle = "Bạn đúng là người bạn trung thành của sách ";
    } else if (streak > 20) {
        badgeImg = "/Images/rank/khachquen.png";
        badgeTitle = "Khách quen";
        subTitle = "Ngày nào cũng thấy bạn, dễ thương ghê 🥰";
    } else if (streak >= 5) {
        badgeImg = "/Images/rank/thuongxuyen.png";
        badgeTitle = "Truy cập thường xuyên";
        subTitle = "Giữ thói quen tốt mỗi ngày nhé 🌞";
    }


    return (
        <div className={`p-1 rounded-2xl ${mode === "text" ? "border p-5 border-white/10 bg-[#0f1a1f]" : ""
            }  flex items-center gap-3`}>
            <img
                src={badgeImg}
                alt={badgeTitle}
                className={`w-${sizeImg} h-${sizeImg} object-contain transition duration-300 `} />
            {mode === "text" && (
                <div className="space-y-1">
                    <div className="text-white font-semibold text-base">{badgeTitle}</div>
                    <div className="text-white/60 text-sm italic">{subTitle}</div>
                </div>
            )}
        </div>
    );
}


