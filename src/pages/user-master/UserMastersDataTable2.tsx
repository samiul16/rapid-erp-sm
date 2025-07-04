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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import { useDisclosure } from "@mantine/hooks";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { ExportComponent } from "../Country/ListExportComponent";
import FilterComponent from "../Country/ListFilterComponent";
import ColumnVisibilityPanel from "../Country/ListVisibilityComponent";
import ImportStepper from "@/components/common/ImportStepper";
import { Modal } from "@mantine/core";

type User = {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive" | "pending";
  createdAt: string;
  deletedAt: string | null;
  draftedAt: string | null;
  mobile: string;
  password: string;
  otp: string;
  facebook: string;
  instagram: string;
  linkedin: string;
};

const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    mobile: "+8801777000001",
    email: "john@example.com",
    status: "active",
    password: "pass1234",
    otp: "987654",
    facebook: "https://facebook.com/johndoe",
    instagram: "https://instagram.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
  },
  {
    id: "2",
    name: "Jane Smith",
    mobile: "+8801777000002",
    email: "jane@example.com",
    status: "inactive",
    password: "pass5678",
    otp: "123456",
    facebook: "https://facebook.com/janesmith",
    instagram: "https://instagram.com/janesmith",
    linkedin: "https://linkedin.com/in/janesmith",
  },
  {
    id: "3",
    name: "Alex Johnson",
    mobile: "+8801777000003",
    email: "alex@example.com",
    status: "draft",
    password: "password321",
    otp: "654321",
    facebook: "https://facebook.com/alexjohnson",
    instagram: "https://instagram.com/alexjohnson",
    linkedin: "https://linkedin.com/in/alexjohnson",
  },
  {
    id: "4",
    name: "Maria Garcia",
    mobile: "+8801777000004",
    email: "maria@example.com",
    status: "deleted",
    password: "maria123",
    otp: "111222",
    facebook: "https://facebook.com/mariagarcia",
    instagram: "https://instagram.com/mariagarcia",
    linkedin: "https://linkedin.com/in/mariagarcia",
  },
  {
    id: "5",
    name: "David Lee",
    mobile: "+8801777000005",
    email: "david@example.com",
    status: "updated",
    password: "lee456",
    otp: "789101",
    facebook: "https://facebook.com/davidlee",
    instagram: "https://instagram.com/davidlee",
    linkedin: "https://linkedin.com/in/davidlee",
  },
  {
    id: "6",
    name: "Sophia Khan",
    mobile: "+8801777000006",
    email: "sophia@example.com",
    status: "created",
    password: "sophia789",
    otp: "303112",
    facebook: "https://facebook.com/sophiakhan",
    instagram: "https://instagram.com/sophiakhan",
    linkedin: "https://linkedin.com/in/sophiakhan",
  },
  {
    id: "7",
    name: "Mohammad Ali",
    mobile: "+8801777000007",
    email: "ali@example.com",
    status: "active",
    password: "ali999",
    otp: "990011",
    facebook: "https://facebook.com/mohammadali",
    instagram: "https://instagram.com/mohammadali",
    linkedin: "https://linkedin.com/in/mohammadali",
  },
  {
    id: "8",
    name: "Emily Zhang",
    mobile: "+8801777000008",
    email: "emily@example.com",
    status: "inactive",
    password: "emilypass",
    otp: "565656",
    facebook: "https://facebook.com/emilyzhang",
    instagram: "https://instagram.com/emilyzhang",
    linkedin: "https://linkedin.com/in/emilyzhang",
  },
  {
    id: "9",
    name: "Carlos Mendez",
    mobile: "+8801777000009",
    email: "carlos@example.com",
    status: "draft",
    password: "carlos321",
    otp: "774411",
    facebook: "https://facebook.com/carlosmendez",
    instagram: "https://instagram.com/carlosmendez",
    linkedin: "https://linkedin.com/in/carlosmendez",
  },
  {
    id: "10",
    name: "Fatima Noor",
    mobile: "+8801777000010",
    email: "fatima@example.com",
    status: "active",
    password: "noor2025",
    otp: "882200",
    facebook: "https://facebook.com/fatimanoor",
    instagram: "https://instagram.com/fatimanoor",
    linkedin: "https://linkedin.com/in/fatimanoor",
  },
];

