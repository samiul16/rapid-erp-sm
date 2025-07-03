import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Trash2,
  List,
  Import,
  Download,
  Filter,
  Mic,
  Search,
  RefreshCw,
  CheckCircle2,
  Circle,
  Pencil,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import GridFilterComponent from "./GridFilterComponent";
import GridExportComponent from "./GridExportComponent";
import { Modal, Tooltip } from "@mantine/core"; // Import Tooltip from Mantine
import { useDisclosure } from "@mantine/hooks";
import ImportStepperTemp from "@/components/common/IMportTemp";
import { toastSuccess } from "@/lib/toast";

// Mock data - replace with real data from your API
const countries = [
  {
    id: "1",
    name: "United States",
    code: "US",
    status: "active",
    continent: "North America",
    population: "331 million",
    currency: "USD",
    isDeleted: false,
  },
  {
    id: "2",
    name: "Canada",
    code: "CA",
    status: "active",
    continent: "North America",
    population: "38 million",
    currency: "CAD",
    isDeleted: false,
  },
  {
    id: "3",
    name: "Japan",
    code: "JP",
    status: "inactive",
    continent: "Asia",
    population: "125 million",
    currency: "JPY",
    isDeleted: false,
  },
  {
    id: "4",
    name: "Germany",
    code: "DE",
    status: "active",
    continent: "Europe",
    population: "83 million",
    currency: "EUR",
    isDeleted: false,
  },
  {
    id: "5",
    name: "France",
    code: "FR",
    status: "draft",
    continent: "Europe",
    population: "68 million",
    currency: "EUR",
    isDeleted: false,
  },
  {
    id: "6",
    name: "Italy",
    code: "IT",
    status: "active",
    continent: "Europe",
    population: "60 million",
    currency: "EUR",
    isDeleted: false,
  },
  {
    id: "7",
    name: "Spain",
    code: "ES",
    status: "active",
    continent: "Europe",
    population: "47 million",
    currency: "EUR",
    isDeleted: false,
  },
  {
    id: "8",
    name: "Portugal",
    code: "PT",
    status: "active",
    continent: "Europe",
    population: "10 million",
    currency: "EUR",
    isDeleted: false,
  },
  {
    id: "9",
    name: "Switzerland",
    code: "CH",
    status: "active",
    continent: "Europe",
    population: "9 million",
    currency: "EUR",
    isDeleted: false,
  },
  {
    id: "10",
    name: "Netherlands",
    code: "NL",
    status: "active",
    continent: "Europe",
    population: "17 million",
    currency: "EUR",
    isDeleted: false,
  },
  {
    id: "11",
    name: "Belgium",
    code: "BE",
    status: "active",
    continent: "Europe",
    population: "11 million",
    currency: "EUR",
    isDeleted: false,
  },
  {
    id: "12",
    name: "Belgium",
    code: "BE",
    status: "active",
    continent: "Europe",
    population: "11 million",
    currency: "EUR",
    isDeleted: false,
  },
  {
    id: "12",
    name: "Belgium",
    code: "BE",
    status: "active",
    continent: "Europe",
    population: "11 million",
    currency: "EUR",
    isDeleted: false,
  },
  {
    id: "3",
    name: "United Kingdom",
    code: "GB",
    status: "active",
    continent: "Europe",
    population: "67 million",
    currency: "GBP",
    isDeleted: false,
  },
  {
    id: "12",
    name: "Belgium",
    code: "BE",
    status: "active",
    continent: "Europe",
    population: "11 million",
    currency: "EUR",
    isDeleted: false,
  },
  {
    id: "12",
    name: "Belgium",
    code: "BE",
    status: "active",
    continent: "Europe",
    population: "11 million",
    currency: "EUR",
    isDeleted: false,
  },
];

