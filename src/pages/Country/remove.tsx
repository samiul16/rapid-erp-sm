/* eslint-disable @typescript-eslint/no-explicit-any */
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
  Import,
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
import { EditableStatusCell } from "./EditableStatusCell";
import { useTranslation } from "react-i18next";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import ImportModal from "./ImportModal";
import { ExportComponent } from "./ListExportComponent";
import FilterComponent from "./ListFilterComponent";

type Country = {
  id: string;
  title: string;
  code: string;
  callingCode: string;
  rating: number;
  status: "active" | "inactive" | "pending";
  createdAt: string;
  currency: string;
};

const mockCountries = [
  {
    id: "0",
    title: "Bangladesh",
    code: "BD",
    callingCode: "+880",
    rating: 4,
    status: "active",
    createdAt: "2023-01-15",
    currency: "USD",
  },
  {
    id: "1",
    title: "United States",
    code: "US",
    callingCode: "+1",
    rating: 4,
    status: "active",
    createdAt: "2023-01-15",
    currency: "USD",
  },
  {
    id: "2",
    title: "Canada",
    code: "CA",
    callingCode: "+1",
    rating: 5,
    status: "active",
    createdAt: "2023-02-20",
    currency: "CAD",
  },
  {
    id: "3",
    title: "United Kingdom",
    code: "UK",
    callingCode: "+44",
    rating: 4,
    status: "pending",
    createdAt: "2023-03-10",
    currency: "GBP",
  },
  {
    id: "4",
    title: "Japan",
    code: "JP",
    callingCode: "+81",
    rating: 3,
    status: "active",
    createdAt: "2023-04-05",
    currency: "JPY",
  },
  {
    id: "5",
    title: "Germany",
    code: "DE",
    callingCode: "+49",
    rating: 4,
    status: "inactive",
    createdAt: "2023-05-12",
    currency: "EUR",
  },
  {
    id: "6",
    title: "France",
    code: "FR",
    callingCode: "+33",
    rating: 3,
    status: "active",
    createdAt: "2023-06-18",
    currency: "EUR",
  },
  {
    id: "7",
    title: "Australia",
    code: "AU",
    callingCode: "+61",
    rating: 5,
    status: "pending",
    createdAt: "2023-07-22",
    currency: "AUD",
  },
  {
    id: "8",
    title: "Brazil",
    code: "BR",
    callingCode: "+55",
    rating: 2,
    status: "inactive",
    createdAt: "2023-08-30",
    currency: "BRL",
  },
  {
    id: "9",
    title: "India",
    code: "IN",
    callingCode: "+91",
    rating: 3,
    status: "active",
    createdAt: "2023-09-05",
    currency: "INR",
  },
  {
    id: "10",
    title: "China",
    code: "CN",
    callingCode: "+86",
    rating: 4,
    status: "active",
    createdAt: "2023-10-15",
    currency: "CNY",
  },
];

