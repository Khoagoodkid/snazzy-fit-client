import { Button } from "@/components/ui/button"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from "@/components/ui/pagination"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useMemo } from "react"
export default function PaginationComponent({
    totalPages,
    currentPage,
    onPageChange,
}: {
    totalPages: number
    currentPage: number
    onPageChange: (page: number) => void
}) {
    const pages = useMemo(() => {
        if(totalPages >= 5) {
            return [currentPage, currentPage + 1, currentPage + 2, "...", totalPages]
        }
        let pages = []
        for(let i = 1; i <= totalPages; i++) {
            pages.push(i)
        }
        return pages
    }, [currentPage, totalPages])
    return (
        <div className="flex items-center gap-2">
            <Button
                variant="outline"
                size="sm"
                className={`h-8 w-8 p-0 cursor-pointer rounded-full`}
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                <ChevronLeft className="w-5 h-5" />
            </Button>

            {pages.map((page, index) => (
                <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className={` h-8 w-8 p-0 hover:bg-[var(--yellow-primary)]/90 ${currentPage === page ? "bg-[var(--yellow-primary)]" : ""} cursor-pointer rounded-full`}

                    onClick={() => onPageChange(page === "..." ? currentPage + 3 : Number(page))}
                >
                    {page}
                </Button>
            ))}

            <Button
                variant="outline"
                disabled={currentPage >= totalPages}
                size="sm"
                className={`h-8 w-8 p-0 cursor-pointer rounded-full`}

                onClick={() => onPageChange(currentPage + 1)}
            >
                <ChevronRight className="w-5 h-5" />
            </Button>
        </div>
    )
}