export default function CountriesGrid({
  setViewMode,
}: {
  setViewMode: (viewMode: "grid" | "list") => void;
}) {
  console.log("Countries grid rendered");
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [countriesData, setCountriesData] = useState(countries);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [modalData, setModalData] = useState({
    title: "Import Country",
    message: <ImportStepperTemp />,
  });

  // Infinite scroll states
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [, setPage] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const ITEMS_PER_PAGE = 4;

  // ... (keep all your existing functions: loadMoreData, handleScroll, etc.)
  // Simulate API call to load more data
  const loadMoreData = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const continents = [
      "Europe",
      "Asia",
      "Africa",
      "North America",
      "South America",
      "Oceania",
    ];
    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      name: `Country ${countriesData.length + index + 1}`,
      code: `C${(countriesData.length + index + 1)
        .toString()
        .padStart(2, "0")}`,
      status:
        Math.random() > 0.3
          ? "active"
          : Math.random() > 0.5
          ? "inactive"
          : "draft",
      continent: continents[Math.floor(Math.random() * continents.length)],
      population: `${Math.floor(Math.random() * 100 + 1)} million`,
      currency: "USD",
      isDeleted: false,
    }));

    // Stop loading more after reaching 50 items for demo
    if (countriesData.length >= 46) {
      setHasMore(false);
    } else {
      setCountriesData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [countriesData.length, isLoading, hasMore]);

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const threshold = 100; // Load more when 100px from bottom

    if (scrollHeight - scrollTop <= clientHeight + threshold) {
      loadMoreData();
    }
  }, [loadMoreData]);

  // Add scroll event listener
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleDeleteClick = (countryId: string) => {
    setCountriesData((prevCountries) =>
      prevCountries.map((country) =>
        country.id === countryId
          ? {
              ...country,
              isDeleted: country.isDeleted === true ? false : true,
            }
          : country
      )
    );
  };

  const handleRestoreClick = (countryId: string) => {
    setCountriesData((prevCountries) =>
      prevCountries.map((country) =>
        country.id === countryId
          ? {
              ...country,
              isDeleted: country.isDeleted === true ? false : true,
            }
          : country
      )
    );
  };

  const handleViewModeChange = (viewMode: "grid" | "list") => {
    setViewMode(viewMode);
  };

  const toggleStatus = (countryId: string) => {
    setCountriesData((prevCountries) =>
      prevCountries.map((country) =>
        country.id === countryId
          ? {
              ...country,
              status: country.status === "active" ? "inactive" : "active",
            }
          : country
      )
    );
  };

  // Filter countries based on search query
  const filteredCountries = countriesData.filter(
    (country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.continent.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-4 py-3 h-full flex flex-col bg-white dark:bg-gray-900 parent">
      {/* Fixed header controls - keep existing header */}
      <div className="sticky top-0 z-20 bg-white dark:bg-gray-900 pb-2">
        <div className="grid grid-cols-12 gap-4 items-center">
          {/* Left buttons */}
          <div className="col-span-4 flex items-center gap-2">
            <Button
              variant="outline"
              className="gap-  rounded-full min-w-[60px] sm:min-w-[80px]"
              onClick={() => handleViewModeChange("list")}
            >
              <List className="h-4 w-4" />
              <span className="hidden sm:inline">List</span>
            </Button>
            <Button
              variant="outline"
              className="gap-2 cursor-pointer rounded-full"
              onClick={() => {
                open();
                setModalData({
                  title: "Import Country",
                  message: <ImportStepperTemp />,
                });
              }}
            >
              <Import className="h-4 w-4" />
              <span className="hidden sm:inline">{t("common.import")}</span>
            </Button>
          </div>

          {/* Search */}
          <div className="col-span-4 flex justify-center">
            <div className="w-full max-w-xs mx-auto">
              <div className="relative flex items-center rounded-full">
                <Search className="absolute left-3 h-4 w-4 text-gray-400 z-10" />
                <Input
                  placeholder="Search..."
                  className="pl-9 pr-9 w-full rounded-full relative z-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Tooltip
                  arrowOffset={10}
                  arrowSize={7}
                  withArrow
                  position="top"
                  label="Search by voice"
                >
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-2 h-6 w-6 rounded-full cursor-pointer p-0 z-10"
                  >
                    <Mic className="h-4 w-4 text-blue-700" />
                  </Button>
                </Tooltip>
              </div>
            </div>
          </div>

          {/* Right buttons */}
          <div className="col-span-4 flex items-center justify-end gap-2">
            <Button
              variant="outline"
              className={`gap-2 rounded-full ${
                isExportOpen ? "bg-primary text-white" : ""
              }`}
              onClick={() => {
                setIsExportOpen(!isExportOpen);
                setIsFilterOpen(false);
              }}
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">{t("common.export")}</span>
            </Button>

            <Button
              variant="outline"
              className={`gap-2 rounded-full ${
                isFilterOpen ? "bg-primary text-white" : ""
              }`}
              onClick={() => {
                setIsFilterOpen(!isFilterOpen);
                setIsExportOpen(false);
              }}
            >
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">{t("common.filters")}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden mt-2">
        {/* Cards container */}
        <div
          ref={scrollContainerRef}
          className="overflow-y-auto scroll-smooth smooth-scroll pr-4"
          style={{
            width: isFilterOpen || isExportOpen ? "calc(100% - 320px)" : "100%",
          }}
        >
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pb-4">
            {filteredCountries.map((country) => (
              <Card
                key={country.id}
                className="transition-all hover:border-primary hover:shadow-md relative group dark:bg-gray-800 p-4"
              >
                {/* Top Row - Grid with 3 columns: Title | Icons | Flag */}
                <div className="grid grid-cols-3 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <Tooltip label={country.name} position="top" withArrow>
                    <CardTitle
                      className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                      onClick={() => navigate(`/countries/1`)}
                    >
                      {country.name}
                    </CardTitle>
                  </Tooltip>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Status Toggle */}
                    <Tooltip
                      label={
                        country.status === "active"
                          ? "CLick to Inactivate"
                          : "CLick to Activate"
                      }
                      position="top"
                      withArrow
                    >
                      <div
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          country.status === "active"
                            ? "text-green-500"
                            : "text-gray-400"
                        }`}
                        onClick={() => {
                          toggleStatus(country.id);
                          toastSuccess(
                            country.status === "active"
                              ? "Country activated successfully"
                              : "Country inactivated successfully"
                          );
                        }}
                      >
                        {country.status === "active" ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <Circle className="h-4 w-4" />
                        )}
                      </div>
                    </Tooltip>

                    {/* Delete/Restore */}
                    <Tooltip
                      label={country.isDeleted ? "Restore" : "Delete"}
                      position="top"
                      withArrow
                    >
                      <div
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          country.isDeleted ? "text-blue-500" : "text-red-500"
                        }`}
                        onClick={() => {
                          if (country.isDeleted) {
                            handleRestoreClick(country.id);
                          } else {
                            handleDeleteClick(country.id);
                          }
                          toastSuccess(
                            country.isDeleted
                              ? "Country restored successfully"
                              : "Country deleted successfully"
                          );
                        }}
                      >
                        {country.isDeleted ? (
                          <RefreshCw className="h-4 w-4" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </div>
                    </Tooltip>

                    {/* Edit */}
                    <Tooltip label="Edit" position="top" withArrow>
                      <div
                        className="cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-blue-500"
                        onClick={() => navigate(`/countries/1/edit`)}
                      >
                        <Pencil className="h-4 w-4" />
                      </div>
                    </Tooltip>
                  </div>

                  {/* Right - Flag */}
                  <div className="flex justify-end">
                    <img
                      src={`https://flagcdn.com/${country.code.toLowerCase()}.svg`}
                      alt={`${country.name} flag`}
                      className="h-12 w-12 object-cover border rounded-md shadow-sm"
                      onError={(e) => {
                        (
                          e.target as HTMLImageElement
                        ).src = `https://flagcdn.com/us.svg`;
                      }}
                    />
                  </div>
                </div>

                {/* Bottom Row - Grid with 2 columns: Code | Currency */}
                <div className="grid grid-cols-2 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Code - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Code
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {country.code}
                    </div>
                  </div>

                  {/* Currency - Right aligned */}
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Currency
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {country.currency}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-center items-center py-8">
              <div className="flex items-center gap-2 text-blue-600">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                <span className="text-sm">Loading more countries...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredCountries.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more countries to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={countries}
                setFilteredData={setCountriesData}
                setShowFilter={setIsFilterOpen}
              />
            </div>
          </div>
        )}

        {/* Export component - Right side only */}
        {isExportOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridExportComponent
                data={countries}
                setFilteredData={setCountriesData}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal
        opened={opened}
        onClose={close}
        title={
          <div className="">
            <h3 className="text-lg font-semibold pl-4 ">Import Country</h3>
          </div>
        }
        size="xl"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        style={{ zIndex: 9999 }}
        className="z-[9999]"
        centered
      >
        <div className="pt-5 pb-14 px-5">{modalData.message}</div>
      </Modal>
    </div>
  );
}
