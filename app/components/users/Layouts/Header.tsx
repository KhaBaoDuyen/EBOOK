import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "@remix-run/react";
import { json } from "@remix-run/node";
import categoriesData from "../../../../public/data/categories.json";
import { FaSearch } from "react-icons/fa";
import {
  User, BookMarked, Box, Trophy, Clock, HelpCircle, LogOut,
  Sparkles, BookOpen, DollarSign, Gift, Star
} from "lucide-react";

//=============[ COMPORNENT ]===================
import Button from "../Buttons/Button";
import ButtonBorder from "../Buttons/Button-Border";
import Authentication from "../../Authentication";
import CategoryDropdown from "./CategoryDropdown";

//=============[ SERVICE - CONTEXT ]==========================
import { getAllCategory } from "~/services/category.service";
import { getAuthByEmail } from "~/services/user.service";
import { useUser }from "~/context/UserContext";

export default function Header({ user }: { user: any }) {
  const [scrolled, setScrolled] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState("login");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<"left" | "right">("left");
  
  const { userData, reloadUser } = useUser();

  const categories = categoriesData;

  useEffect(() => {
    setCurrentPath(window.location.pathname);

    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  function isActive(cat: any) {
    if (currentPath === "/" + cat.slug) return true;
    if (
      cat.subCategories &&
      cat.subCategories.some((sub: any) => currentPath === "/" + sub.slug)
    )
      return true;
    return false;
  }

  //---------------[ LAY DU LIEU MENU ]------------------------
  const [categogy, setCategogy] = useState<any[]>([]);
  const [moreCategories, setMoreCategories] = useState<any[]>([]);
  const [maxVisible, setMaxVisible] = useState<number>(7);


  async function fetchCategogy() {
    try {
      const res = await getAllCategory();
      const allCategory = res.data;

      const parentCat = allCategory.filter(
        (c: any) => !c.parentId || c.parentId.length === 0
      );

      const groupCat = parentCat.map((parent: any) => {
        const children = allCategory.filter(
          (child: any) =>
            Array.isArray(child.parentId) && child.parentId.includes(parent._id)
        );
        return { ...parent, children };
      });

      const MAX_VISIBLE = 5;
      const visibleCategories = groupCat.slice(0, MAX_VISIBLE);
      const moreCategories = groupCat.slice(MAX_VISIBLE);

      setCategogy(visibleCategories);
      setMoreCategories(moreCategories);

      // console.log("Hiển thị menu:", visibleCategories.map((c: any) => c.name));
      // console.log("Xem thêm:", moreCategories.map((c: any) => c.name));
    } catch (error: any) {
      console.log(" Lỗi khi lấy menu:", error.message);
    }
  }
  const checkPosition = () => {
    if (dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const screenWidth = window.innerWidth;

      if (rect.x + rect.width > screenWidth - 50) {
        setPosition("right");
      } else {
        setPosition("left");
      }
    }
  }

  useEffect(() => {
    fetchCategogy();

    const width = window.innerWidth;
    let max = 5;
    if (width < 1280) max = 5;
    if (width < 1024) max = 4;
    setMaxVisible(max);

    checkPosition();
    window.addEventListener("resize", checkPosition);
    return () => window.removeEventListener("resize", checkPosition);
  }, []);

  //--------------[ LAY DULIEU NGUOI DUNG ]----------------------
  const [users, setUsers] = useState();

  const getOneUser = async () => {
    try {
      const res = await getAuthByEmail(user?.email);
      setUsers(res.data);
    } catch (error: any) {
      console.log("loi lay dulieu nguoi dung =>", error.message);
    }
  }

  useEffect(() => {
    getOneUser();
  }, [])

  return (
    <>
      <header
        className="fixed top-0 w-full z-100 transition-colors duration-300"
        style={{
          background: scrolled
            ? "linear-gradient(to top, rgba(0,0,0,0.8) 100%)"
            : "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)",
        }}
      >
        <div className="mx-auto lg:container px-4 py-3">
          <div className="flex items-start justify-between">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-pri transition-colors order-1"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>

            <div className="hidden lg:flex items-center space-x-3 max-w-[13rem] order-2 lg:order-1">
              <img
                src="/Images/Main/logo-light.png"
                alt="Logo"
                className="w-full rounded-xl drop-shadow-2xl"
              />
            </div>

            <nav className="hidden lg:flex flex-wrap gap-x-6 gap-y-2 order-2">
              {categogy.map((cat: any) => (
                <div key={cat.slug} className="relative flex flex-col gap-3 group">
                  <a
                    href={`/${cat.slug}`}
                    className={`py-2 px-3 font-bold transition-colors hover:text-emerald-400 ${isActive(cat) ? "text-emerald-400" : ""
                      }`}
                  >
                    {cat.name}
                  </a>

                  {cat.children?.length > 0 && (
                    <CategoryDropdown cat={cat} currentPath={currentPath} />
                  )}

                </div>
              ))}

              {moreCategories.length > 0 && (
                <div className="relative flex flex-col gap-3 group">
                  <a
                    href="#"
                    className="py-2 px-3 text-white/90 font-bold transition-colors hover:text-emerald-400"
                    onClick={(e) => e.preventDefault()}
                  >
                    Xem thêm
                  </a>

                  <div
                    className="absolute left-0 top-full w-max mt-1 
        bg-black/80 backdrop-blur-md rounded-lg shadow-lg border border-white/30 
        transition-all duration-200 z-50 opacity-0 invisible 
        group-hover:opacity-100 group-hover:visible"
                  >
                    <div
                      className="grid auto-rows-auto gap-4 max-h-[20rem] overflow-y-auto p-5"
                      style={{ gridTemplateColumns: "repeat(1, minmax(0, max-content))" }}
                    >
                      {moreCategories.map((cat: any) => (
                        <a
                          key={cat.slug}
                          href={`/${cat.slug}`}
                          className="block px-4 py-2 text-white hover:bg-white/30 rounded-xl font-bold"
                        >
                          {cat.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </nav>



            <div className="flex items-center justify-between space-x-3 order-3">
              <div className="relative items-center group">
                <input
                  type="text"
                  placeholder="Tìm kiếm sách, tác giả..."
                  className="absolute right-12 w-0 opacity-0 px-0 py-2 rounded-xl bg-pri text-white
                   placeholder-gray-400 border border-gray-600 focus:outline-none 
                   focus:w-64 focus:px-4 focus:opacity-100 transition-all duration-300 
                   group-hover:w-64 group-hover:opacity-100 group-hover:px-4 focus:ring-emerald-600"
                />
                <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-emerald-500 transition-colors duration-300">
                  <FaSearch className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="hidden lg:block">
                {user ? (

                  <>
                    <div className="relative group inline-block">
                      <div className="flex items-center gap-2 cursor-pointer select-none">
                        <img
                          src={userData?.avatar || "/Images/Main/user.png"}
                          alt="Avatar"
                          className="w-10 h-10 rounded-full object-cover border-2 border-[var(--primary)] transition-all duration-300 group-hover:brightness-90"
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 text-[var(--primary)] transition-transform duration-300 group-hover:rotate-180"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>

                      <div
                        className="absolute right-0 mt-3 w-58 rounded-2xl border border-white/20
                        bg-black/70 backdrop-blur-md shadow-lg 
                        opacity-0 invisible translate-y-[-10px]
                        group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                        transition-all duration-300 z-50" >
                        <div className="px-4 py-3 border-b border-white/10 flex justify-between items-center text-white">
                          <p className="font-semibold text-base">{userData?.name || "Người dùng"}</p>
                          <img
                            src={userData?.avatar || "/Images/Main/user.png"}
                            alt="Avatar"
                            className="w-10 h-10 rounded-full object-cover border-2 border-[var(--primary)] transition-all duration-300 group-hover:brightness-90"
                          />
                        </div>

                        <div className="flex flex-col p-3  text-sm text-white">
                          <a href="/profile/thong-tin-ca-nhan" className="flex  rounded-xl items-center gap-2 px-4 py-3 text-md hover:bg-white/10 transition-all">
                            <User size={18} className="text-gray-300 text-md font-bold" /> Quản lý tài khoản
                          </a>
                          <a href="/profile/thu-vien-cua-toi" className="flex rounded-xl items-center gap-2 px-4 py-3 text-md hover:bg-white/10 transition-all">
                            <BookMarked size={18} className="text-gray-300 text-md font-bold" /> Tủ sách cá nhân
                          </a>

                          <a href="/ranking" className="flex rounded-xl items-center gap-2 px-4 py-3 text-md hover:bg-white/10 transition-all">
                            <Trophy size={18} className="text-gray-300 text-md font-bold" /> Thứ hạng đọc sách
                          </a>
                          <hr className="border-white/10 my-2" />

                          <button className="flex rounded-xl items-center gap-2 px-4 py-3 text-md hover:bg-white/10 transition-all">
                            <LogOut size={18} /> Đăng xuất
                          </button>
                        </div>
                      </div>
                    </div>

                  </>
                ) : (
                  <span className="flex items-center space-x-3">
                    <ButtonBorder
                      text="Đăng ký"
                      onClick={() => { setMode("register"); setIsOpen(true); }}
                    />
                    <Button
                      text="Đăng nhập"
                      onClick={() => { setMode("login"); setIsOpen(true); }}
                    />
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>



      <div
        className={`lg:hidden z-[100] bg-[#121214] fixed top-0 left-0 w-[70%] min-h-screen 
          border-r overflow-y-auto transition-all duration-300 ${mobileMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
          }`}
      >
        <div className="px-4 py-4 mt-16">
          <div className="border-b flex flex-col gap-4 border-white/30 pb-4 mb-4">
            <div className="flex flex-col gap-3 items-center">
              <span className="w-24 h-24 overflow-hidden rounded-full">
                <img
                  src="/Images/Main/user.webp"
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </span>
              <Button text="Đăng nhập" href="/dang-nhap" />
            </div>
            <span>
              <a href="/" className="block px-4 py-3 text-gray-300 hover:text-white rounded-lg">
                Trang chủ
              </a>
              <a
                href="/ve-chung-toi"
                className="block px-4 py-3 text-gray-300 hover:text-white rounded-lg"
              >
                Về chúng tôi
              </a>
            </span>
          </div>

          <nav className="space-y-2">
            {categories.map((cat) => (
              <a
                key={cat.slug}
                href={"/" + cat.slug}
                className={`block px-4 py-3 text-gray-300 hover:text-white rounded-lg transition-colors ${isActive(cat) ? "text-emerald-400 bg-gray-800" : ""
                  }`}
              >
                {cat.name}
              </a>
            ))}
          </nav>

          <div className="border-t border-gray-700 mt-4 pt-4">
            <h3 className="text-white font-semibold mb-3">Khám phá ngay</h3>
            <div className="flex flex-wrap gap-2">
              <a
                href="/sach-moi-nhat"
                className="py-2 px-3 text-sm hover:bg-white/50 bg-white/20 backdrop-blur rounded-md text-white"
              >
                Sách mới nhất
              </a>
              <a
                href="/sach-da-doc"
                className="py-2 px-3 text-sm hover:bg-white/50 bg-white/20 backdrop-blur rounded-md text-white"
              >
                Sách đã đọc
              </a>
              <a
                href="/sach-nghe"
                className="py-2 px-3 text-sm hover:bg-white/50 bg-white/20 backdrop-blur rounded-md text-white"
              >
                Sách nghe
              </a>
            </div>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      <Authentication
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        mode={mode}
      />
    </>
  );
}
