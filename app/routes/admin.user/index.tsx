import { useEffect, useState } from "react";
import { Eye, Trash2, Search } from "lucide-react";
import { getAllUsers, } from "~/services/user.service";
import type IUser from "../../interfaces/user.interface";


export default function Users() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"user" | "admin">("user");

  useEffect(() => {
    getAll();
  }, [])

  const getAll = async () => {
    try {
      const data = await getAllUsers();
      console.log(data);

      setUsers(data);
    } catch (err) {
      console.log("loi khi lay du lieu", err)
    }
  }
  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
        Quản lý Users
      </h1>

      <div className="mb-4 flex gap-4 border-b border-gray-300 dark:border-gray-700">
        <button
          onClick={() => setActiveTab("user")}
          className={`px-4 py-2 font-medium ${activeTab === "user"
              ? "border-b-2 border-green-600 text-green-700 dark:text-green-400"
              : "text-gray-600 dark:text-gray-400"
            }`}
        >
          Người dùng
        </button>
        <button
          onClick={() => setActiveTab("admin")}
          className={`px-4 py-2 font-medium ${activeTab === "admin"
              ? "border-b-2 border-green-600 text-green-700 dark:text-green-400"
              : "text-gray-600 dark:text-gray-400"
            }`}
        >
          Quản trị
        </button>
      </div>

      <div className="relative mb-4 w-72">
        <Search className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500 size-5" />
        <input
          type="text"
          placeholder="Tìm kiếm user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-gray-300 dark:border-gray-600 
                 bg-white dark:bg-gray-800 
                 pl-10 pr-3 py-2
                 text-gray-900 dark:text-gray-100
                 focus:border-green-700 dark:focus:border-green-500
                 focus:ring focus:ring-green-200 dark:focus:ring-green-800"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-left">
              <th className="p-3">Tên</th>
              <th className="p-3">Email</th>
              <th className="p-3">Vai trò</th>
              <th className="p-3">Trạng thái</th>
              <th className="p-3">Ngày tạo</th>
              <th className="p-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-t border-gray-200 dark:border-gray-700"
              >
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">
                  {user.role === "admin" ? "Admin" : "User"}
                </td>
                <td className="p-3">
                  {user.status === 1 ? (
                    <span className="rounded bg-green-100 dark:bg-green-900 px-2 py-1 text-xs text-green-700 dark:text-green-300">
                      Hoạt động
                    </span>
                  ) : (
                    <span className="rounded bg-red-100 dark:bg-red-900 px-2 py-1 text-xs text-red-700 dark:text-red-300">
                      Khoá
                    </span>
                  )}
                </td>
                <td className="p-3">
                  {new Date(user.createdAt).toLocaleDateString("vi-VN")}
                </td>
                <td className="flex items-center justify-center gap-2 p-3">
                  <button
                    className="rounded bg-blue-100 dark:bg-blue-900 p-2 text-blue-600 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800"
                    title="Xem"
                  >
                    <Eye className="size-4" />
                  </button>
                  <button
                    className="rounded bg-red-100 dark:bg-red-900 p-2 text-red-600 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800"
                    title="Xóa"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="p-4 text-center text-gray-500 dark:text-gray-400"
                >
                  Không có user nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>

  );
}
