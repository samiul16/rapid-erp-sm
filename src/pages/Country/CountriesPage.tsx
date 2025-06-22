import { useState } from "react";
import { Button } from "@/components/ui/button";
import SummaryCards from "./SummaryCards";
import CountryGrid from "./CountriesGrid";
import CountryDataTable from "./CountryDataTable";
import YoutubeButton from "@/components/common/YoutubeButton";
import { useTranslation } from "react-i18next";

export default function CountryPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { t } = useTranslation();

  // Mock data - replace with real data from your API
  const summaryData = {
    total: 42,
    draft: 5,
    active: 30,
    inactive: 5,
    deleted: 2,
  };

  // YouTube video ID (the part after 'v=' in the URL)
  const videoId = "PcVAyB3nDD4";

  return (
    <div className="container mx-auto px-4 py-4 dark:bg-gray-900">
      {/* Header Section */}
      <div className="flex items-center gap-4 mb-4">
        <YoutubeButton videoId={videoId} />
        <h1 className="text-2xl font-bold flex-1 text-blue-400">Countries</h1>
        <Button className="bg-blue-400 hover:bg-blue-700 text-white rounded-full cursor-pointer">
          <span className="hidden sm:inline">{t("button.create")}</span>
          <span className="sm:hidden">{t("button.create")}</span>
        </Button>
      </div>

      <SummaryCards data={summaryData} />

      {/* View Controls Section */}
      {/* <div className="mt-8 border-b pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
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

            <Button variant="outline" className="gap-2 cursor-pointer">
              <Import className="h-4 w-4" />
              <span className="hidden sm:inline">{t("common.import")}</span>
            </Button>
          </div>

          <div className="flex-1 max-w-md mx-4">
            <div className="relative flex items-center">
              <Search className="absolute left-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search countries..."
                className="pl-9 pr-9 w-full" // Added right padding for the mic icon
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                variant="outline"
                size="icon"
                className="absolute right-2 h-6 w-6 rounded-full cursor-pointer p-0"
              >
                <Mic className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 cursor-pointer">
                  <Filter className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {t("common.filters")}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Active Countries</DropdownMenuItem>
                <DropdownMenuItem>Inactive Countries</DropdownMenuItem>
                <DropdownMenuItem>Draft Countries</DropdownMenuItem>
                <DropdownMenuItem>Clear Filters</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 cursor-pointer">
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">{t("common.export")}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Export as CSV</DropdownMenuItem>
                <DropdownMenuItem>Export as Excel</DropdownMenuItem>
                <DropdownMenuItem>Export as PDF</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div> */}

      {/* Scrollable Content Area */}
      <div className="mt-4 h-[calc(100vh-350px)] overflow-y-auto overflow-x-hidden border rounded-lg scroll-smooth [scrollbar-gutter:stable]">
        {viewMode === "grid" ? (
          <CountryGrid setViewMode={setViewMode} />
        ) : (
          <CountryDataTable viewMode={viewMode} setViewMode={setViewMode} />
        )}
      </div>
    </div>
  );
}
