import Button from "../components/Buttons/Button";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import books from "../../public/data/listBook.json";

import Section from "../components/Section";

export default function Ebook() {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => setIsExpanded(!isExpanded);

    return (
        <main className="  py-10 px-5 flex flex-col gap-5 container mx-auto ">
            <div className="flex mt-[7rem] gap-10 ">
                <div className="flex ">
                    <img
                        src="/Images/Slides/mobile/4024.png"
                        alt="Bìa sách"
                        className="rounded-xl shadow-lg max-h-[500px] object-cover"
                    />
                </div>

                <div className="flex flex-col h-[30rem] overflow-y-auto scrollbar-hide w-[50%] gap-8 text-white">
                    <h1 className="text-3xl font-bold">
                        Bảy cái bẫy khiến vốn tiếng Anh của bạn mãi "lùng"  
                    </h1>

                    <div className="grid border-b-1 py-5 border-b-white/30 grid-cols-2 gap-y-5 text-sm md:text-base">
                        <div>
                            <p className="!text-gray-500">Tác giả</p>
                            <p className="text-white font-medium">Coach Huy Hùng</p>
                        </div>
                        <div className="!text-gray-600">
                            <p className="!text-gray-500">Thể loại</p>
                            <p className="text-white font-medium">Phát triển cá nhân</p>
                        </div>
                        <div>
                            <p className="!text-gray-500">Nhà xuất bản</p>
                            <p className="text-white font-medium">Đang cập nhật</p>
                        </div>
                        <div>
                            <p className="!text-gray-500">Gói cước</p>
                            <p className="text-white font-medium">Miễn Phí</p>
                        </div>
                        <div>
                            <p className="!text-gray-500">Phát hành</p>
                            <p className="text-white font-medium">25/09/2025</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-gray-400">Chọn nội dung</span>
                        <div className="flex rounded-lg bg-gray-700 p-1">
                            <button
                                onClick={() => setIsExpanded(true)}
                                className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${isExpanded ? "bg-pri text-white" : "text-gray-400"
                                    }`}
                            >
                                Đầy đủ
                            </button>
                            <button
                                onClick={() => setIsExpanded(false)}
                                className={`px-4 py-2 rounded-md font-medium transition-colors duration-200
                                     ${!isExpanded ? "bg-pri text-white" : "text-gray-400"
                                    }`}
                            >
                                Tóm tắt
                            </button>
                        </div>
                    </div>
                    <Button
                        text="Đọc sách"
                        icon={faBookOpen}
                        href="/render/doc-sach-mau"
                        iconPosition="left"
                    />

                    <div>
                        <p
                            className={`text-gray-200 text-justify ${isExpanded ? "" : "line-clamp-5"
                                }`}
                        >
                            "Peter and Wendy" là tác phẩm kinh điển của J.M. Barrie, lần đầu được xuất bản vào năm 1911, là phiên bản tiểu thuyết của câu chuyện nổi tiếng về Peter Pan, nhân vật huyền thoại không bao giờ lớn. Cuốn sách này kể về cuộc phiêu lưu kỳ diệu của Peter Pan và những người bạn của anh, đặc biệt là Wendy Darling và các em của cô, trong thế giới Neverland đầy phép màu, nơi trẻ em không bao giờ phải lớn.
                            Câu chuyện xoay quanh Peter Pan, cậu bé tinh nghịch và dũng cảm, người dẫn dắt Wendy, John và Michael Darling vào một hành trình thần thoại đến Neverland, nơi họ gặp gỡ những nhân vật kỳ lạ như tiên cá, chiến binh thổ dân, và tên cướp biển Captain Hook đầy thù hận. Tuy nhiên, câu chuyện không chỉ đơn giản là một chuyến phiêu lưu kỳ thú, mà còn chứa đựng những chủ đề sâu sắc về tình yêu, gia đình, và sự trưởng thành.
                            Peter, với bản chất tự do và không biết sợ hãi, luôn sống trong một thế giới của trí tưởng tượng và tự do. Trong khi đó, Wendy đại diện cho sự yêu thương, chăm sóc và những giá trị gia đình. Cuốn sách khắc họa mối quan hệ giữa hai nhân vật này, cùng với những người bạn khác, và những lựa chọn mà họ phải đối mặt giữa việc tiếp tục sống trong thế giới trẻ thơ đầy tự do hay trở về với cuộc sống trưởng thành đầy trách nhiệm.
                            "Peter and Wendy" là một tác phẩm không chỉ dành cho trẻ em mà còn cho những người lớn, những ai đã trải qua giai đoạn trưởng thành nhưng vẫn tìm kiếm những ký ức tuổi thơ tươi đẹp và ước mơ về một cuộc sống không ràng buộc. Cuốn sách mang đến một thông điệp về sức mạnh của trí tưởng tượng, tình yêu thương gia đình và việc chấp nhận sự trưởng thành.
                            Với văn phong dễ hiểu, đầy cảm hứng và những hình ảnh sống động, "Peter and Wendy" là cuốn sách không thể thiếu trong tủ sách của những ai yêu thích những câu chuyện kỳ diệu về tuổi thơ, ước mơ và sự khám phá bản thân.
                            Waka xin trân trọng giới thiệu Peter and Wendy - J.M. Barrie!
                        </p>

                        <button
                            onClick={toggleExpand}
                            className="font-pri font-bold mt-2 "
                        >
                            {isExpanded ? "Rút gọn" : "Xem thêm"}
                        </button>
                    </div>


                </div>
            </div>
            <span>
                <Section title="Các sách khác" books={books} />

            </span>
        </main>
    );
}
