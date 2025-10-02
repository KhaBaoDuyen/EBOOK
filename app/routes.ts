import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    // --- client routes ---
    route("/", "routes/_layout.tsx", [
        index("routes/_index.tsx"),
        route(":category", "routes/$category.tsx"),
        route("books", "routes/books.tsx"),
        route(":category/:sub", "routes/$category.$sub.tsx"),
        route("ebook/:nameBook", "routes/ebook.$nameBook.tsx"),
        route("render/:nameBook", "routes/render.$nameBook.tsx"),
    ]),

    // --- admin routes ---
    route("/admin", "routes/admin/_layout.tsx", [
        index("routes/admin/index.tsx"),                 // /admin
        route("users", "routes/admin/users.tsx"),        // /admin/users
    ]),
] satisfies RouteConfig;
