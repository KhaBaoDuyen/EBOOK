import SidebarProfile from "~/components/users/Layouts/Sidebar";
import { Outlet, useOutletContext } from "@remix-run/react";
import Header from "~/components/users/Layouts/Header";

import { decodeUser } from "~/utils/verifyToken.server";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { UserProvider } from "~/context/UserContext";

export async function loader({ request }: { request: Request }) {
    const user = await decodeUser(request);
    return json({ user: user || null });
}

const profilePage = () => {
    const { user } = useLoaderData<typeof loader>();
    return (
        <>
            <Header user={user} />
            <main className="!w-full userBody flex gap-5  !mx-auto  md:p-0 p-3">
                <span className="container !mx-auto pt-[7rem] flex gap-5 rounded-md min-h-screen">
                    <SidebarProfile user={user} />
                    <div className="flex-1">
                        <Outlet context={{ user }} />
                    </div>
                </span>

            </main>
        </>


    )

}
export default profilePage;