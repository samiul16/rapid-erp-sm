/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import {
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Download,
  Grid,
  List,
  Mic,
  Minus,
  MoreHorizontal,
  Search,
} from "lucide-react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getSortedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  type SortingFnOption,
} from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, X, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { ExportComponent } from "@/pages/Country/ListExportComponent";
import FilterComponent from "@/pages/Country/ListFilterComponent";
import ColumnVisibilityPanel from "@/pages/Country/ListVisibilityComponent";

type User = {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive" | "pending";
  createdAt: string;
  deletedAt: string | null;
  draftedAt: string | null;
};

export default function CommonDataTable({
  viewMode,
  setViewMode,
  componentColumns,
  columnData,
}: {
  viewMode: string;
  setViewMode: (viewMode: string) => void;
  componentColumns: any;
  columnData: any[];
}) {
  const [data, setData] = useState(columnData);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [editingCell, setEditingCell] = useState<{
    rowId: string;
    columnId: string;
  } | null>(null);
  const [editValue, setEditValue] = useState<any>("");
  const [columnVisibility, setColumnVisibility] = useState({});
  const [selectedCell, setSelectedCell] = useState({
    rowIndex: -1,
    columnId: "",
  });
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [showExport, setShowExport] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useTranslation();
  const [showVisibility, setShowVisibility] = useState(false);

  const columns = useMemo<ColumnDef<User>[]>(() => {
    const columns: ColumnDef<User>[] = [
      {
        id: "select",
        header: ({ table }) => {
          const allSelected = table.getIsAllPageRowsSelected();
          const someSelected =
            table.getSelectedRowModel().rows.length > 0 && !allSelected;

          return (
            <div className="flex items-center">
              {someSelected ? (
                <button
                  onClick={() => table.toggleAllPageRowsSelected(false)}
                  className="flex items-center justify-center w-4 h-4 rounded border border-gray-300 cursor-pointer"
                >
                  <Minus className="h-3 w-3 text-gray-600" />
                </button>
              ) : (
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                  }
                  aria-label="Select all"
                  className="w-4 h-4 cursor-pointer"
                />
              )}
            </div>
          );
        },
        cell: ({ row, table }) => (
          <div
            className={`
              ${
                table.getIsAllPageRowsSelected() || row.getIsSelected()
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-100"
              }
              transition-opacity
            `}
          >
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
            />
          </div>
        ),
        size: 60,
        minSize: 60,
        maxSize: 60,
      },
    ];

    componentColumns.forEach((componentColumn: any) => {
      if (componentColumn.accessorKey === "status") {
        columns.push({
          accessorKey: componentColumn.accessorKey,
          header: ({ column }) => (
            <ColumnFilterHeader
              column={column}
              title={componentColumn.title}
              options={componentColumn.options}
            />
          ),
          cell: (info) => (
            <StatusEditableCell
              info={info}
              editingCell={editingCell}
              setEditingCell={setEditingCell}
              editValue={editValue}
              setEditValue={setEditValue}
              handleEdit={handleEdit}
              selectedCell={selectedCell}
              setSelectedCell={setSelectedCell}
            />
          ),
          filterFn: componentColumn.filterFn,
          sortingFn: componentColumn.sortingFn as SortingFnOption<User>,
          size: componentColumn.size || 120,
          minSize: componentColumn.minSize || 80,
        });
      } else {
        columns.push({
          accessorKey: componentColumn.accessorKey,
          header: ({ column }) => (
            <ColumnFilterHeader
              column={column}
              title={componentColumn.title}
              options={componentColumn.options}
            />
          ),
          cell: (info) => (
            <EditableCell
              info={info}
              editingCell={editingCell}
              setEditingCell={setEditingCell}
              editValue={editValue}
              setEditValue={setEditValue}
              handleEdit={handleEdit}
              selectedCell={selectedCell}
              setSelectedCell={setSelectedCell}
            />
          ),
          filterFn: componentColumn.filterFn,
          sortingFn: componentColumn.sortingFn as SortingFnOption<User>,
          size: componentColumn.size || 150,
          minSize: componentColumn.minSize || 100,
        });
      }
    });

    columns.push({
      id: "actions",
      header: "Actions",
      cell: () => (
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDelete()}
            className="bg-blue-300 hover:bg-blue-600 text-white rounded-full"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      ),
      size: 100,
      minSize: 80,
      maxSize: 120,
    });

    return columns;
  }, [data, editingCell, editValue, selectedCell]);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      rowSelection,
      columnVisibility,
      pagination,
    },
    getRowId: (row) => row.id,
    enableRowSelection: true,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    columnResizeMode: "onChange",
  });

  const [allColumnsVisible, setAllColumnsVisible] = useState(
    table
      .getAllColumns()
      .filter(
        (col) => col.getCanHide() && col.id !== "select" && col.id !== "actions"
      )
      .every((col) => col.getIsVisible())
  );

  const handleCellClick = useCallback((rowIndex: number, columnId: string) => {
    setSelectedCell({ rowIndex, columnId });
    // Clear editing state when selecting a new cell
    setEditingCell(null);
  }, []);

  const isCellSelected = (rowIndex: number, columnId: string) => {
    return (
      selectedCell.rowIndex === rowIndex && selectedCell.columnId === columnId
    );
  };

  // Updated navigation functions
  const navigateToCell = useCallback((rowIndex: number, columnId: string) => {
    setSelectedCell({ rowIndex, columnId });
    setEditingCell(null); // Exit editing mode when navigating
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Don't handle navigation if we're in editing mode
      if (editingCell) return;

      if (selectedCell.rowIndex === -1 || !selectedCell.columnId) return;

      const rows = table.getRowModel().rows;
      const columns = table.getAllColumns().filter((col) => col.getIsVisible());
      const columnIds = columns.map((col) => col.id);
      const currentRowIndex = selectedCell.rowIndex;
      const currentColumnIndex = columnIds.indexOf(selectedCell.columnId);

      let newRowIndex = currentRowIndex;
      let newColumnIndex = currentColumnIndex;

      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          newRowIndex = Math.max(0, currentRowIndex - 1);
          break;
        case "ArrowDown":
          e.preventDefault();
          newRowIndex = Math.min(rows.length - 1, currentRowIndex + 1);
          break;
        case "ArrowLeft":
          e.preventDefault();
          newColumnIndex = Math.max(0, currentColumnIndex - 1);
          break;
        case "ArrowRight":
          e.preventDefault();
          newColumnIndex = Math.min(
            columnIds.length - 1,
            currentColumnIndex + 1
          );
          break;
        case "Enter":
          e.preventDefault();
          // Enter edit mode for the selected cell
          // eslint-disable-next-line no-case-declarations
          const rowId = rows[currentRowIndex]?.id;
          if (
            rowId &&
            selectedCell.columnId !== "select" &&
            selectedCell.columnId !== "actions"
          ) {
            setEditingCell({ rowId, columnId: selectedCell.columnId });
            const currentValue = rows[currentRowIndex].getValue(
              selectedCell.columnId
            );
            setEditValue(currentValue);
          }
          return;
        default:
          return;
      }

      navigateToCell(newRowIndex, columnIds[newColumnIndex]);
    },
    [selectedCell, table, editingCell, navigateToCell]
  );

  useEffect(() => {
    const tableContainer = tableContainerRef.current;
    if (tableContainer) {
      tableContainer.addEventListener("keydown", handleKeyDown);
      tableContainer.setAttribute("tabindex", "0"); // Make table focusable
      return () => {
        tableContainer.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [handleKeyDown]);

  const handleEdit = (rowId: string, columnId: string, value: any) => {
    setData((prev) => {
      return prev.map((row) => {
        if (row.id === rowId) {
          const updatedrow = { ...row, [columnId]: value };
          return updatedrow;
        }
        return row;
      });
    });
    setEditingCell(null);

    // Keep the cell selected after editing
    const rowIndex = table
      .getRowModel()
      .rows.findIndex((row) => row.id === rowId);
    if (rowIndex !== -1) {
      setSelectedCell({ rowIndex, columnId });
    }

    // Refocus the table after editing
    setTimeout(() => {
      if (tableContainerRef.current) {
        tableContainerRef.current.focus();
      }
    }, 0);
  };

  const handleDelete = () => {
    // setData((prev) => prev.filter((row) => row.id !== id));
  };

  const handleBulkDelete = () => {
    const selectedIds = Object.keys(rowSelection).map(
      (idx) => data[parseInt(idx)].id
    );
    setData((prev) => prev.filter((row) => !selectedIds.includes(row.id)));
    setRowSelection({});
  };

  const handleBulkUpdate = () => {
    const selectedRows = table.getSelectedRowModel().rows;
    selectedRows.forEach((row) => {
      console.log(row.original);
    });
    setRowSelection({});
  };

  const selectedRows = table.getSelectedRowModel().rows;

  return (
    <div className="h-full flex flex-col px-4 py-3">
      {/* Header Controls - Fixed height */}
      <div className="flex-shrink-0 pb-4">
        <div className="grid grid-cols-12 gap-4 items-center">
          {/* Left column - View toggle, Import, and Bulk actions */}
          <div className="col-span-4 flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              className="gap-2 cursor-pointer bg-blue-200 hover:bg-blue-700 text-blue-700 hover:text-white rounded-full  min-w-[60px] sm:min-w-[80px]"
            >
              {viewMode === "grid" ? (
                <>
                  <List className="h-4 w-4" />
                  <span className="hidden sm:inline">List</span>
                </>
              ) : (
                <>
                  <Grid className="h-4 w-4" />
                  <span className="hidden sm:inline">Grid</span>
                </>
              )}
            </Button>

            <Button
              variant="outline"
              className={`gap-2 cursor-pointer bg-blue-200 hover:bg-blue-500 text-blue-700 hover:text-white rounded-full ${
                showVisibility ? "bg-blue-400 text-white" : ""
              }`}
              onClick={() => {
                setShowVisibility(!showVisibility);
                setShowExport(false);
                setShowFilter(false);
              }}
            >
              Visibility
            </Button>

            {/* Bulk actions - only show when rows are selected */}
            {selectedRows.length > 0 && (
              <div className="flex items-center space-x-2 ml-2">
                <Button
                  className="disabled:opacity-500 cursor-pointer text-red-600"
                  variant="outline"
                  size="sm"
                  onClick={handleBulkDelete}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
                <Button
                  className="disabled:opacity-500 cursor-pointer bg-blue-200 hover:bg-blue-500 text-blue-700 hover:text-white rounded-full"
                  variant="outline"
                  size="sm"
                  onClick={handleBulkUpdate}
                >
                  Bulk Edit
                </Button>
              </div>
            )}
          </div>

          {/* Middle column - Search with mic */}
          <div className="col-span-4 flex justify-center">
            <div className="w-full max-w-xs mx-auto">
              <div className="relative flex items-center rounded-full">
                <Search className="absolute left-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search states..."
                  className="pl-9 pr-9 w-full rounded-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-2 h-6 w-6 rounded-full cursor-pointer p-0"
                >
                  <Mic className="h-4 w-4 text-blue-400" />
                </Button>
              </div>
            </div>
          </div>

          {/* Right column - Filter, Export, and Columns */}
          <div className="col-span-4 flex items-center justify-end gap-2">
            {selectedRows.length > 0 && (
              <div>
                selected {selectedRows.length} of total {data.length}
              </div>
            )}

            <Button
              variant="outline"
              className={`gap-2 cursor-pointer bg-blue-200 hover:bg-blue-500 text-blue-700 hover:text-white rounded-full cursor-pointer ${
                showExport ? "bg-blue-400 text-white" : ""
              }`}
              onClick={() => {
                setShowExport(!showExport);
                setShowFilter(false);
              }}
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">{t("common.export")}</span>
            </Button>

            <Button
              variant="outline"
              className={`gap-2 cursor-pointer bg-blue-200 hover:bg-blue-500 text-blue-700 hover:text-white rounded-full ${
                showFilter ? "bg-blue-400 text-white" : ""
              }`}
              onClick={() => {
                setShowFilter(!showFilter);
                setShowExport(false);
              }}
            >
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">{t("common.filters")}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area - Flexible height */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Table Container - Takes remaining space */}
        <div className="flex-1 flex flex-col overflow-hidden min-h-0">
          {/* Table with scrollable body */}
          <div
            ref={tableContainerRef}
            className="flex-1 overflow-auto focus:outline-none border border-gray-200 rounded-lg min-h-0"
            tabIndex={0}
            style={{
              height: "calc(100vh - 700px)", // Adjust based on your footer height and other elements
              minHeight: "200px", // Minimum height for small screens
            }}
          >
            <table className="w-full border-collapse">
              <thead className="bg-gray-50 dark:bg-gray-900 sticky top-0 z-10">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200 bg-gray-50 dark:bg-gray-900"
                        style={{
                          width: `${header.getSize()}px`,
                          minWidth: `${
                            header.column.columnDef.minSize || header.getSize()
                          }px`,
                          maxWidth: `${
                            header.column.columnDef.maxSize || "none"
                          }`,
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900">
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className={`group hover:bg-gray-50 dark:hover:bg-gray-800 ${
                      row.getIsSelected() ? "bg-gray-100 dark:bg-gray-800" : ""
                    }`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className={`px-4 py-3 whitespace-nowrap border-b border-gray-200 ${
                          isCellSelected(row.index, cell.column.id)
                            ? "ring-2 ring-blue-500 ring-inset bg-blue-50"
                            : "hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                        style={{
                          width: `${cell.column.getSize()}px`,
                          minWidth: `${
                            cell.column.columnDef.minSize ||
                            cell.column.getSize()
                          }px`,
                          maxWidth: `${
                            cell.column.columnDef.maxSize || "none"
                          }`,
                        }}
                        data-row-id={row.id}
                        data-col-id={cell.column.id}
                        onClick={(e) => {
                          // Only handle single click if it's not part of a double-click
                          if (e.detail === 1) {
                            handleCellClick(row.index, cell.column.id);
                          }
                        }}
                        onDoubleClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          // Handle double-click for editable cells
                          if (
                            cell.column.id !== "select" &&
                            cell.column.id !== "actions"
                          ) {
                            setSelectedCell({
                              rowIndex: row.index,
                              columnId: cell.column.id,
                            });
                            setEditingCell({
                              rowId: row.id,
                              columnId: cell.column.id,
                            });
                            setEditValue(row.getValue(cell.column.id));
                          }
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer - Fixed at bottom */}
          <div className="flex-shrink-0 bg-white dark:bg-gray-900 border-t">
            <PaginationControls table={table} />
          </div>
        </div>

        {/* Side Panels */}
        {showExport && (
          <div className="w-72 flex-shrink-0 border-l bg-white dark:bg-gray-800">
            <ExportComponent
              table={table}
              allColumnsVisible={allColumnsVisible}
              setAllColumnsVisible={setAllColumnsVisible}
              setShowExport={setShowExport}
            />
          </div>
        )}
        {showFilter && (
          <div className="w-72 flex-shrink-0 border-l bg-white dark:bg-gray-800">
            <FilterComponent table={table} setShowFilter={setShowFilter} />
          </div>
        )}
        {showVisibility && (
          <div className="w-72 flex-shrink-0 border-l bg-white dark:bg-gray-800">
            <ColumnVisibilityPanel
              table={table}
              setShowVisibility={setShowVisibility}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// Updated ColumnFilterHeader component
function ColumnFilterHeader({
  column,
  title,
  options,
}: {
  column: any;
  title: string;
  options: any[];
}) {
  const [filterValue, setFilterValue] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const currentFilter = column.getFilterValue();
  const sortDirection = column.getIsSorted();

  useEffect(() => {
    if (currentFilter && Array.isArray(currentFilter)) {
      setSelectedOptions(currentFilter);
    }
  }, [currentFilter]);

  const handleOptionToggle = (option: string) => {
    const newSelectedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option];

    setSelectedOptions(newSelectedOptions);
    column.setFilterValue(
      newSelectedOptions.length > 0 ? newSelectedOptions : undefined
    );
  };

  const clearFilter = () => {
    setSelectedOptions([]);
    column.setFilterValue(undefined);
  };

  const toggleSorting = () => {
    if (sortDirection === "asc") {
      column.toggleSorting(true);
    } else {
      column.toggleSorting(false);
    }
  };

  const filteredOptions = options.filter((option) =>
    option.toString().toLowerCase().includes(filterValue.toLowerCase())
  );

  return (
    <div className="flex items-center gap-1 group">
      <span className="truncate">{title}</span>

      <button
        onClick={toggleSorting}
        className={`p-1 rounded transition-opacity flex-shrink-0 ${
          sortDirection
            ? "opacity-100 bg-blue-100 text-blue-600"
            : "opacity-0 group-hover:opacity-100 text-gray-500 hover:bg-gray-100"
        }`}
      >
        {sortDirection === "asc" ? (
          <ArrowUp className="h-4 w-4" />
        ) : sortDirection === "desc" ? (
          <ArrowDown className="h-4 w-4" />
        ) : (
          <ArrowUp className="h-4 w-4" />
        )}
      </button>

      <div
        className={`flex-shrink-0 ${
          isFilterOpen || selectedOptions.length > 0
            ? "opacity-100"
            : "opacity-0 group-hover:opacity-100"
        } transition-opacity`}
      >
        <DropdownMenu onOpenChange={setIsFilterOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className={`h-6 w-6 p-0 ${
                selectedOptions.length > 0 ? "text-blue-600" : "text-gray-500"
              }`}
            >
              <Filter className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <div className="p-2">
              <Input
                placeholder={`Search ${title}`}
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                className="h-8"
              />
            </div>

            <DropdownMenuSeparator />

            {/* Select All */}
            <DropdownMenuCheckboxItem
              checked={
                selectedOptions.length === filteredOptions.length &&
                filteredOptions.length > 0
              }
              onCheckedChange={() => {
                if (selectedOptions.length === filteredOptions.length) {
                  setSelectedOptions([]);
                  column.setFilterValue(undefined);
                } else {
                  setSelectedOptions(filteredOptions.map((o) => o.toString()));
                  column.setFilterValue(
                    filteredOptions.map((o) => o.toString())
                  );
                }
              }}
            >
              Select All
            </DropdownMenuCheckboxItem>

            {/* Options List */}
            <div className="max-h-60 overflow-y-auto">
              {filteredOptions.map((option) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={option}
                    checked={selectedOptions.includes(option.toString())}
                    onCheckedChange={() =>
                      handleOptionToggle(option.toString())
                    }
                  >
                    {option}
                  </DropdownMenuCheckboxItem>
                );
              })}
            </div>

            {/* Clear Filter */}
            {selectedOptions.length > 0 && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={clearFilter}>
                  <X className="mr-2 h-4 w-4" />
                  Clear all
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Current filter indicator - always visible when active */}
      {selectedOptions.length > 0 && (
        <span className="ml-1 text-xs text-blue-500 flex-shrink-0">
          {selectedOptions.length}
        </span>
      )}
    </div>
  );
}

function EditableCell({
  info,
  editingCell,
  setEditingCell,
  editValue,
  setEditValue,
  handleEdit,
  setSelectedCell,
}: {
  info: any;
  editingCell: { rowId: string; columnId: string } | null;
  setEditingCell: React.Dispatch<
    React.SetStateAction<{ rowId: string; columnId: string } | null>
  >;
  editValue: any;
  setEditValue: React.Dispatch<React.SetStateAction<any>>;
  handleEdit: (rowId: string, columnId: string, value: any) => void;
  selectedCell: { rowIndex: number; columnId: string };
  setSelectedCell: React.Dispatch<
    React.SetStateAction<{ rowIndex: number; columnId: string }>
  >;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const isEditing =
    editingCell?.rowId === info.row.id &&
    editingCell?.columnId === info.column.id;

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.stopPropagation(); // Prevent table navigation while editing

    if (e.key === "Enter") {
      handleEdit(info.row.id, info.column.id, editValue);
      // Keep cell selected after editing
      setSelectedCell({ rowIndex: info.row.index, columnId: info.column.id });
    }
    if (e.key === "Escape") {
      setEditingCell(null);
      // Return to selection mode
      setSelectedCell({ rowIndex: info.row.index, columnId: info.column.id });
    }
    if (e.key === "Tab") {
      e.preventDefault();
      handleEdit(info.row.id, info.column.id, editValue);
      if (e.shiftKey) {
        focusPreviousCell(info.row.id, info.column.id);
      } else {
        focusNextCell(info.row.id, info.column.id);
      }
    }
  };

  const focusNextCell = (rowId: string, columnId: string) => {
    console.log(rowId, columnId);
    const columnsOrder = [
      "select",
      "name",
      "email",
      "status",
      "createdAt",
      "deletedAt",
      "draftedAt",
      "actions",
    ];
    const currentIndex = columnsOrder.indexOf(columnId);
    const nextColumnId = columnsOrder[currentIndex + 1] || columnsOrder[0];

    // If we're at the last column, move to first column of next row
    if (currentIndex === columnsOrder.length - 1) {
      const nextRowIndex = info.row.index + 1;
      setSelectedCell({ rowIndex: nextRowIndex, columnId: columnsOrder[0] });
    } else {
      setSelectedCell({ rowIndex: info.row.index, columnId: nextColumnId });
    }
  };

  const focusPreviousCell = (rowId: string, columnId: string) => {
    console.log(rowId, columnId);
    const columnsOrder = [
      "select",
      "name",
      "email",
      "status",
      "createdAt",
      "deletedAt",
      "draftedAt",
      "actions",
    ];
    const currentIndex = columnsOrder.indexOf(columnId);
    const prevColumnId =
      currentIndex > 0
        ? columnsOrder[currentIndex - 1]
        : columnsOrder[columnsOrder.length - 1];

    // If we're at the first column, move to last column of previous row
    if (currentIndex === 0) {
      const prevRowIndex = Math.max(0, info.row.index - 1);
      setSelectedCell({
        rowIndex: prevRowIndex,
        columnId: columnsOrder[columnsOrder.length - 1],
      });
    } else {
      setSelectedCell({ rowIndex: info.row.index, columnId: prevColumnId });
    }
  };

  if (isEditing) {
    return (
      <Input
        ref={inputRef}
        type={info.column.id === "email" ? "email" : "text"}
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => {
          handleEdit(info.row.id, info.column.id, editValue);
          setSelectedCell({
            rowIndex: info.row.index,
            columnId: info.column.id,
          });
        }}
        className="h-full w-full border-0 outline-0 focus:ring-0 focus:border-0 p-1 bg-white dark:bg-gray-800"
      />
    );
  }

  return (
    <div className="cursor-pointer hover:bg-gray-100 p-1 rounded min-h-[32px] flex items-center dark:hover:bg-gray-800 truncate">
      {info.column.id === "createdAt" ||
      info.column.id === "deletedAt" ||
      info.column.id === "draftedAt"
        ? info.getValue()
          ? new Date(info.getValue() as string).toLocaleDateString()
          : "—"
        : info.getValue()}
    </div>
  );
}

function StatusEditableCell({
  info,
  editingCell,
  setEditingCell,
  editValue,
  setEditValue,
  handleEdit,
  setSelectedCell,
}: {
  info: any;
  editingCell: { rowId: string; columnId: string } | null;
  setEditingCell: React.Dispatch<
    React.SetStateAction<{ rowId: string; columnId: string } | null>
  >;
  editValue: any;
  setEditValue: React.Dispatch<React.SetStateAction<any>>;
  handleEdit: (rowId: string, columnId: string, value: any) => void;
  selectedCell: { rowIndex: number; columnId: string };
  setSelectedCell: React.Dispatch<
    React.SetStateAction<{ rowIndex: number; columnId: string }>
  >;
}) {
  const isEditing =
    editingCell?.rowId === info.row.id &&
    editingCell?.columnId === info.column.id;

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "pending", label: "Pending" },
  ];

  const getStatusBadge = (status: string) => {
    const statusColors = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-red-100 text-red-800",
      pending: "bg-yellow-100 text-yellow-800",
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          statusColors[status as keyof typeof statusColors] ||
          "bg-gray-100 text-gray-800"
        }`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (isEditing) {
    return (
      <Select
        value={editValue}
        onValueChange={(value: string) => {
          setEditValue(value);
          handleEdit(info.row.id, info.column.id, value);
        }}
        onOpenChange={(open: boolean) => {
          if (!open) {
            setEditingCell(null);
            setSelectedCell({
              rowIndex: info.row.index,
              columnId: info.column.id,
            });
          }
        }}
      >
        <SelectTrigger className="w-full border-0 outline-0 focus:ring-0 focus:border-0 p-1 bg-transparent h-auto">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  return (
    <div className="cursor-pointer hover:bg-gray-100 p-1 rounded min-h-[32px] flex items-center dark:hover:bg-gray-800">
      {getStatusBadge(info.getValue())}
    </div>
  );
}

function PaginationControls({ table }: { table: any }) {
  const [pageInputValue, setPageInputValue] = useState(
    (table.getState().pagination.pageIndex + 1).toString()
  );

  const defaultSizes = [10, 25, 50, 75];
  const moreSizes = [100, 200, 300, 400];

  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();
  const pageSize = table.getState().pagination.pageSize;
  const totalRows = table.getFilteredRowModel().rows.length;

  // Calculate the range of items being shown
  const startItem = table.getState().pagination.pageIndex * pageSize + 1;
  const endItem = Math.min(startItem + pageSize - 1, totalRows);

  const handlePageInputChange = (value: string) => {
    setPageInputValue(value);
  };

  const handlePageInputSubmit = () => {
    const pageNumber = parseInt(pageInputValue);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      table.setPageIndex(pageNumber - 1);
    } else {
      // Reset to current page if invalid
      setPageInputValue(currentPage.toString());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handlePageInputSubmit();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault(); // Prevent default number input behavior

      const currentPageIndex = table.getState().pagination.pageIndex;

      if (e.key === "ArrowUp" && currentPageIndex < totalPages - 1) {
        table.setPageIndex(currentPageIndex + 1);
      } else if (e.key === "ArrowDown" && currentPageIndex > 0) {
        table.setPageIndex(currentPageIndex - 1);
      }
    }
  };

  // Update input value when page changes externally
  useEffect(() => {
    setPageInputValue(currentPage.toString());
  }, [currentPage]);

  return (
    <div className="flex items-center justify-between px-2 mt-4">
      {/* Page size buttons */}
      <div className="flex items-center space-x-2">
        {defaultSizes.map((pageSize) => (
          <Button
            key={pageSize}
            variant={
              table.getState().pagination.pageSize === pageSize
                ? "default"
                : "outline"
            }
            size="sm"
            onClick={() => table.setPageSize(Number(pageSize))}
            className={`min-w-[40px] ${
              table.getState().pagination.pageSize === pageSize
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-white text-blue-500 border-blue-500 hover:bg-blue-50"
            }`}
          >
            {pageSize}
          </Button>
        ))}

        {/* More page sizes popup */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              size="sm"
              variant="outline"
              className="min-w-[40px] bg-white text-blue-500 border-blue-500 hover:bg-blue-50"
            >
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2 space-y-1">
            {moreSizes.map((pageSize) => (
              <Button
                key={pageSize}
                variant={
                  table.getState().pagination.pageSize === pageSize
                    ? "default"
                    : "outline"
                }
                size="sm"
                onClick={() => table.setPageSize(Number(pageSize))}
                className={`w-full justify-start ${
                  table.getState().pagination.pageSize === pageSize
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "hover:bg-blue-50"
                }`}
              >
                {pageSize}
              </Button>
            ))}
          </PopoverContent>
        </Popover>
      </div>

      {/* Data count display */}
      <div className="text-sm text-gray-600">
        Showing {startItem}-{endItem} of {totalRows}{" "}
        {totalRows === 1 ? "entry" : "entries"}
      </div>

      {/* Pagination navigation buttons */}
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
          className="bg-white hover:bg-gray-50"
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="bg-white hover:bg-gray-50"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center space-x-1 text-sm">
          <span>Page</span>
          <Input
            type="number"
            min="1"
            max={totalPages}
            value={pageInputValue}
            onChange={(e) => handlePageInputChange(e.target.value)}
            onKeyPress={handleKeyPress}
            onKeyDown={handleKeyDown}
            onBlur={handlePageInputSubmit}
            className="w-16 h-8 text-center border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
          <span>of {totalPages}</span>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="bg-white hover:bg-gray-50"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
          className="bg-white hover:bg-gray-50"
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function DropdownMenuCheckboxItem({
  children,
  checked,
  onCheckedChange,
  ...props
}: {
  children: React.ReactNode;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <DropdownMenuItem
      className="flex items-center gap-2"
      onSelect={(e) => e.preventDefault()}
      {...props}
    >
      <Checkbox checked={checked} onCheckedChange={onCheckedChange} />
      {children}
    </DropdownMenuItem>
  );
}
