import { RoutesLabel } from "../types/routes.types";

export const ROUTE_LABELS: RoutesLabel[] = [
    { href: "", label: "Home" },
    { href: "/todos", label: "Todos" },
    { href: "/products", label: "Products" },
    { href: "/profiles", label: "Profiles" },
    { href: "/my-profile", label: "Profile", svg: 'home'},
    { href: "/chats", label: "Chats", svg: 'chat'},
    { href: "/search", label: "Search", svg: 'search'},
]