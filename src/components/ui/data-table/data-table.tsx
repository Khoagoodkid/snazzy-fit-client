"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  CellContext,
  Column,
} from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pagination } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import Image from "next/image";
import DataTableHeader from "./data-table-header";
import PaginationComponent from "@/components/features/app/Pagination";

// Props for the DataTable component
interface DataTableProps<TData extends { id: string }, TValue> {
  columns: (string | ColumnDef<TData, TValue>)[];
  data: TData[];
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  onRowClick?: (row: TData) => void;
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
  showSearch?: boolean;
  actions?: React.ReactNode;
  filters?: React.ReactNode;
  onDeleteSelected?: (selectedRows: TData[]) => void;
  rowWrapper?: React.ComponentType<{ id: string; children: React.ReactNode }>;
  rowComponent?: React.ComponentType<{ row: { original: TData }; children: React.ReactNode }>;
  showCheckboxColumn?: boolean;
  // Server-side pagination props
  serverSidePagination?: boolean;
  pagination?: {
    totalRecord: number;
    totalPage: number;
    currentPage: number;
    limit: number;
    offset: number;
  };
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

// Main DataTable component
export function DataTable<
  TData extends { id: string },
  TValue = unknown
>({
  columns = [],
  data = [],
  searchValue = "",
  onSearchChange,
  searchPlaceholder = "",
  onRowClick,
  loading = false,
  emptyMessage = "No results found.",
  className,
  showSearch = true,
  actions,
  filters,
  onDeleteSelected,
  rowWrapper: RowWrapper,
  rowComponent: RowComponent,
  showCheckboxColumn = true,
  serverSidePagination = false,
  pagination,
  onPageChange,
  onPageSizeChange,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});

  const checkboxColumn: ColumnDef<TData, TValue> = {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center h-full">
        <Checkbox
          className="w-5 h-5 border-2 border-slate-300 cursor-pointer data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-cyan-600 data-[state=checked]:to-teal-600 data-[state=checked]:border-cyan-600"
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div
        className="flex items-center h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <Checkbox
          className="w-5 h-5 border-2 border-slate-300 cursor-pointer data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-cyan-600 data-[state=checked]:to-teal-600 data-[state=checked]:border-cyan-600"
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
    meta: { width: "40px" },
  };

