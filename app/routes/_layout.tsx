import { Outlet } from "@remix-run/react";
import Header from "~/components/users/Layouts/Header";
import Footer from "~/components/users/Layouts/Footer";

export default function UserLayout() {
  return (
    <>
      <Header />
      <main className="!w-full userBody py-5 !mx-auto md:p-0 p-3">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