export default function CountryDataTable({
  viewMode,
  setViewMode,
}: {
  viewMode: "grid" | "list";
  setViewMode: (viewMode: "grid" | "list") => void;
}) {
  const [data, setData] = useState<Country[]>(mockCountries as Country[]);
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
  const tableRef = useRef<HTMLTableElement>(null);
  const [open, setOpen] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useTranslation();

  const columns = useMemo<ColumnDef<Country>[]>(
    () => [
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
        size: 40,
      },
      {
        accessorKey: "title",
        header: ({ column }) => (
          <ColumnFilterHeader
            column={column}
            title="Title"
            options={[...new Set(data.map((item) => item.title))]}
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
          />
        ),
        filterFn: (row, columnId, filterValue) => {
          if (!filterValue || filterValue.length === 0) return true;
          const cellValue = row.getValue(columnId) as string;
          return filterValue.some((filterVal: string) =>
            cellValue.toLowerCase().includes(filterVal.toLowerCase())
          );
        },
      },
      {
        accessorKey: "code",
        header: ({ column }) => (
          <ColumnFilterHeader
            column={column}
            title="Code"
            options={[...new Set(data.map((item) => item.code))]}
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
          />
        ),
        filterFn: (row, columnId, filterValue) => {
          if (!filterValue || filterValue.length === 0) return true;
          const cellValue = row.getValue(columnId) as string;
          return filterValue.includes(cellValue);
        },
      },
      {
        accessorKey: "callingCode",
        header: ({ column }) => (
          <ColumnFilterHeader
            column={column}
            title="Calling Code"
            options={[...new Set(data.map((item) => item.callingCode))]}
          />
        ),
        cell: (info) => (
          <EditableStatusCell
            info={info}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ),
        filterFn: (row, columnId, filterValue) => {
          if (!filterValue || filterValue.length === 0) return true;
          const cellValue = row.getValue(columnId) as string;
          return filterValue.includes(cellValue);
        },
      },
      {
        accessorKey: "status",
        header: ({ column }) => (
          <ColumnFilterHeader
            column={column}
            title="Status"
            options={[...new Set(data.map((item) => item.status))]}
          />
        ),
        cell: (info) => (
          <EditableStatusCell
            info={info}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ),
        filterFn: (row, columnId, filterValue) => {
          if (!filterValue || filterValue.length === 0) return true;
          const cellValue = row.getValue(columnId) as string;
          return filterValue.includes(cellValue);
        },
      },
      {
        accessorKey: "createdAt",
        header: ({ column }) => (
          <ColumnFilterHeader
            column={column}
            title="Created"
            options={[...new Set(data.map((item) => item.createdAt))]}
          />
        ),
        cell: (info) =>
          new Date(info.getValue() as string).toLocaleDateString(),
        filterFn: (row, columnId, filterValue) => {
          if (!filterValue || filterValue.length === 0) return true;
          const cellValue = new Date(row.getValue(columnId) as string)
            .toISOString()
            .split("T")[0];
          return filterValue.includes(cellValue);
        },
        sortingFn: "datetime",
      },
      {
        id: "actions",
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
      },
    ],
    [data, editingCell, editValue]
  );

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

    // ✅ Add these for checkbox filter options to show up
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const [columnSearch, setColumnSearch] = useState("");
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
  }, []);

  const isCellSelected = (rowIndex: number, columnId: string) => {
    return (
      selectedCell.rowIndex === rowIndex && selectedCell.columnId === columnId
    );
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      console.log("selectedCell", selectedCell.columnId, selectedCell.rowIndex);
      if (selectedCell.rowIndex === -1 || !selectedCell.columnId) return;

      const rows = table.getRowModel().rows;
      const columnIds = table.getAllColumns().map((col) => col.id);
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
        default:
          return;
      }

      setSelectedCell({
        rowIndex: newRowIndex,
        columnId: columnIds[newColumnIndex],
      });
    },
    [selectedCell, table]
  );

  useEffect(() => {
    const tableElement = tableRef.current as HTMLTableElement;
    if (tableElement) {
      tableElement.addEventListener("keydown", handleKeyDown);
      return () => {
        tableElement.removeEventListener("keydown", handleKeyDown);
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
    <div className="px-4 py-3 h-full flex flex-col">
      <div className="pb-4">
        <div className="grid grid-cols-12 gap-4 items-center">
          {/* Left column - View toggle, Import, and Bulk actions */}
          <div className="col-span-4 flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              className="gap-2 cursor-pointer"
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
              className="gap-2 cursor-pointer"
              onClick={() => setOpen(true)}
            >
              <Import className="h-4 w-4" />
              <span className="hidden sm:inline">{t("common.import")}</span>
            </Button>

            <ImportModal open={open} onClose={() => setOpen(false)} />

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
                  className="disabled:opacity-500 cursor-pointer"
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
            <div className="w-full max-w-md">
              <div className="relative flex items-center rounded-full">
                <Search className="absolute left-3 h-4 w-4 text-gray-400 text-blue-500" />
                <Input
                  placeholder="Search countries..."
                  className="pl-9 pr-9 w-full rounded-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-2 h-6 w-6 rounded-full cursor-pointer p-0"
                >
                  <Mic className="h-4 w-4  text-blue-400" />
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
            {/* Export Dropdown */}

            <Button
              variant="outline"
              className={`gap-2 cursor-pointer hover:bg-blue-400 hover:text-white ${
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
              className="gap-2 cursor-pointer hover:bg-blue-400 hover:text-white"
              onClick={() => {
                setShowFilter(!showFilter);
                setShowExport(false);
              }}
            >
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">{t("common.filters")}</span>
            </Button>

            {/* Columns visibility dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 cursor-pointer hover:bg-blue-400 hover:text-white"
                >
                  Visibility
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-72 h-[200px] flex flex-col p-0 overflow-hidden"
              >
                {/* Fixed Top Section */}
                <div className="sticky top-0 bg-white dark:bg-gray-900 z-10 border-b px-3 py-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 flex-1">
                      <Checkbox
                        id="select-all-columns"
                        checked={allColumnsVisible}
                        onCheckedChange={(checked) => {
                          table
                            .getAllColumns()
                            .filter(
                              (col) =>
                                col.getCanHide() &&
                                col.id !== "select" &&
                                col.id !== "actions"
                            )
                            .forEach((col) => col.toggleVisibility(!!checked));
                          setAllColumnsVisible(!!checked);
                        }}
                      />
                      <div className="relative flex-1">
                        <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                          placeholder="Search columns..."
                          className="pl-8 h-8 w-full"
                          value={columnSearch}
                          onChange={(e) => setColumnSearch(e.target.value)}
                        />
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 ml-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        setColumnSearch("");
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Scrollable Middle Section */}
                <div className="flex-1 overflow-y-auto px-1 py-1">
                  {table
                    .getAllColumns()
                    .filter(
                      (column) =>
                        column.getCanHide() &&
                        column.id !== "select" &&
                        column.id !== "actions" &&
                        (!columnSearch ||
                          column.id
                            .toLowerCase()
                            .includes(columnSearch.toLowerCase()))
                    )
                    .map((column) => (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) => {
                          column.toggleVisibility(!!value);
                          // Update select all state
                          const visibleColumns = table
                            .getAllColumns()
                            .filter(
                              (col) =>
                                col.getCanHide() &&
                                col.id !== "select" &&
                                col.id !== "actions"
                            )
                            .filter((col) => col.getIsVisible());
                          setAllColumnsVisible(
                            visibleColumns.length ===
                              table
                                .getAllColumns()
                                .filter(
                                  (col) =>
                                    col.getCanHide() &&
                                    col.id !== "select" &&
                                    col.id !== "actions"
                                ).length
                          );
                        }}
                        // className="px-3 py-1.5" // Added padding for better touch targets
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    ))}
                </div>

                {/* Fixed Bottom Section */}
                <div className="sticky bottom-0 bg-white dark:bg-gray-900 z-10 border-t px-3 py-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-center text-blue-500 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-gray-800"
                    onClick={() => {
                      table
                        .getAllColumns()
                        .filter(
                          (col) =>
                            col.getCanHide() &&
                            col.id !== "select" &&
                            col.id !== "actions"
                        )
                        .forEach((col) => col.toggleVisibility(true));
                      setAllColumnsVisible(true);
                      setColumnSearch("");
                    }}
                  >
                    Reset All
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex overflow-hidden">
          {/* Table container with horizontal scrolling */}
          <div className="flex-1 overflow-auto">
            <div ref={tableRef} className="relative h-full min-w-full">
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full dark:bg-gray-900">
                  {/* Fixed header */}
                  <thead className="bg-gray-50 dark:bg-gray-900 sticky top-0 z-10">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <th
                            key={header.id}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky top-0"
                            style={{
                              width: header.getSize(),
                              cursor: header.column.getCanSort()
                                ? "pointer"
                                : "default",
                              backgroundColor: "inherit", // Ensures sticky header background matches
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

                  {/* Scrollable body */}
                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900">
                    {table.getRowModel().rows.map((row) => (
                      <tr
                        key={row.id}
                        className={`group ${
                          row.getIsSelected()
                            ? "bg-gray-100 dark:bg-gray-800"
                            : ""
                        }`}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td
                            key={cell.id}
                            className={`px-6 py-4 whitespace-nowrap ${
                              isCellSelected(row.index, cell.column.id)
                                ? "ring-2 ring-blue-500 ring-inset bg-blue-50"
                                : "hover:bg-gray-100 dark:hover:bg-gray-800"
                            }`}
                            data-row-id={row.id}
                            data-col-id={cell.column.id}
                            onClick={() =>
                              handleCellClick(row.index, cell.column.id)
                            }
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
            </div>
          </div>
        </div>
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
      </div>

      <div className="sticky bottom-0 bg-white dark:bg-gray-900 pt-2 border-t max-w-[calc(100%-300px)]">
        <PaginationControls table={table} />
      </div>
    </div>
  );
}

// Update the ColumnFilterHeader component
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

  // Initialize selected options from current filter
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
      column.toggleSorting(true); // Set to desc
    } else {
      column.toggleSorting(false); // Set to asc
    }
  };

  const filteredOptions = options.filter((option) =>
    option.toString().toLowerCase().includes(filterValue.toLowerCase())
  );

  return (
    <div className="flex items-center gap-1 group">
      <span>{title}</span>

      {/* Single sorting button that toggles direction */}
      <button
        onClick={toggleSorting}
        className={`p-1 rounded transition-opacity ${
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

      {/* Filter button - always show when active or menu open, otherwise on hover */}
      <div
        className={`${
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
            {/* Search Input */}
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
        <span className="ml-1 text-xs text-blue-500">
          {selectedOptions.length} selected
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
}: {
  info: any;
  editingCell: { rowId: string; columnId: string } | null;
  setEditingCell: React.Dispatch<
    React.SetStateAction<{ rowId: string; columnId: string } | null>
  >;
  editValue: any;
  setEditValue: React.Dispatch<React.SetStateAction<any>>;
  handleEdit: (rowId: string, columnId: string, value: any) => void;
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
    if (e.key === "Enter") {
      handleEdit(info.row.id, info.column.id, editValue);
      focusNextCell(info.row.id, info.column.id);
    }
    if (e.key === "Escape") {
      setEditingCell(null);
    }
    if (e.key === "ArrowRight") {
      handleEdit(info.row.id, info.column.id, editValue);
      focusNextCell(info.row.id, info.column.id);
    }
    if (e.key === "ArrowLeft") {
      handleEdit(info.row.id, info.column.id, editValue);
      focusPreviousCell(info.row.id, info.column.id);
    }
  };

  const focusNextCell = (rowId: string, columnId: string) => {
    const columnsOrder = [
      "select",
      "title",
      "code",
      "rating",
      "status",
      "createdAt",
      "actions",
    ];
    const currentIndex = columnsOrder.indexOf(columnId);
    const nextColumnId = columnsOrder[currentIndex + 1] || columnsOrder[0];

    // If we're at the last column, move to first column of next row
    if (currentIndex === columnsOrder.length - 1) {
      const nextRow = document.querySelector(
        `[data-row-id="${parseInt(rowId) + 1}"]`
      );
      if (nextRow) {
        const firstCell = nextRow.querySelector(
          `[data-col-id="${columnsOrder[0]}"]`
        );
        if (firstCell) {
          (firstCell as HTMLElement).click();
        }
      }
    } else {
      const nextCell = document.querySelector(
        `[data-row-id="${rowId}"] [data-col-id="${nextColumnId}"]`
      );
      if (nextCell) {
        (nextCell as HTMLElement).click();
      }
    }
  };

  const focusPreviousCell = (rowId: string, columnId: string) => {
    const columnsOrder = [
      "select",
      "title",
      "code",
      "rating",
      "status",
      "createdAt",
      "actions",
    ];
    const currentIndex = columnsOrder.indexOf(columnId);
    const prevColumnId =
      currentIndex > 0
        ? columnsOrder[currentIndex - 1]
        : columnsOrder[columnsOrder.length - 1];

    // If we're at the first column, move to last column of previous row
    if (currentIndex === 0) {
      const prevRow = document.querySelector(
        `[data-row-id="${parseInt(rowId) - 1}"]`
      );
      if (prevRow) {
        const lastCell = prevRow.querySelector(
          `[data-col-id="${columnsOrder[columnsOrder.length - 1]}"]`
        );
        if (lastCell) {
          (lastCell as HTMLElement).click();
        }
      }
    } else {
      const prevCell = document.querySelector(
        `[data-row-id="${rowId}"] [data-col-id="${prevColumnId}"]`
      );
      if (prevCell) {
        (prevCell as HTMLElement).click();
      }
    }
  };

  // Function to get flag from country code
  const getFlagImage = (countryCode: string) => {
    if (!countryCode) return null;
    // Convert to lowercase for the URL
    const code = countryCode.toLowerCase();
    return `https://flagcdn.com/16x12/${code}.png`;
    // For higher resolution: `https://flagcdn.com/32x24/${code}.png`
    // For SVG: `https://flagcdn.com/${code}.svg`
  };

  if (isEditing) {
    return (
      <Input
        ref={inputRef}
        type={info.column.id === "rating" ? "number" : "text"}
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => handleEdit(info.row.id, info.column.id, editValue)}
        className="h-8 w-full"
      />
    );
  }

  return (
    <div
      className="cursor-pointer hover:bg-gray-100 p-1 rounded min-h-[32px] flex items-center dark:bg-gray-900"
      onClick={() => {
        setEditingCell({ rowId: info.row.id, columnId: info.column.id });
        setEditValue(info.getValue());
      }}
    >
      {/* Add flag before country name for title column */}
      {info.column.id === "title" && info.row.original.code && (
        <img
          src={getFlagImage(info.row.original.code) || ""}
          alt={`${info.getValue()} flag`}
          className="w-5 h-4 mr-2 object-contain"
          loading="lazy" // Optional: lazy loading
          onError={(e) => {
            // Fallback in case the flag doesn't exist
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      )}
      {info.getValue()}
    </div>
  );
}

function PaginationControls({ table }: { table: any }) {
  const defaultSizes = [5, 10, 20];
  const moreSizes = [30, 40, 50, 100, 200];

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
                : "bg-white text-blue-500 border-blue-500 hover:bg-blue-600"
            }`}
          >
            {pageSize}
          </Button>
        ))}

        {/* More page sizes popup */}
        <Popover>
          <PopoverTrigger asChild>
            <Button size="sm" variant="outline" className="min-w-[40px]">
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
                    ? "bg-white text-blue-500 border-blue-500 hover:bg-white hover:text-blue-600"
                    : ""
                }`}
              >
                {pageSize}
              </Button>
            ))}
          </PopoverContent>
        </Popover>
      </div>

      {/* Pagination navigation buttons */}
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="px-3 py-1 text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
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
