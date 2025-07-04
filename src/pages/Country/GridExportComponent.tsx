/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from "react";
import {
  Download,
  FileSpreadsheet,
  FileText,
  Printer,
  Search,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { exportToCSV } from "@/lib/exportToCSV";
import { exportToExcel } from "@/lib/exportToExcel";
import { pdf } from "@react-pdf/renderer";
import StatePDF from "@/components/common/CountryPDF";
import { toastError } from "@/lib/toast";

interface SimpleFilterProps {
  data: any[];
  setFilteredData: (filtered: any[]) => void;
  setIsExportOpen: (visible: boolean) => void;
}

const mockData = [
  {
    name: "Bangladesh",
    code: "BD",
    currency: "BDT",
    status: "active",
    created_at: "2024-06-01",
  },
  {
    name: "India",
    code: "IN",
    currency: "INR",
    status: "active",
    created_at: "2024-06-02",
  },
];

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

  const handleCSV = () => exportToCSV(mockData, "countries.csv");
  const handleExcel = () => exportToExcel(mockData, "countries.xlsx");
  const handleExport = async () => {
    console.log("Export clicked");
    try {
      const blob = await pdf(
        <StatePDF
          exportableDataList={[
            {
              code: "BD",
              name: "Bangladesh",
              name_in_bangla: "বাংলাদেশ",
              name_in_arabic: "البنغلاديش",
              created_at: "2025-06-26T12:00:00.000Z",
              updated_at: "2025-06-26T12:00:00.000Z",
              deleted_at: null,
              drafted_at: null,
              is_active: true,
              is_draft: false,
              is_deleted: false,
              flag_url: "https://flagcdn.com/16x12/bd.png",
              country_code: "BD",
              country_name: "Bangladesh",
              country_flag: "🇧🇩",
              description: "The central business district of the city",
              is_default: true,
              is_drafted: false,
            },
          ]}
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "countries-summary.pdf";
      a.click();
      console.log("a", a);
      console.log("url", url);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating PDF");
    }
  };

  return (
    <div className="w-76 h-[100vh] flex flex-col border rounded-lg overflow-hidden bg-white dark:bg-gray-900">
      {/* Top Bar - Full Width */}
      <div className="border-b px-3 py-2 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="relative flex-1 rounded-full">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search..."
              className="pl-8 h-8 w-full rounded-full"
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

      {/* Middle Section - 2 Sections */}
      <div className="flex-1 flex overflow-y-auto">
        {/* Left Section - Checkboxes */}
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
                  className="data-[state=checked]:text-white"
                />
                <label
                  htmlFor={`filter-${key}`}
                  className="text-sm font-medium"
                >
                  {key}
                </label>
              </div>
            ))}
        </div>

        {/* Right Section - Export Options */}
        <div className="w-20 border-l bg-gray-50 dark:bg-gray-800 flex flex-col items-center py-3 gap-2 flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="w-14 h-14 rounded-full bg-gray-100 border-2 border-primary hover:scale-110 transition-all"
            title="Print"
            onClick={() => console.log("Print clicked")}
          >
            <Printer className="h-5 w-5 text-primary group-hover:text-white transition-colors" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-14 h-14 rounded-full bg-gray-100 dark:hover:bg-gray-700 border-2 border-primary hover:scale-110 transition-all"
            title="Export to Excel"
            onClick={() => handleExcel()}
          >
            <FileSpreadsheet className="h-5 w-5 text-primary" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-14 h-14 rounded-full bg-gray-100 dark:hover:bg-gray-700 border-2 border-primary hover:scale-110 transition-all"
            title="Export to PDF"
            onClick={() => handleExport()}
          >
            <FileText className="h-5 w-5 text-primary" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-14 h-14 rounded-full bg-gray-100 dark:hover:bg-gray-700 border-2 border-primary hover:scale-110 transition-all"
            title="Export to CSV"
            onClick={() => handleCSV()}
          >
            <Download className="h-5 w-5 text-primary" />
          </Button>
        </div>
      </div>

      {/* Bottom Bar - Full Width */}
      <div className="border-t px-3 py-2 flex-shrink-0">
        <div className="flex justify-between">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full"
            onClick={resetFilters}
          >
            Reset
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full"
            onClick={applyFilters}
          >
            Export
          </Button>
        </div>
      </div>
    </div>
  );
}
