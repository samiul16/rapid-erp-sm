/* eslint-disable @typescript-eslint/no-explicit-any */
import { Search, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

interface ExportDropdownProps {
  table: any; // Replace with your table type
  allColumnsVisible: boolean;
  setAllColumnsVisible: (visible: boolean) => void;
  setShowExport: (visible: boolean) => void;
}

export function ExportComponent({
  table,
  allColumnsVisible,
  setAllColumnsVisible,
  setShowExport,
}: ExportDropdownProps) {
  const [exportSearch, setExportSearch] = useState("");

  return (
    <div className="w-72 h-[302px] flex flex-col border rounded-lg overflow-hidden ">
      {/* Top Section */}
      <div className="bg-white dark:bg-gray-900 border-b px-3 py-2">
        <div className="flex items-center gap-2">
          {/* Select All Checkbox */}
          <Checkbox
            checked={allColumnsVisible}
            onCheckedChange={(checked) => {
              table
                .getAllColumns()
                .filter(
                  (col: any) =>
                    col.getCanHide() &&
                    col.id !== "select" &&
                    col.id !== "actions"
                )
                .forEach((col: any) => col.toggleVisibility(!!checked));
              setAllColumnsVisible(!!checked);
            }}
          />

          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search exports..."
              className="pl-8 h-8 w-full"
              value={exportSearch}
              onChange={(e) => setExportSearch(e.target.value)}
            />
          </div>

          {/* Clear Search Button */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={(e) => {
              e.stopPropagation();
              setExportSearch("");
              setShowExport(false);
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
            (column: any) =>
              column.getCanHide() &&
              column.id !== "select" &&
              column.id !== "actions" &&
              (!exportSearch ||
                column.id.toLowerCase().includes(exportSearch.toLowerCase()))
          )
          .map((column: any) => (
            <div
              key={column.id}
              className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
            >
              <Checkbox
                checked={column.getIsVisible()}
                onCheckedChange={(value) => {
                  column.toggleVisibility(!!value);
                  const visibleColumns = table
                    .getAllColumns()
                    .filter(
                      (col: any) =>
                        col.getCanHide() &&
                        col.id !== "select" &&
                        col.id !== "actions"
                    )
                    .filter((col: any) => col.getIsVisible());
                  setAllColumnsVisible(
                    visibleColumns.length ===
                      table
                        .getAllColumns()
                        .filter(
                          (col: any) =>
                            col.getCanHide() &&
                            col.id !== "select" &&
                            col.id !== "actions"
                        ).length
                  );
                }}
              />
              <span>{column.id}</span>
            </div>
          ))}
      </div>

      {/* Bottom Section */}
      <div className="bg-white dark:bg-gray-900 border-t px-3 py-2">
        <div className="flex items-center justify-between">
          {/* Export Options */}
          <div className="flex gap-4">
            <button
              className="text-blue-600 hover:underline text-sm cursor-pointer"
              onClick={() => console.log("Print clicked")}
            >
              Print
            </button>
            <button
              className="text-blue-600 hover:underline text-sm cursor-pointer"
              onClick={() => console.log("XLS clicked")}
            >
              XLS
            </button>
            <button
              className="text-blue-600 hover:underline text-sm cursor-pointer"
              onClick={() => console.log("PDF clicked")}
            >
              PDF
            </button>
          </div>

          {/* Reset Button */}
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-gray-800"
            onClick={() => {
              table
                .getAllColumns()
                .filter(
                  (col: any) =>
                    col.getCanHide() &&
                    col.id !== "select" &&
                    col.id !== "actions"
                )
                .forEach((col: any) => col.toggleVisibility(true));
              setAllColumnsVisible(true);
              setExportSearch("");
            }}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ExportComponent;
