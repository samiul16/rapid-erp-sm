import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
} from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import GridFilterComponent from "@/pages/Country/GridFilterComponent";
import GridExportComponent from "@/pages/Country/GridExportComponent";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import ImportStepper from "@/components/common/ImportStepper";

// Mock data - replace with real data from your API
const cities = [
  {
    id: "1",
    name: "New York",
    country: "United States",
    description: "The most populous city in the United States",
    default: true,
    status: "active",
    state: "New York",
    deleted: false,
  },
  {
    id: "2",
    name: "London",
    country: "United Kingdom",
    description: "Capital of England and the United Kingdom",
    default: false,
    status: "active",
    state: "London",
    deleted: false,
  },
  {
    id: "3",
    name: "Tokyo",
    country: "Japan",
    description: "Capital and most populous city of Japan",
    default: true,
    status: "active",
    state: "Tokyo",
    deleted: false,
  },
  {
    id: "4",
    name: "Paris",
    country: "France",
    description: "Capital of France",
    default: false,
    status: "inactive",
    state: "Paris",
    deleted: false,
  },
  {
    id: "5",
    name: "Berlin",
    country: "Germany",
    description: "Capital and largest city of Germany",
    default: false,
    status: "active",
    state: "Berlin",
    deleted: false,
  },
  {
    id: "6",
    name: "Sydney",
    country: "Australia",
    description: "Largest city in Australia",
    default: true,
    status: "inactive",
    state: "Sydney",
    deleted: false,
  },
  {
    id: "7",
    name: "Toronto",
    country: "Canada",
    description: "Largest city in Canada",
    default: false,
    status: "active",
    state: "Toronto",
    deleted: false,
  },
  {
    id: "8",
    name: "Dubai",
    country: "United Arab Emirates",
    description: "Most populous city in the UAE",
    default: true,
    status: "active",
    state: "Dubai",
    deleted: false,
  },
];

