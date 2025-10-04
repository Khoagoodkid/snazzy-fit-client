export interface HeaderItem {
    id: string,
    label: string
    href: string | null
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
        id: "categories",
        label: "Categories",
        href: "/categories"
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