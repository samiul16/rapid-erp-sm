/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

interface SimpleFilterProps {
  data: any[];
  setFilteredData: (filtered: any[]) => void;
  setIsExportOpen: (visible: boolean) => void;
}

export default function SimpleFilterComponent({
  data,
  setFilteredData,
  setIsExportOpen,
}: SimpleFilterProps) {
  const [search, setSearch] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(
    new Set()
  );

  const filterableFields = useMemo(() => {
    if (data.length === 0) return [];
    // Return string fields (exclude id or non-string if needed)
    return Object.keys(data[0]).filter((key) => key !== "id");
  }, [data]);

  const resetFilters = () => {
    setSelectedFilters(new Set());
    setSearch("");
  };

  const applyFilters = () => {
    if (selectedFilters.size === 0) {
      setFilteredData(data);
    } else {
      const filtered = data.filter((row) => {
        return Array.from(selectedFilters).some((key) => {
          const value = row[key];
          return value !== undefined && value !== null;
        });
      });
      setFilteredData(filtered);
    }
    setIsExportOpen(false);
  };

  const handleCheckboxChange = (key: string, checked: boolean | string) => {
    setSelectedFilters((prev) => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(key);
      } else {
        newSet.delete(key);
      }
      return newSet;
    });
  };

  return (
    <div className="w-72 h-[100vh] flex flex-col border rounded-lg overflow-hidden bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="border-b px-3 py-2">
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
              setIsExportOpen(false);
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2">
        {filterableFields
          .filter((key) => key.toLowerCase().includes(search.toLowerCase()))
          .map((key) => (
            <div
              key={key}
              className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded px-2 py-1"
            >
              <Checkbox
                id={`filter-${key}`}
                checked={selectedFilters.has(key)}
                onCheckedChange={(checked) =>
                  handleCheckboxChange(key, checked)
                }
                className="data-[state=checked]:bg-blue-500 data-[state=checked]:text-white"
              />
              <label htmlFor={`filter-${key}`} className="text-sm font-medium">
                {key}
              </label>
            </div>
          ))}
      </div>

      {/* Footer */}
      <div className="border-t px-3 py-2">
        <div className="flex justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-gray-800"
            onClick={resetFilters}
          >
            Reset
          </Button>
          <Button variant="default" size="sm" onClick={applyFilters}>
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
}
