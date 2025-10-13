import { Outlet } from "@remix-run/react";


export default function layoutNotHeader() {
  return (
    <>
      <main className="!w-full userBody py-5 !mx-auto md:p-0 p-3">
        <Outlet />
      </main>
     </>
  );
}
