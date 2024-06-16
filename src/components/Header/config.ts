import { HeaderNavigationItem } from "./Header";

export const HEADER_CONFIG: HeaderNavigationItem[] = [
    {
        title: "Products",
        to: "/products",
        activePattern: "/products*"
    },
    {
        title: "Services",
        to: "/services",
        activePattern: "/services*"
    }
]
