import { Outlet, useNavigate } from "@remix-run/react";
import Header from "~/components/users/Layouts/Header";
import Footer from "~/components/users/Layouts/Footer";
import { useEffect, useState } from "react";
import { decodeUser } from "~/utils/verifyToken.server";
import { json } from "@remix-run/node";
import { UserProvider } from "~/context/UserContext";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { useNotify } from "~/context/NotifyContext";

export async function loader({ request }: { request: Request }) {
  const user = await decodeUser(request);
  return json({ user: user || null });
}

export default function UserLayout() {
  const { user } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const { setNotify } = useNotify();
  const navigate = useNavigate();


  useEffect(() => {
    const error = searchParams.get("error");
    if (error === "unauthorized") {
      searchParams.delete("error");
      setNotify({
        open: true,
        type: "error",
        title: "Bạn không có quyền truy cập!",
        message: "Tài khoản này không có quyền truy cập vào hệ thống quản trị!"
      });
      navigate("/");
    }

  }, [searchParams]);

  return (
    <>
      <Header user={user} />
      <main className="!w-full userBody py-5 !mx-auto md:p-0 p-3">
        <Outlet context={{ user }} />
      </main>
      <Footer />
    </>
  );
}
