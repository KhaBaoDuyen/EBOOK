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
    "thạch anh tím": "#E5E4E2",
    "ngọc trai": "#A3E4D7",
};

export function UserRankCard({ user }: { user: any }) {
    const currentRank = user.rank || "đồng";
    const rankOrder = [
        "đồng", "bạc", "vàng", "lục bảo", "thiên thanh",
        "hồng ngọc", "thạch anh tím", "ngọc trai"
    ];

    const rankList = rankOrder.map((r) => ({
        name: r,
        img: rankImages[r],
        active: rankOrder.indexOf(r) <= rankOrder.indexOf(currentRank),
    }));

    return (
        <div className="p-4  text-center flex flex-col justify-center items-center">
            <div className="flex justify-center gap-3 mb-3">
                {rankList.map((rank) => (
                    <div className="flex flex-col gap-3">
                        <img
                            key={rank.name}
                            src={rank.img}
                            alt={rank.name}
                            title={rank.name}
                            className={`w-15 h-15 object-contain transition duration-300 ${rank.active ? "opacity-100" : "opacity-25 grayscale"
                                }`}/>
                        <p
                            className={`text-xs font-semibold text-center ${rank.active ? "block" : "hidden"}`}
                            style={{
                                color: rankColors[rank.name] || "#ffffff",
                                textTransform: "capitalize",
                            }}
                        >
                            {rank.name}
                        </p>
                    </div>

                ))}
            </div>

            {user.streakDays > 1 && (
                <div className="mt-4 flex justify-center">
                    <div className="relative w-24 h-24">
                        <img
                            src="/Images/rank/chuoi.png"
                            alt="chuỗi liên tục"
                            className="w-full h-full object-contain animate-pulse"
                        />

                        <span className="absolute bottom-1 right-2 text-white text-sm font-bold drop-shadow-md">
                            {user.streakDays} ngày
                        </span>

                        <span className="absolute top-1 left-2 text-orange-300 text-xs font-semibold drop-shadow-sm">
                            Chuỗi liên tục
                        </span>
                    </div>
                </div>
            )}

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
