import CategoriesDropdown from "./CategoriesDropdown"


export interface HeaderItem {
    id: string,
    label: string,
    href: string | null,
    dropdown?: React.ReactNode
}

export const headerItems: HeaderItem[] = [
    {
        id: "home",
        label: "Home",
        href: "/"
    },
    {
        id: "shop",
        label: "Shop",
        href: "/shop"
    },
    {
        id: "collections",
        label: "Collections",
        href: null,
        dropdown: <CategoriesDropdown />
    },
    {
        id: "about-us",
        label: "About Us",
        href: "/about-us"
    },
    {
        id: "contact-us",
        label: "Contact Us",
        href: "/contact-us"
    },
    {
        id: "blog",
        label: "Blog",
        href: "/blog"
    }
]


