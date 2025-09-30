import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/_index.tsx"),
    route("/:category", "routes/$category.tsx"),
    route("/:category/:sub", "routes/$category.$sub.tsx"),
    route("/:bookId", "routes/$bookId.tsx"),
] satisfies RouteConfig;