export default function CitiesGrid({
  setViewMode,
}: {
  setViewMode: (viewMode: "grid" | "list") => void;
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [cityToDelete, setCityToDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [, setIsShowResetButton] = useState(false);
  const [citiesData, setCitiesData] = useState(cities);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [modalData, setModalData] = useState({
    title: "Import City",
    message: <ImportStepper />,
  });

  // Infinite scroll states
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [, setPage] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const ITEMS_PER_PAGE = 4;

  // Simulate API call to load more data
  const loadMoreData = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Generate more mock cities for demonstration
    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      name: `City ${citiesData.length + index + 1}`,
      country: `Country ${Math.floor(Math.random() * 10) + 1}`,
      description: `Description for City ${citiesData.length + index + 1}`,
      default: Math.random() > 0.7,
      status: Math.random() > 0.3 ? "active" : "inactive",
      state: `State ${Math.floor(Math.random() * 10) + 1}`,
      deleted: false,
    }));

    // Stop loading more after reaching 50 items for demo
    if (citiesData.length >= 46) {
      setHasMore(false);
    } else {
      setCitiesData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [citiesData.length, isLoading, hasMore]);

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

  const handleDeleteClick = (cityId: string) => {
    setCityToDelete(cityId);
    setIsShowResetButton(true);
  };

  const handleViewModeChange = (viewMode: "grid" | "list") => {
    setViewMode(viewMode);
  };

  const toggleStatus = (cityId: string) => {
    setCitiesData((prevCities) =>
      prevCities.map((city) =>
        city.id === cityId
          ? {
              ...city,
              status: city.status === "active" ? "inactive" : "active",
            }
          : city
      )
    );
  };

  const toggleDefault = (cityId: string) => {
    setCitiesData((prevCities) =>
      prevCities.map((city) => ({
        ...city,
        default: city.id === cityId ? !city.default : city.default,
      }))
    );
  };

  // Filter cities based on search query
  const filteredCities = citiesData.filter((city) =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
      {/* Fixed header controls */}
      <div className="sticky top-0 bg-white dark:bg-gray-900 px-4 py-3">
        <div className="grid grid-cols-12 gap-4 items-center">
          {/* Left buttons */}
          <div className="col-span-4 flex items-center gap-2">
            <Button
              variant="outline"
              className="gap-2 cursor-pointer bg-blue-300 hover:bg-blue-700 text-blue-700 hover:text-white rounded-full min-w-[60px] sm:min-w-[80px]"
              onClick={() => handleViewModeChange("list")}
            >
              <List className="h-4 w-4" />
              <span className="hidden sm:inline">List</span>
            </Button>
            <Button
              variant="outline"
              className="gap-2 cursor-pointer bg-blue-300 hover:bg-blue-700 text-blue-700 hover:text-white rounded-full"
              onClick={() => {
                open();
                setModalData({
                  title: "Import City",
                  message: <ImportStepper />,
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
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-2 h-6 w-6 rounded-full cursor-pointer p-0 z-10"
                >
                  <Mic className="h-4 w-4 text-blue-400" />
                </Button>
              </div>
            </div>
          </div>

          {/* Right buttons */}
          <div className="col-span-4 flex items-center justify-end gap-2">
            <Button
              variant="outline"
              className={`gap-2 cursor-pointer bg-blue-300 hover:bg-blue-700 text-blue-700 hover:text-white rounded-full ${
                isExportOpen ? "bg-blue-400 text-white" : ""
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
              className={`gap-2 cursor-pointer bg-blue-300 hover:bg-blue-700 text-blue-700 hover:text-white rounded-full ${
                isFilterOpen ? "bg-blue-400 text-white" : ""
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
      <div className="flex flex-1 overflow-hidden">
        {/* Cards container */}
        <div
          ref={scrollContainerRef}
          className={`flex-1 overflow-y-auto p-4 transition-all duration-300 ${
            isFilterOpen || isExportOpen ? "md:w-3/4" : "w-full"
          }`}
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-4">
            {filteredCities.map((city) => (
              <Card
                key={city.id}
                className="transition-all hover:shadow-lg hover:border-gray-300 relative group dark:bg-gray-800"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3">
                  <div className="flex items-center space-x-2">
                    <CardTitle
                      className="text-sm font-medium hover:text-blue-600 cursor-pointer"
                      onClick={() => navigate(`/cities/${city.id}`)}
                    >
                      {city.name}
                    </CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 text-xs rounded-full cursor-pointer ${
                        city.status === "active"
                          ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200"
                          : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-200"
                      }`}
                      onClick={() => toggleStatus(city.id)}
                    >
                      {city.status}
                    </span>
                    {city.default && (
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        Default
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <div className="space-y-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                      {city.description}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Country:</span>{" "}
                      {city.country}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">State:</span> {city.state}
                    </p>
                    <div className="flex justify-between items-center pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-6 text-xs"
                        onClick={() => toggleDefault(city.id)}
                      >
                        {city.default ? "Remove Default" : "Set as Default"}
                      </Button>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        {cityToDelete === city.id ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900 h-6 w-6 p-0"
                            onClick={() => setCityToDelete(null)}
                          >
                            <RefreshCw className="h-3 w-3" />
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900 h-6 w-6 p-0"
                            onClick={() => handleDeleteClick(city.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-center items-center py-8">
              <div className="flex items-center gap-2 text-blue-600">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                <span className="text-sm">Loading more cities...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredCities.length > 8 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more cities to load
              </span>
            </div>
          )}
        </div>

        {/* Right side panels */}
        <div className="hidden md:flex flex-col">
          {/* Filter component */}
          {isFilterOpen && (
            <div className="w-80 h-full border-l border-gray-200 dark:border-gray-700">
              <GridFilterComponent
                data={cities}
                setFilteredData={setCitiesData}
                setShowFilter={setIsShowResetButton}
              />
            </div>
          )}

          {/* Export component */}
          {isExportOpen && (
            <div className="w-80 h-full border-l border-gray-200 dark:border-gray-700">
              <GridExportComponent
                data={cities}
                setFilteredData={setCitiesData}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <Modal
        opened={opened}
        onClose={close}
        title="Import City"
        size="xl"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        zIndex={9999}
      >
        <div className="pt-5 pb-14 px-5">{modalData.message}</div>
      </Modal>
    </div>
  );
}
