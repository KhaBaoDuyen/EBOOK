import { useEffect, useState } from "react";
import CusttomLoading from "~/components/Loading";
import { useUser } from "~/context/UserContext";
import { UserRankCard, UserRank, UserStreak, UserSomeTime } from "~/components/users/UserRank";
import { getLibraryByUser } from "~/services/library.service";
import CardLibrary from "~/components/users/Cards/CardLibrary";

export default function UserAchievements() {

    const [loading, setLoading] = useState(false)
    const { userData, reloadUser } = useUser();
    const [finished, setFinished] = useState<any[]>([]);

    //------------------------[ LAY DANH SACH DA DOC ]--------------------
    const getAllLibraryByUser = async () => {
        try {
            setLoading(true);
            const res = await getLibraryByUser();
            if (res?.data?.data) {
                const data = res.data.data;
                setFinished(data.finished || []);
                //      console.log("dulieu getLibraryByUser =>", data);
                //   }
            }
        } catch (error: any) {
            console.log("Lỗi khi lấy getLibraryByUser:", error.message);
        } finally {
            setLoading(false);
        }
    }

    
    useEffect(() => {
        getAllLibraryByUser();
    }, [])
    return (
        <div className="min-h-screen text-white px-5">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-semibold mb-8 text-white">
                    Thành tích và Huy hiệu
                </h1>
                <div className="bg-[#1e1e2d] p-4 rounded-xl">
                    {loading ? (
                        <p className="text-center text-gray-400 mt-12">
                            Đang tải dữ liệu...
                        </p>
                    ) : (
                        <div className="">
                            <div className="flex flex-col border-b-2 py-4 border-white/20 justify-center items-center gap-4 text-center">
                                <UserRank user={userData} sizeImg="24" />
                                <UserRankCard user={userData} />

                                <span className="text-xl text-center font-semibold flex gap-3">
                                    <p> Huy hiệu hiện tại</p> <h1 className="capitalize">{userData.rank} </h1>
                                </span>
                                <p className="">Huy hiệu này là minh chứng cho hành trình không ngừng học hỏi của bạn.</p>
                            </div>

                            <div className="mx-auto w-full py-5 ">
                                <h2 className="text-2xl font-bold text-white mb-4">Thành tích</h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
                                    <div className="relative rounded-2xl border border-white/10 bg-[#0f1a1f] p-5">
                                        <UserStreak user={userData} mode="card" />
                                    </div>

                                    <div className="relative rounded-2xl border border-white/10 bg-[#0f1a1f]   p-5">
                                        <UserRank user={userData} mode="text" sizeImg="16" />
                                    </div>
                                    {userData.streakDays >= 5 && (
                                    <div className="relative rounded-2xl border border-white/10 bg-[#0f1a1f]   p-5">
                                        <UserSomeTime user={userData} mode="text" sizeImg="20"/>
                                    </div> )}
                                </div>
                            </div>
                            <div className="mx-auto w-full py-5 ">
                                {loading ? (
                                    <CusttomLoading />
                                ) : finished.length > 0 ? (
                                    <div className="">
                                        <h2 className="text-2xl font-bold text-white mb-4">Các sách đã đọc</h2>
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-h-[50rem] overflow-y-auto pr-2">                                            {finished.map((lib: any) => (
                                            <CardLibrary
                                                key={lib._id}
                                                book={{
                                                    id: lib.bookId?._id,
                                                    title: lib.bookId?.title,
                                                    author: lib.bookId?.authorId.name || "Không rõ tác giả",
                                                    cover: lib.bookId?.cover || "/Images/Main/book-default.png",
                                                    progress: lib.progress || 0,
                                                    isFinished: lib.isFinished,
                                                    isSaved: lib.isSaved,
                                                    slug: lib.bookId.slug,
                                                }}
                                            />
                                        ))}
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-center text-gray-400 mt-12">
                                        Chưa có sách nào trong mục này.
                                    </p>
                                )}
                            </div>
                        </div>

                    )
                    }
                </div>
            </div>
        </div>
    );
}