export default function UserDataTable({
  viewMode,
  setViewMode,
}: {
  viewMode: string;
  setViewMode: (viewMode: string) => void;
}) {
  const [data, setData] = useState<User[]>(mockUsers as User[]);
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
  const [showExport, setShowExport] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useTranslation();
  const [showVisibility, setShowVisibility] = useState(false);
  const [modalData] = useState({
    title: "Import User",
    message: <ImportStepper />,
  });
  const [opened, { open: openModal, close: closeModal }] = useDisclosure(false);

  const columns = useMemo<ColumnDef<User>[]>(
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
            className={`${
              table.getIsAllPageRowsSelected() || row.getIsSelected()
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100"
            } transition-opacity`}
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

      // Name column
      {
        accessorKey: "name",
        header: ({ column }) => (
          <ColumnFilterHeader
            column={column}
            title="Name"
            options={[...new Set(data.map((item) => item.name))]}
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
        filterFn: (row, columnId, filterValue) =>
          !filterValue?.length ||
          filterValue.some((val: string) =>
            row
              .getValue(columnId)
              ?.toString()
              .toLowerCase()
              .includes(val.toLowerCase())
          ),
      },

      // Email column
      {
        accessorKey: "email",
        header: ({ column }) => (
          <ColumnFilterHeader
            column={column}
            title="Email"
            options={[...new Set(data.map((item) => item.email))]}
          />
        ),
        cell: (info) => (
          <EditableCell
            {...{
              info,
              editingCell,
              setEditingCell,
              editValue,
              setEditValue,
              handleEdit,
              selectedCell,
              setSelectedCell,
            }}
          />
        ),
        filterFn: (row, columnId, filterValue) =>
          !filterValue?.length ||
          filterValue.some((val: string) =>
            row
              .getValue(columnId)
              ?.toString()
              .toLowerCase()
              .includes(val.toLowerCase())
          ),
      },

      // Mobile column
      {
        accessorKey: "mobile",
        header: ({ column }) => (
          <ColumnFilterHeader
            column={column}
            title="Mobile"
            options={[...new Set(data.map((item) => item.mobile))]}
          />
        ),
        cell: (info) => (
          <EditableCell
            {...{
              info,
              editingCell,
              setEditingCell,
              editValue,
              setEditValue,
              handleEdit,
              selectedCell,
              setSelectedCell,
            }}
          />
        ),
        filterFn: (row, columnId, filterValue) =>
          !filterValue?.length ||
          filterValue.some((val: string) =>
            row
              .getValue(columnId)
              ?.toString()
              .toLowerCase()
              .includes(val.toLowerCase())
          ),
      },

      // Status column
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
          <StatusEditableCell
            {...{
              info,
              editingCell,
              setEditingCell,
              editValue,
              setEditValue,
              handleEdit,
              selectedCell,
              setSelectedCell,
            }}
          />
        ),
        filterFn: (row, columnId, filterValue) =>
          !filterValue?.length || filterValue.includes(row.getValue(columnId)),
      },

      // Facebook
      {
        accessorKey: "facebook",
        header: ({ column }) => (
          <ColumnFilterHeader
            column={column}
            title="Facebook"
            options={[...new Set(data.map((item) => item.facebook))]}
          />
        ),
        cell: (info) => (
          <EditableCell
            {...{
              info,
              editingCell,
              setEditingCell,
              editValue,
              setEditValue,
              handleEdit,
              selectedCell,
              setSelectedCell,
            }}
          />
        ),
        filterFn: (row, columnId, filterValue) =>
          !filterValue?.length ||
          filterValue.some((val: string) =>
            row
              .getValue(columnId)
              ?.toString()
              .toLowerCase()
              .includes(val.toLowerCase())
          ),
      },

      // Instagram
      {
        accessorKey: "instagram",
        header: ({ column }) => (
          <ColumnFilterHeader
            column={column}
            title="Instagram"
            options={[...new Set(data.map((item) => item.instagram))]}
          />
        ),
        cell: (info) => (
          <EditableCell
            {...{
              info,
              editingCell,
              setEditingCell,
              editValue,
              setEditValue,
              handleEdit,
              selectedCell,
              setSelectedCell,
            }}
          />
        ),
        filterFn: (row, columnId, filterValue) =>
          !filterValue?.length ||
          filterValue.some((val: string) =>
            row
              .getValue(columnId)
              ?.toString()
              .toLowerCase()
              .includes(val.toLowerCase())
          ),
      },

      // LinkedIn
      {
        accessorKey: "linkedin",
        header: ({ column }) => (
          <ColumnFilterHeader
            column={column}
            title="LinkedIn"
            options={[...new Set(data.map((item) => item.linkedin))]}
          />
        ),
        cell: (info) => (
          <EditableCell
            {...{
              info,
              editingCell,
              setEditingCell,
              editValue,
              setEditValue,
              handleEdit,
              selectedCell,
              setSelectedCell,
            }}
          />
        ),
        filterFn: (row, columnId, filterValue) =>
          !filterValue?.length ||
          filterValue.some((val: string) =>
            row
              .getValue(columnId)
              ?.toString()
              .toLowerCase()
              .includes(val.toLowerCase())
          ),
      },

      // CreatedAt
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
          if (!filterValue?.length) return true;
          const cellValue = new Date(row.getValue(columnId) as string)
            .toISOString()
            .split("T")[0];
          return filterValue.includes(cellValue);
        },
        sortingFn: "datetime",
      },

      // DeletedAt
      {
        accessorKey: "deletedAt",
        header: ({ column }) => (
          <ColumnFilterHeader
            column={column}
            title="Deleted"
            options={[
              ...new Set(data.map((item) => item.deletedAt).filter(Boolean)),
            ]}
          />
        ),
        cell: (info) =>
          info.getValue()
            ? new Date(info.getValue() as string).toLocaleDateString()
            : "",
        filterFn: (row, columnId, filterValue) => {
          const val = row.getValue(columnId) as string | null;
          const formatted = val
            ? new Date(val).toISOString().split("T")[0]
            : "null";
          return filterValue.includes(formatted);
        },
        sortingFn: "datetime",
      },

      // Actions
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
    [data, editingCell, editValue, selectedCell]
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
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
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
    const tableElement = tableRef.current as HTMLTableElement;
    if (tableElement) {
      tableElement.addEventListener("keydown", handleKeyDown);
      tableElement.setAttribute("tabindex", "0"); // Make table focusable
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

    // Keep the cell selected after editing
    const rowIndex = table
      .getRowModel()
      .rows.findIndex((row) => row.id === rowId);
    if (rowIndex !== -1) {
      setSelectedCell({ rowIndex, columnId });
    }

    // Refocus the table after editing
    setTimeout(() => {
      if (tableRef.current) {
        tableRef.current.focus();
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
              onClick={() => openModal()}
            >
              <Import className="h-4 w-4" />
              <span className="hidden sm:inline">{t("common.import")}</span>
            </Button>

            <Modal
              opened={opened}
              onClose={closeModal}
              title="Import User"
              size="xl"
              overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
              }}
            >
              <div className="pt-5 pb-14 px-5">{modalData.message}</div>
            </Modal>

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
                <Search className="absolute left-3 h-4 w-4 text-blue-500" />
                <Input
                  placeholder="Search..."
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
              className={`gap-2 cursor-pointer hover:bg-blue-400 hover:text-white ${
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

            <Button
              variant="outline"
              size="sm"
              className={`gap-2 cursor-pointer hover:bg-blue-400 hover:text-white ${
                showVisibility ? "bg-blue-400 text-white" : ""
              }`}
              onClick={() => setShowVisibility(true)}
            >
              Visibility
            </Button>
          </div>
        </div>
      </div>
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 overflow-auto">
            <div
              ref={tableRef}
              className="relative h-full min-w-full focus:outline-none"
              tabIndex={0}
            >
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full dark:bg-gray-900">
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
                              backgroundColor: "inherit",
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
                  <tfoot>
                    <tr>
                      <td
                        colSpan={table.getAllColumns().length}
                        className="sticky bottom-0 bg-white dark:bg-gray-900 pt-2 border-t"
                      >
                        <PaginationControls table={table} />
                      </td>
                    </tr>
                  </tfoot>
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
    option?.toString().toLowerCase().includes(filterValue.toLowerCase())
  );

  return (
    <div className="flex items-center gap-1 group">
      <span>{title}</span>

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
        className="h-full w-full border-0 outline-0 focus:ring-0 focus:border-0 p-0 bg-white dark:bg-gray-800"
        style={{
          minHeight: "100%",
          margin: "-1rem -1.5rem",
          padding: "1rem 1.5rem",
          borderRadius: 0,
          width: "calc(100% + 3rem)",
          marginLeft: "-1.5rem",
        }}
      />
    );
  }

  return (
    <div className="cursor-pointer hover:bg-gray-100 p-1 rounded min-h-[32px] flex items-center dark:hover:bg-gray-800">
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
        <SelectTrigger className="w-full border-0 outline-0 focus:ring-0 focus:border-0 p-0 bg-transparent h-auto">
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
