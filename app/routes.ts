import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/_index.tsx"),
    route("sach/:category", "routes/sach.$category.tsx"),
    route("sach/:category/:sub", "routes/sach.$category.$sub.tsx"),
    route("sach/:bookId", "routes/sach.$bookId.tsx"),
] satisfies RouteConfig;
