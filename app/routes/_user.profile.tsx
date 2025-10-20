import SidebarProfile from "~/components/users/Layouts/Sidebar";
import { Outlet, useOutletContext } from "@remix-run/react";

type UserContext = {
    user: {
        id: string;
        name: string;
        email: string;
        role: string;
    } | null;
};

const profilePage = () => {
    const { user } = useOutletContext<UserContext>();
    return (
        <div className="flex !mx-auto gap-6 px-4  container md:pt-[7rem]">
            <SidebarProfile user={user} />
            <div className="flex-1 rounded-md min-h-[70vh]">
                <Outlet context={{ user }} />
            </div>
        </div>

    )

}
export default profilePage;