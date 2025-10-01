import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/_index.tsx"),
    route("/:category", "routes/$category.tsx"),
    route("/:category/:sub", "routes/$category.$sub.tsx"),
    route("/ebook/:nameBook", "routes/ebook.$nameBook.tsx"),
    route("/render/:nameBook", "routes/render.$nameBook.tsx"),
] satisfies RouteConfig;
