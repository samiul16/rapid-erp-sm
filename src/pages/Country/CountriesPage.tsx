import { useState } from "react";
import { Button } from "@/components/ui/button";
// import SummaryCards from "./SummaryCards";
import CountryGrid from "./CountriesGrid";
// import CountryDataTable from "./CountryDataTable";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CountryDataTable2 from "./CountryDataTable2";
import GmailTabs from "@/components/common/TableTabs";
import VerticalSummaryCards from "./VerticalSummaryCards";
import VideoModal from "@/components/common/VideoModal";
import video from "@/assets/videos/test.mp4";
// import { useGetCountriesQuery } from "@/store/api/countriesApi";
// import { useGetAllRestaurantDataQuery } from "@/store/api/restaurantApi";

export default function CountryPage() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("grid");
  const { t } = useTranslation();

  const [dataTableFilter, setDataTableFilter] = useState({});

  // Mock data - replace with real data from your API
  const summaryData = {
    total: 42,
    draft: 5,
    active: 30,
    inactive: 5,
    deleted: 2,
    updated: 2,
  };

  return (
    <div className=" w-100vw px-2 py-4 dark:bg-gray-900">
      {/* Header Section */}
      <div className="flex items-center gap-4 mb-4">
        <VideoModal src={video} header={"Rapid ERP Video"} />
        <h1 className="text-2xl font-bold flex-1 text-primary">Countries</h1>
        <Button
          className="bg-primary text-white rounded-full cursor-pointer"
          onClick={() => navigate("/countries/create")}
        >
          <span className="hidden sm:inline">{t("button.create")}</span>
          <span className="sm:hidden">{t("button.create")}</span>
        </Button>
      </div>

      {viewMode === "grid" ? (
        <VerticalSummaryCards data={summaryData} />
      ) : (
        <GmailTabs
          dataTableFilter={dataTableFilter}
          setDataTableFilter={setDataTableFilter}
        />
      )}

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
      {/* <div className="mt-4 h-[62vh] overflow-y-auto overflow-x-hidden border rounded-lg scroll-smooth [scrollbar-gutter:stable]"> */}
      {viewMode === "grid" ? (
        <div className="mt-4 h-[calc(100vh-420px)] md:h-[calc(100vh-420px)] lg:h-[calc(100vh-420px)] xl:h-[calc(100vh-420px)] overflow-y-auto overflow-x-hidden border rounded-lg scroll-smooth [scrollbar-gutter:stable]">
          <CountryGrid setViewMode={setViewMode} />
        </div>
      ) : (
        <div className="mt-4 h-[calc(100vh-270px)] md:h-[calc(100vh-270px)] lg:h-[calc(100vh-270px)] xl:h-[calc(100vh-270px)] overflow-y-auto overflow-x-hidden border rounded-lg scroll-smooth [scrollbar-gutter:stable]">
          <CountryDataTable2
            viewMode={viewMode}
            setViewMode={setViewMode}
            dataTableFilter={dataTableFilter}
          />
        </div>
      )}
      {/* </div> */}
    </div>
  );
}
