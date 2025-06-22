/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

interface FilterComponentProps {
  table: any; // TanStack table instance
  setShowFilter: (visible: boolean) => void;
}

export default function FilterComponent({
  table,
  setShowFilter,
}: FilterComponentProps) {
  const [search, setSearch] = useState("");

  // Filter columns with faceted values and are filterable
  const filterableColumns = table
    .getAllColumns()
    .filter(
      (col: any) =>
        col.getCanFilter() &&
        col.getFacetedUniqueValues &&
        col.id !== "select" &&
        col.id !== "actions"
    );

  // Reset all filters
  const resetFilters = () => {
    filterableColumns.forEach((col: any) => {
      col.setFilterValue(undefined);
    });
    setSearch("");
  };

  return (
    <div className="w-72 h-[302px] flex flex-col border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b px-3 py-2">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search filters..."
              className="pl-8 h-8 w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => {
              setSearch("");
              setShowFilter(false);
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-4">
        {filterableColumns
          .filter((col: any) => {
            const values = [...col.getFacetedUniqueValues().keys()].map((v) =>
              String(v)
            );
            return (
              col.id.toLowerCase().includes(search.toLowerCase()) ||
              values.some((val) =>
                val.toLowerCase().includes(search.toLowerCase())
              )
            );
          })
          .map((col: any) => {
            const selected = Array.isArray(col.getFilterValue())
              ? col.getFilterValue()
              : [];

            const options = [...col.getFacetedUniqueValues().entries()].filter(
              ([key]) =>
                key !== undefined &&
                String(key).toLowerCase().includes(search.toLowerCase())
            );

            const allChecked =
              options.length > 0 &&
              selected.length > 0 &&
              options.every(([val]) => selected.includes(val));

            return (
              <div key={col.id}>
                {/* Column header as parent */}
                <div className="flex items-center gap-2 font-medium mb-1">
                  <Checkbox
                    checked={allChecked}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        col.setFilterValue(options.map(([val]) => val));
                      } else {
                        col.setFilterValue([]);
                      }
                    }}
                  />
                  {col.id}
                </div>

                {/* Children */}
                <div className="ml-4 space-y-1">
                  {options.map(([value, count]) => (
                    <div
                      key={String(value)}
                      className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded px-2 py-1"
                    >
                      <Checkbox
                        checked={selected.includes(value)}
                        onCheckedChange={(checked) => {
                          const newValues = new Set(selected);
                          if (checked) newValues.add(value);
                          else newValues.delete(value);
                          col.setFilterValue([...newValues]);
                        }}
                      />
                      <span className="text-sm">
                        {String(value)} ({count})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
      </div>

      {/* Footer */}
      <div className="bg-white dark:bg-gray-900 border-t px-3 py-2">
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-gray-800"
            onClick={resetFilters}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
