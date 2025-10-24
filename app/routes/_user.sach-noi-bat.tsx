import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "@remix-run/react";
import { bookByType } from "~/services/bookBy/bookByType.service";

import CusttomLoading from "~/components/Loading";
import CardRanking from "~/components/users/Cards/CardRanking";

export default function SachNoiBatPages() {
    const [bookNew, setBookNew] = useState<any[]>([]);
    const [bookRead, setBookRead] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [params] = useSearchParams();
    const type = params.get("type") || "sach-moi-nhat";
    const navigate = useNavigate();

    const getBookByTypes = async () => {
        try {
            setLoading(true);

            if (type === "sach-moi-nhat") {
                const newbook = await bookByType("sach-moi-nhat");
                setBookNew(newbook);
            } else if (type === "doc-nhieu-nhat") {
                const readBook = await bookByType("doc-nhieu-nhat");
                setBookRead(readBook);
            } else {
                // navigate("/404");
            }
        } catch (error: any) {
           console.log("sac-noi-bat", error.message);     
        } finally {
            setLoading(false);
        }
    };

    const currentBooks = type === "doc-nhieu-nhat" ? bookRead : bookNew;
 

    useEffect(() => {
        getBookByTypes();
    }, [type]);


    return (
        <div className="!mx-auto">
            <div
                className="relative min-h-[17rem] border-b-2 border-white/40 shadow-gray-700 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/Images/Main/bg-sachnoibat.png')",
                }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="absolute bottom-5 left-[7%] z-10 container mx-auto flex items-end justify-start h-full p-6">
                    <h2 className="text-5xl font-bold text-white">
                        {type === "doc-nhieu-nhat" ? "Sách đọc nhiều" : "Sách mới nhất"}
                    </h2>
                </div>
            </div>

            <div className="container mx-auto p-5">
                <div className="flex flex-wrap gap-7">
                    {loading ? (
                        <div className="flex w-full justify-center items-center min-h-[300px]">
                            <CusttomLoading />
                        </div>

                    ) : (
                        currentBooks.map((b) => (
                            <CardRanking
                                key={b._id}
                                cover={b.cover}
                                title={b.title}
                                author={b?.authorId?.name}
                                category={b.categories}
                                description={b.description}
                                slug={b.slug}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
