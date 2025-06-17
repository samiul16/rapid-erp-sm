/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo, useEffect, useRef } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
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

type Country = {
  id: string;
  title: string;
  code: string;
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
    rating: 4,
    status: "active",
    createdAt: "2023-01-15",
    currency: "USD",
  },
  {
    id: "1",
    title: "United States",
    code: "US",
    rating: 4,
    status: "active",
    createdAt: "2023-01-15",
    currency: "USD",
  },
  {
    id: "2",
    title: "Canada",
    code: "CA",
    rating: 5,
    status: "active",
    createdAt: "2023-02-20",
    currency: "CAD",
  },
  {
    id: "3",
    title: "United Kingdom",
    code: "UK",
    rating: 4,
    status: "pending",
    createdAt: "2023-03-10",
    currency: "GBP",
  },
  {
    id: "4",
    title: "Japan",
    code: "JP",
    rating: 3,
    status: "active",
    createdAt: "2023-04-05",
    currency: "JPY",
  },
  {
    id: "5",
    title: "Germany",
    code: "DE",
    rating: 4,
    status: "inactive",
    createdAt: "2023-05-12",
    currency: "EUR",
  },
  {
    id: "6",
    title: "France",
    code: "FR",
    rating: 3,
    status: "active",
    createdAt: "2023-06-18",
    currency: "EUR",
  },
  {
    id: "7",
    title: "Australia",
    code: "AU",
    rating: 5,
    status: "pending",
    createdAt: "2023-07-22",
    currency: "AUD",
  },
  {
    id: "8",
    title: "Brazil",
    code: "BR",
    rating: 2,
    status: "inactive",
    createdAt: "2023-08-30",
    currency: "BRL",
  },
  {
    id: "9",
    title: "India",
    code: "IN",
    rating: 3,
    status: "active",
    createdAt: "2023-09-05",
    currency: "INR",
  },
  {
    id: "10",
    title: "China",
    code: "CN",
    rating: 4,
    status: "active",
    createdAt: "2023-10-15",
    currency: "CNY",
  },
];

