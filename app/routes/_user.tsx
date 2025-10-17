import { Outlet } from "@remix-run/react";
import Header from "~/components/users/Layouts/Header";
import Footer from "~/components/users/Layouts/Footer";

import { decodeUser } from "~/utils/verifyToken.server";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";


export async function loader({ request }: { request: Request }) {
  const user = await decodeUser(request);
  return json({ user: user || null });
}

export default function UserLayout() {
  const { user } = useLoaderData<typeof loader>();
  return (
    <>
      <Header user={user}/>
      <main className="!w-full userBody py-5 !mx-auto md:p-0 p-3">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
