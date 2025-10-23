import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { getAllBook } from "~/services/book.service";
import { getStatistical } from "~/services/User/count.user.service";
import { User, UserCheck, ShieldUser, Book, BookMarked ,BookHeart   } from "lucide-react";

import StatCard from "~/components/admin/ui/card/StatCard";

export default function QuanTriIndex() {

  //------------[ SACH TOP ]-------------------  
  const [books, setBooks] = useState<any[]>([]);

  const getBookViewTop = async () => {
    try {
      const res = await getAllBook();
      // console.log("res getAllBook =>", res);

      const data = Array.isArray(res.data) ? res.data : res.data?.data || [];
      const sorted = data.sort((a: any, b: any) => Number(b.countView) - Number(a.countView));
      setBooks(sorted.slice(0, 10));
    } catch (error: any) {
      console.log("Lỗi getBookViewTop:", error.message);
    }
  };
  //-----------------[ COUNT USERS ]----------------------
  const [countUser, setCountUser] = useState<any>();
  const [activeUser, setActiveUser] = useState<any>();
  const [verifiedRate, setVerifiedRate] = useState<any>();
  const [countBook, setCountBook ] = useState<any>();
  const [countLike, setCountLike] = useState<any>();
  const [countSaveBook, setCountSaveBook] = useState<any>();

  const getCountUser = async () => {
    try {
      const res = await getStatistical();
      setCountUser(res.totalUsers);
      setActiveUser(res.activeUsers);
      setVerifiedRate(res.verifiedRates);

      setCountBook(res.totalBooks);
      setCountLike(res.totalLikesCount);
      setCountSaveBook(res.totalSavedBooks);

      console.log("getCountUser", res);

    } catch (error: any) {
      console.log("Lỗi getCountUser:", error.message);
    }
  }

  useEffect(() => {
    getBookViewTop();
    getCountUser();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-6 w-full">
        <section className="flex-[0.7] bg-[#0f1a1f] p-5 rounded-xl">
          <div className="p-5 rounded-2xl w-full h-[400px]">
            <h2 className="text-white text-lg font-semibold mb-4">Top 10 sách có lượt xem cao nhất</h2>
            <ResponsiveContainer width="100%" height="100%">
              {books.length > 0 ? (
                <BarChart data={books} margin={{ top: 10, right: 20, left: 0, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2f3c48" />
                  <XAxis dataKey="title" stroke="#ccc" tick={{ fill: "#ccc", fontSize: 10 }} angle={-30} textAnchor="end" />
                  <YAxis stroke="#ccc" tick={{ fill: "#ccc" }} />
                  <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "none" }} itemStyle={{ color: "#15B088" }} />
                  <Bar dataKey="viewCount" fill="#15B088" radius={[6, 6, 0, 0]} />
                </BarChart>
              ) : (
                <p className="text-center text-gray-400 mt-20">Không có dữ liệu hiển thị</p>
              )}
            </ResponsiveContainer>
          </div>
        </section>

        <aside className="flex-[0.3] flex flex-col gap-5  rounded-xl">
          <StatCard icon={User} value={countUser} label="Tổng số người dùng" />
          <StatCard icon={UserCheck} value={activeUser} label="Người dùng hoạt động, lượt truy cập trong 7 ngày" />
          <StatCard icon={ShieldUser} value={verifiedRate} label="Tỷ lệ người dùng đã xác thực email" />
        </aside>
      </div>

      <div className="grid grid-cols-3 gap-5">
        <StatCard icon={Book} value={countBook} label="Tổng số sách trong hệ thống" />
        <StatCard icon={BookMarked } value={countLike} label="Tổng lượt tym (yêu thích) trên toàn hệ thống." />
        <StatCard icon={BookHeart } value={countSaveBook} label="Tổng số sách được lưu trong hệ thống" />

      </div>
    </div>

  );
}
