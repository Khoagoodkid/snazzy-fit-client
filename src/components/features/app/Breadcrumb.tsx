import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { HomeIcon } from "lucide-react"
import { ROUTES } from "@/constants/routes"
import React from "react"


export default function BreadcrumbComponent() {
    const breadcrumbItems = generateBreadcrumb(window.location.pathname);
    console.log(breadcrumbItems);
    return (
        <Breadcrumb>
            <BreadcrumbList className="text-sm text-gray-500">
                <BreadcrumbItem className="flex items-center gap-2" >
                    <HomeIcon className="w-5 h-5" />
                    <BreadcrumbLink href={breadcrumbItems[0].href}>{breadcrumbItems[0].label}</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                {breadcrumbItems.slice(1).map((item, index) => {
                    const lastItem = index + 1 === breadcrumbItems.length - 1;
                    return (
                        <React.Fragment key={item.href}>
                            <BreadcrumbItem className={`flex items-center gap-2 `} >
                                {
                                    lastItem ? <BreadcrumbPage className="text-black font-medium">{item.label}</BreadcrumbPage> : <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                                }

                            </BreadcrumbItem>
                            {!lastItem && <BreadcrumbSeparator />}
                        </React.Fragment>
                    )
                })}
            </BreadcrumbList>
        </Breadcrumb >
    )
}

interface BreadcrumbItem {
    label: string;
    href: string;
}

const generateBreadcrumb = (pathname: string) => {
    const segments = pathname.split("/").filter(Boolean);

    const breadcrumbItems: BreadcrumbItem[] = [
        { label: "Home", href: ROUTES.home },
    ];

    let currrentPath = "";

    segments.forEach((segment, index) => {
        currrentPath = currrentPath + "/" + segment;
        breadcrumbItems.push({ label: segment.charAt(0).toUpperCase() + segment.slice(1), href: currrentPath });
    });

    return breadcrumbItems;
}
