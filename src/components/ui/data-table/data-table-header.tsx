// data-table-header.tsx
import React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Trash2 } from "lucide-react";
import SearchInput from "./search-input";

interface ToggleableColumn {
  id: string;
  header: string;
  visible: boolean;
}

interface DataTableHeaderProps {
  title?: string;
  description?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  showSearch?: boolean;
  showColumnToggle?: boolean;
  columns?: ToggleableColumn[];
  onColumnToggle?: (columnId: string) => void;
  actions?: React.ReactNode;
  filters?: React.ReactNode;
  loading?: boolean;
  onRefresh?: () => void;
  onExport?: () => void;
  onAdd?: () => void;
  className?: string;
  selectedCount?: number;
  onDeleteSelected?: () => void;
}

const DataTableHeader: React.FC<DataTableHeaderProps> = ({
  searchValue,
  onSearchChange,
  searchPlaceholder,
  showSearch,
  showColumnToggle,
  columns = [],
  onColumnToggle,
  actions,
  filters,
  className,
  selectedCount = 0,
  onDeleteSelected,
}) => {
  return (
    <div className={className}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2 w-full lg:w-auto">
          {showSearch && (
            <div className="relative w-full sm:w-64">
              <SearchInput
                value={searchValue}
                onChange={onSearchChange}
                placeholder={searchPlaceholder || "Search"}
                size="md"
                
              />
            </div>
          )}
          {filters}
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
          {selectedCount > 0 && onDeleteSelected && (
            <Button
              variant="outline"
              size="sm"
              onClick={onDeleteSelected}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 border-2 border-red-200 hover:border-red-300 w-full sm:w-auto h-10 font-semibold shadow-sm transition-all"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete ({selectedCount})
            </Button>
          )}
          {showColumnToggle && columns.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="text-slate-900 bg-white border-2 border-slate-200 hover:border-cyan-300 hover:bg-cyan-50 w-full sm:w-auto h-10 font-semibold shadow-sm transition-all"
                >
                  Columns Toggle <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-white border-slate-200 shadow-xl"
              >
                {columns.map((column) => (
                  <DropdownMenuCheckboxItem
                    className="text-slate-900 focus:bg-cyan-50 focus:text-cyan-900"
                    key={column.id}
                    checked={column.visible}
                    onCheckedChange={() => onColumnToggle?.(column.id)}
                  >
                    {column.header}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          {actions}
        </div>
      </div>
    </div>
  );
};

export default DataTableHeader;