export default function CountryDataTable() {
  const [data, setData] = useState<Country[]>(mockCountries as Country[]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [editingCell, setEditingCell] = useState<{
    rowId: string;
    columnId: string;
  } | null>(null);
  const [editValue, setEditValue] = useState<any>("");
  const [isBulkEditing, setIsBulkEditing] = useState(false);
  const [bulkEditValue, setBulkEditValue] = useState<any>("");
  const [bulkEditColumn, setBulkEditColumn] = useState<string | null>(null);

  const columns = useMemo<ColumnDef<Country>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
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
      },
      {
        accessorKey: "rating",
        header: ({ column }) => (
          <ColumnFilterHeader
            column={column}
            title="Rating"
            options={[1, 2, 3, 4, 5]}
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
      },
      {
        accessorKey: "status",
        header: ({ column }) => (
          <ColumnFilterHeader
            column={column}
            title="Status"
            options={["active", "inactive", "pending"]}
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
      },
      {
        accessorKey: "currency",
        header: ({ column }) => (
          <ColumnFilterHeader
            column={column}
            title="Currency"
            options={["USD", "EUR", "GBP", "JPY", "CAD"]}
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
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDelete(row.original.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        ),
      },
    ],
    [data, editingCell, editValue]
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      rowSelection,
    },
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

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

  const handleDelete = (id: string) => {
    setData((prev) => prev.filter((row) => row.id !== id));
  };

  const handleBulkDelete = () => {
    const selectedIds = Object.keys(rowSelection).map(
      (idx) => data[parseInt(idx)].id
    );
    setData((prev) => prev.filter((row) => !selectedIds.includes(row.id)));
    setRowSelection({});
  };

  const handleBulkUpdate = () => {
    if (!bulkEditColumn) return;

    const selectedIndices = Object.keys(rowSelection).map((idx) =>
      parseInt(idx)
    );
    console.log("selected indices ", selectedIndices);
    setData((prev) =>
      prev.map((row, index) =>
        selectedIndices.includes(index)
          ? { ...row, [bulkEditColumn]: bulkEditValue }
          : row
      )
    );
    setIsBulkEditing(false);
    setBulkEditColumn(null);
    setBulkEditValue("");

    console.log("data after set ", data);
  };

  const selectedRows = table.getSelectedRowModel().rows;

  console.log(
    "selected rows ",
    selectedRows.map((row) => row.original)
  );

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4 ">
        <div className="flex-1">
          {selectedRows.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                {selectedRows.length} selected
              </span>
              <Button variant="outline" size="sm" onClick={handleBulkDelete}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsBulkEditing(true)}
              >
                Bulk Edit
              </Button>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>

      {isBulkEditing && (
        <div className="mb-4 p-4 border rounded-md bg-gray-50">
          <div className="flex items-center space-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Column
              </label>
              <select
                className="border rounded-md p-2"
                value={bulkEditColumn || ""}
                onChange={(e) => setBulkEditColumn(e.target.value)}
              >
                <option value="">Select column</option>
                {table
                  .getAllColumns()
                  .filter(
                    (col) =>
                      col.id !== "select" &&
                      col.id !== "actions" &&
                      col.getCanFilter()
                  )
                  .map((column) => (
                    <option key={column.id} value={column.id}>
                      {column.id}
                    </option>
                  ))}
              </select>
            </div>
            {bulkEditColumn && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Value
                  </label>
                  <Input
                    type={bulkEditColumn === "rating" ? "number" : "text"}
                    value={bulkEditValue}
                    onChange={(e) => setBulkEditValue(e.target.value)}
                    className="w-40"
                  />
                </div>
                <div className="flex items-end space-x-2">
                  <Button size="sm" onClick={handleBulkUpdate}>
                    Apply
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsBulkEditing(false);
                      setBulkEditColumn(null);
                      setBulkEditValue("");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <div className="rounded-md border">
        <table className="w-full dark:bg-gray-900">
          <thead className="bg-gray-50 dark:bg-gray-900">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    style={{ width: header.getSize() }}
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
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

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
  const currentFilter = column.getFilterValue();

  const handleFilterChange = (value: string) => {
    column.setFilterValue(value === "all" ? "" : value);
  };

  const clearFilter = () => {
    column.setFilterValue("");
  };

  return (
    <div className="flex items-center">
      <span>{title}</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="ml-1 h-6 w-6 p-0">
            <Filter className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <div className="p-2">
            <Input
              placeholder={`Search ${title}`}
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              className="h-8"
            />
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleFilterChange("all")}>
            All
          </DropdownMenuItem>
          {options
            .filter((option) =>
              option
                .toString()
                .toLowerCase()
                .includes(filterValue.toLowerCase())
            )
            .map((option) => (
              <DropdownMenuItem
                key={option}
                onClick={() => handleFilterChange(option)}
              >
                {option}
              </DropdownMenuItem>
            ))}
          {currentFilter && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={clearFilter}>
                <X className="mr-2 h-4 w-4" />
                Clear filter
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {currentFilter && (
        <span className="ml-1 text-xs text-blue-500">({currentFilter})</span>
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
      console.log("info ", info);
      handleEdit(info.row.id, info.column.id, editValue);
      // Move to next cell (simple implementation - could be enhanced)
      const nextCell = document.querySelector(
        `[data-row-id="${info.row.id}"] [data-col-id="${getNextColumnId(
          info.column.id
        )}"]`
      );
      if (nextCell) {
        (nextCell as HTMLElement).click();
      }
    }
    if (e.key === "Escape") {
      setEditingCell(null);
    }
  };

  const getNextColumnId = (currentId: string) => {
    const columnsOrder = [
      "select",
      "title",
      "code",
      "rating",
      "status",
      "currency",
      "actions",
    ];
    const currentIndex = columnsOrder.indexOf(currentId);
    return columnsOrder[currentIndex + 1] || columnsOrder[0];
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
      {info.getValue()}
    </div>
  );
}