  const createSortableHeader = (
    column: Column<TData, TValue>,
    headerText: string,
    extraClassName: string = ""
  ) => (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className={`w-full h-auto px-0 py-0 hover:bg-cyan-50 hover:text-cyan-700 text-left -ml-1 transition-colors ${extraClassName}`}
    >
      <div className="flex items-center justify-between w-full min-w-0">
        <span className="truncate flex-1 text-left font-semibold">{headerText}</span>
        <span className="ml-1 flex-shrink-0 text-cyan-600">
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown className="h-4 w-4" />
          ) : (
            <ArrowUpDown className="h-4 w-4 opacity-70" />
          )}
        </span>
      </div>
    </Button>
  );

  const normalizedColumns: ColumnDef<TData, TValue>[] = [
    checkboxColumn,
    ...columns.map((col): ColumnDef<TData, TValue> => {
      if (typeof col === "string") {
        return {
          id: col,
          header: ({ column }) =>
            createSortableHeader(
              column,
              col.charAt(0).toUpperCase() +
              col.slice(1).replace(/([A-Z])/g, " $1"),
              "text-gray-900"
            ),
          accessorKey: col,
          cell: ({ getValue }: CellContext<TData, unknown>) =>
            String(getValue() || ""),
          meta: { width: "150px" }, // Set default width for string-based columns
        };
      } else if (
        typeof col.header === "string" &&
        col.enableSorting !== false
      ) {
        return {
          ...col,
          header: ({ column }) =>
            createSortableHeader(
              column,
              col.header as string,
              "text-slate-900"
            ),
          // meta: { ...col.meta, width: col.meta?.width || "150px" }, // Ensure width is set
        } as ColumnDef<TData, TValue>;
      } else if (typeof col.header === "string") {
        return {
          ...col,
          header: () => (
            <span className="text-slate-900 font-semibold">
              {col.header as string}
            </span>
          ),
          // meta: { ...col.meta, width: col.meta?.width || "150px" }, // Ensure width is set
        } as ColumnDef<TData, TValue>;
      }
      return {
        ...col,
        // meta: { ...col.meta, width: col.meta?.width || "150px" }, // Ensure width is set
      };
    }),
  ];

  const table = useReactTable({
    data,
    columns: showCheckboxColumn ? normalizedColumns : normalizedColumns.filter((col) => col.id !== "select"),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: serverSidePagination ? undefined : getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: {
        pageSize: serverSidePagination ? (pagination?.limit || 10) : 10,
        pageIndex: serverSidePagination ? ((pagination?.currentPage || 1) - 1) : 0
      }
    },
    state: {
      rowSelection,
      sorting,
      columnVisibility,
      ...(serverSidePagination && {
        pagination: {
          pageIndex: (pagination?.currentPage || 1) - 1,
          pageSize: pagination?.limit || 10,
        }
      })
    },
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    enableRowSelection: true,
    enableHiding: true,
    manualPagination: serverSidePagination,
    pageCount: serverSidePagination ? (pagination?.totalPage || -1) : undefined,
  });

  React.useEffect(() => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    if (selectedRows.length > 0) {
      console.log(
        "Selected rows:",
        selectedRows.map((row) => row.original)
      );
    }
  }, [rowSelection, table]);

  const handleRowClick = (row: TData) => {
    onRowClick?.(row);
  };

  const handleColumnToggle = (columnId: string) => {
    table.getColumn(columnId)?.toggleVisibility();
  };

  const handleDeleteSelected = () => {
    const selectedRows = table
      .getFilteredSelectedRowModel()
      .rows.map((row) => row.original);
    if (selectedRows.length > 0) {
      if (onDeleteSelected) {
        onDeleteSelected(selectedRows);
      } else {
        console.log(
          "No onDeleteSelected handler provided. Selected rows:",
          selectedRows
        );
      }
      setRowSelection({});
    }
  };

  const selectedRowsCount = table.getFilteredSelectedRowModel().rows.length;

  const toggleableColumns = table
    .getAllColumns()
    .filter((column) => column.getCanHide() && column.id !== "select")
    .map((column) => ({
      id: column.id,
      header:
        typeof column.columnDef.header === "string"
          ? column.columnDef.header
          : column.id.charAt(0).toUpperCase() + column.id.slice(1),
      visible: column.getIsVisible(),
    }));

  return (
    <div className={className}>
      <DataTableHeader
        columns={toggleableColumns}
        showColumnToggle={true}
        onColumnToggle={handleColumnToggle}
        searchValue={searchValue}
        onSearchChange={onSearchChange}
        searchPlaceholder={searchPlaceholder}
        showSearch={showSearch}
        actions={actions}
        filters={filters}
        className="mb-4"
        selectedCount={selectedRowsCount}
        onDeleteSelected={handleDeleteSelected}
      />

      {/* Enhanced container for horizontal scrolling */}
      <div
        className="relative rounded-xl border-0 overflow-x-auto shadow-lg"
        style={{ maxWidth: "100%" }}
      >
        <Table
          className=""
          style={{ tableLayout: "auto" }}
        >
          {/* Changed table-layout to auto to respect column widths */}
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="bg-gradient-to-b from-slate-50 to-slate-100 border-b-2 border-slate-200"
              >
                {headerGroup.headers.map((header) => {
                  const columnWidth =
                    (header.column.columnDef.meta as { width?: string })
                      ?.width || "150px"; // Default width if not specified
                  return (
                    <TableHead
                      key={header.id}
                      className="text-slate-900 font-bold text-sm px-4 py-4 text-left"
                      style={{
                        width: columnWidth,
                        minWidth: columnWidth,
                        maxWidth: columnWidth,
                        whiteSpace: "normal",
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={normalizedColumns.length}
                  className="py-12 text-center text-slate-600"
                >
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-cyan-600 border-t-transparent rounded-full animate-spin"></div>
                    <span>Loading...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => {
                const cellsContent = row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="px-4 py-3"
                    style={{
                      width: (cell.column.columnDef.meta as { width: string })
                        ?.width,
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ));

                const rowElement = (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    onClick={() => handleRowClick(row.original)}
                    className="data-[state=selected]:bg-gradient-to-r data-[state=selected]:from-cyan-50 data-[state=selected]:to-teal-50 cursor-pointer hover:bg-gradient-to-r hover:from-slate-50 hover:to-slate-100 transition-all duration-200 border-b border-slate-200"
                  >
                    {cellsContent}
                  </TableRow>
                );

                if (RowComponent) {
                  return (
                    <RowComponent key={row.id} row={row}>
                      {cellsContent}
                    </RowComponent>
                  );
                }

                if (RowWrapper) {
                  return (
                    <RowWrapper key={row.id} id={row.original.id}>
                      {rowElement}
                    </RowWrapper>
                  );
                }

                return rowElement;
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={normalizedColumns.length}
                  className="py-12 text-center"
                >
                  <div className="flex flex-col items-center justify-center text-slate-600 space-y-4">
                    <Image
                      src="/empty.png"
                      alt="empty"
                      width={200}
                      height={200}
                      className="opacity-50"
                    />
                    <div className="space-y-2">
                      <p className="text-slate-900 text-lg font-semibold">
                        {emptyMessage || "No results found."}
                      </p>
                      <p className="text-slate-500 text-sm">
                        Try adjusting your search or filters
                      </p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {table.getRowModel().rows.length > 0 && (
        <div className="flex items-center justify-end mt-5">
          <PaginationComponent
            totalPages={serverSidePagination ? (pagination?.totalPage || 1) : table.getPageCount()}
            currentPage={serverSidePagination ? (pagination?.currentPage || 1) : table.getState().pagination.pageIndex + 1}
            onPageChange={(newPage: number) => {
              if (serverSidePagination && onPageChange) {
                onPageChange(newPage);
              } else {
                table.setPageIndex(newPage - 1);
              }
            }}
          />
        </div>
      )}
    </div>
  );
}
