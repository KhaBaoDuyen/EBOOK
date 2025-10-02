import { Outlet } from "react-router";
import Header from "~/components/users/Layouts/Header";
import Footer from "~/components/users/Layouts/Footer";

export default function ClientLayout() {
  return (
    <>
      <Header />
      <div className="!w-full py-5 !mx-auto md:p-0 p-3">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
