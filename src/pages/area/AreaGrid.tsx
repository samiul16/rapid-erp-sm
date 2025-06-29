import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Trash2,
  RefreshCw,
  List,
  Import,
  Download,
  Filter,
  Mic,
  Search,
} from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import GridFilterComponent from "@/pages/Country/GridFilterComponent";
import GridExportComponent from "@/pages/Country/GridExportComponent";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import ImportStepper from "@/components/common/ImportStepper";
import { Input } from "@/components/ui/input";

// Mock data - replace with real data from your API
const areas = [
  {
    id: "1",
    name: "Manhattan",
    city: "New York",
    state: "New York",
    country: "United States",
    description: "The most famous borough of NYC",
    default: true,
    status: "active",
    deleted: false,
  },
  {
    id: "2",
    name: "Westminster",
    city: "London",
    state: "London",
    country: "United Kingdom",
    description: "Central London borough",
    default: false,
    status: "active",
    deleted: false,
  },
  {
    id: "3",
    name: "Shibuya",
    city: "Tokyo",
    state: "Tokyo",
    country: "Japan",
    description: "Famous shopping and entertainment district",
    default: true,
    status: "active",
    deleted: false,
  },
  {
    id: "4",
    name: "Le Marais",
    city: "Paris",
    state: "Paris",
    country: "France",
    description: "Historic district in Paris",
    default: false,
    status: "inactive",
    deleted: false,
  },
  {
    id: "5",
    name: "Mitte",
    city: "Berlin",
    state: "Berlin",
    country: "Germany",
    description: "Central district of Berlin",
    default: false,
    status: "active",
    deleted: false,
  },
  {
    id: "6",
    name: "CBD",
    city: "Sydney",
    state: "New South Wales",
    country: "Australia",
    description: "Central business district",
    default: true,
    status: "inactive",
    deleted: false,
  },
  {
    id: "7",
    name: "Downtown",
    city: "Toronto",
    state: "Ontario",
    country: "Canada",
    description: "Central business district of Toronto",
    default: false,
    status: "active",
    deleted: false,
  },
  {
    id: "8",
    name: "Downtown Dubai",
    city: "Dubai",
    state: "Dubai",
    country: "United Arab Emirates",
    description: "Central business district of Dubai",
    default: true,
    status: "active",
    deleted: false,
  },
  {
    id: "9",
    name: "Times Square",
    city: "New York",
    state: "New York",
    country: "United States",
    description: "Famous commercial intersection",
    default: false,
    status: "active",
    deleted: false,
  },
  {
    id: "10",
    name: "Covent Garden",
    city: "London",
    state: "London",
    country: "United Kingdom",
    description: "Shopping and entertainment district",
    default: false,
    status: "active",
    deleted: false,
  },
  {
    id: "11",
    name: "Harajuku",
    city: "Tokyo",
    state: "Tokyo",
    country: "Japan",
    description: "Fashion and youth culture district",
    default: false,
    status: "active",
    deleted: false,
  },
  {
    id: "12",
    name: "Montmartre",
    city: "Paris",
    state: "Paris",
    country: "France",
    description: "Historic hilltop district",
    default: false,
    status: "active",
    deleted: false,
  },
  {
    id: "13",
    name: "Brooklyn Heights",
    city: "New York",
    state: "New York",
    country: "United States",
    description: "Historic neighborhood with great views",
    default: false,
    status: "active",
    deleted: false,
  },
  {
    id: "14",
    name: "Camden",
    city: "London",
    state: "London",
    country: "United Kingdom",
    description: "Alternative culture and markets",
    default: false,
    status: "active",
    deleted: false,
  },
  {
    id: "15",
    name: "Ginza",
    city: "Tokyo",
    state: "Tokyo",
    country: "Japan",
    description: "Luxury shopping district",
    default: false,
    status: "active",
    deleted: false,
  },
  {
    id: "16",
    name: "Latin Quarter",
    city: "Paris",
    state: "Paris",
    country: "France",
    description: "Historic academic district",
    default: false,
    status: "active",
    deleted: false,
  },
  {
    id: "17",
    name: "Kreuzberg",
    city: "Berlin",
    state: "Berlin",
    country: "Germany",
    description: "Trendy multicultural district",
    default: false,
    status: "active",
    deleted: false,
  },
  {
    id: "18",
    name: "Bondi",
    city: "Sydney",
    state: "New South Wales",
    country: "Australia",
    description: "Famous beach suburb",
    default: false,
    status: "active",
    deleted: false,
  },
  {
    id: "19",
    name: "Distillery District",
    city: "Toronto",
    state: "Ontario",
    country: "Canada",
    description: "Historic arts and culture district",
    default: false,
    status: "active",
    deleted: false,
  },
  {
    id: "20",
    name: "Marina Bay",
    city: "Dubai",
    state: "Dubai",
    country: "United Arab Emirates",
    description: "Luxury residential and business district",
    default: false,
    status: "active",
    deleted: false,
  },
];

export default function AreasGrid({
  setViewMode,
}: {
  setViewMode: (viewMode: "grid" | "list") => void;
}) {
  const navigate = useNavigate();
  const [areaToDelete, setAreaToDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [, setIsShowResetButton] = useState(false);
  const [areasData, setAreasData] = useState(areas);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [modalData, setModalData] = useState({
    title: "Import Area",
    message: <ImportStepper />,
  });

  // Infinite scroll states
  const [displayedItems, setDisplayedItems] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const ITEMS_PER_PAGE = 8;

  const handleDeleteClick = (areaId: string) => {
    setAreaToDelete(areaId);
    setIsShowResetButton(true);
  };

  const handleViewModeChange = (viewMode: "grid" | "list") => {
    setViewMode(viewMode);
  };

  const toggleStatus = (areaId: string) => {
    setAreasData((prevAreas) =>
      prevAreas.map((area) =>
        area.id === areaId
          ? {
              ...area,
              status: area.status === "active" ? "inactive" : "active",
            }
          : area
      )
    );
  };

  const toggleDefault = (areaId: string) => {
    setAreasData((prevAreas) =>
      prevAreas.map((area) => ({
        ...area,
        default: area.id === areaId ? !area.default : area.default,
      }))
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleMicClick = () => {
    console.log("Voice search activated for areas");
  };

  const handleImportClick = () => {
    open();
    setModalData({
      title: "Import Area",
      message: <ImportStepper />,
    });
  };

  const handleExportClick = () => {
    setIsExportOpen(!isExportOpen);
    setIsFilterOpen(false);
  };

  const handleFilterClick = () => {
    setIsFilterOpen(!isFilterOpen);
    setIsExportOpen(false);
  };

  // Filter areas based on search query
  const filteredAreas = areasData.filter((area) =>
    area.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get currently displayed areas
  const visibleAreas = filteredAreas.slice(0, displayedItems);

  // Load more items
  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    setTimeout(() => {
      const newDisplayedItems = displayedItems + ITEMS_PER_PAGE;
      setDisplayedItems(newDisplayedItems);

      if (newDisplayedItems >= filteredAreas.length) {
        setHasMore(false);
      }

      setIsLoading(false);
    }, 500);
  }, [displayedItems, filteredAreas.length, isLoading, hasMore]);

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const isNearBottom = scrollTop + clientHeight >= scrollHeight - 100;

    if (isNearBottom && hasMore && !isLoading) {
      loadMore();
    }
  }, [loadMore, hasMore, isLoading]);

  // Attach scroll listener
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Reset pagination when search changes
  useEffect(() => {
    setDisplayedItems(ITEMS_PER_PAGE);
    setHasMore(filteredAreas.length > ITEMS_PER_PAGE);
  }, [searchQuery, filteredAreas.length]);

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
      {/* Header with grid layout */}
      <div className="sticky top-0 z-30 bg-white dark:bg-gray-900 px-4 py-3 border-b">
        <div className="grid grid-cols-12 gap-4 items-center">
          {/* Left buttons */}
          <div className="col-span-4 flex items-center gap-2">
            <Button
              variant="outline"
              className="gap-2 cursor-pointer bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 rounded-full min-w-[80px]"
              onClick={() => handleViewModeChange("list")}
            >
              <List className="h-4 w-4" />
              <span className="hidden sm:inline">List</span>
            </Button>
            <Button
              variant="outline"
              className="gap-2 cursor-pointer bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 rounded-full"
              onClick={handleImportClick}
            >
              <Import className="h-4 w-4" />
              <span className="hidden sm:inline">Import</span>
            </Button>
          </div>

          {/* Search */}
          <div className="col-span-4 flex justify-center">
            <div className="w-full max-w-md">
              <div className="relative flex items-center rounded-full">
                <Search className="absolute left-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search areas..."
                  className="pl-9 pr-9 w-full rounded-full"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-2 h-6 w-6 rounded-full cursor-pointer p-0"
                  onClick={handleMicClick}
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
              className={`gap-2 cursor-pointer bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 rounded-full ${
                isExportOpen ? "bg-blue-100 text-blue-800" : ""
              }`}
              onClick={handleExportClick}
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button
              variant="outline"
              className={`gap-2 cursor-pointer bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 rounded-full ${
                isFilterOpen ? "bg-blue-100 text-blue-800" : ""
              }`}
              onClick={handleFilterClick}
            >
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filters</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Cards container - scrollable */}
        <div
          ref={scrollContainerRef}
          className={`flex-1 overflow-y-auto p-4 transition-all duration-300 ${
            isFilterOpen || isExportOpen ? "md:w-3/4" : "w-full"
          }`}
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-4">
            {visibleAreas.map((area) => (
              <Card
                key={area.id}
                className="transition-all hover:shadow-lg hover:border-gray-300 relative group dark:bg-gray-800"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3">
                  <div className="flex items-center space-x-2">
                    <CardTitle
                      className="text-sm font-medium hover:text-blue-600 cursor-pointer"
                      onClick={() => navigate(`/areas/${area.id}`)}
                    >
                      {area.name}
                    </CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 text-xs rounded-full cursor-pointer ${
                        area.status === "active"
                          ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200"
                          : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-200"
                      }`}
                      onClick={() => toggleStatus(area.id)}
                    >
                      {area.status}
                    </span>
                    {area.default && (
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        Default
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <div className="space-y-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                      {area.description}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Country:</span>{" "}
                      {area.country}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">State:</span> {area.state}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">City:</span> {area.city}
                    </p>
                    <div className="flex justify-between items-center pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-6 text-xs"
                        onClick={() => toggleDefault(area.id)}
                      >
                        {area.default ? "Remove Default" : "Set as Default"}
                      </Button>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        {areaToDelete === area.id ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900 h-6 w-6 p-0"
                            onClick={() => setAreaToDelete(null)}
                          >
                            <RefreshCw className="h-3 w-3" />
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900 h-6 w-6 p-0"
                            onClick={() => handleDeleteClick(area.id)}
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
            <div className="flex justify-center items-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-2 text-gray-500">Loading more areas...</span>
            </div>
          )}

          {/* End of results indicator */}
          {!hasMore && filteredAreas.length > ITEMS_PER_PAGE && (
            <div className="flex justify-center items-center py-4 text-gray-500">
              No more areas to load
            </div>
          )}
        </div>

        {/* Side panels */}
        {isFilterOpen && (
          <div className="hidden md:block w-1/4 border-l dark:border-gray-700 p-4">
            <GridFilterComponent
              data={areas}
              setFilteredData={setAreasData}
              setShowFilter={setIsShowResetButton}
            />
          </div>
        )}

        {isExportOpen && (
          <div className="hidden md:block w-1/4 border-l dark:border-gray-700 p-4">
            <GridExportComponent
              data={areas}
              setFilteredData={setAreasData}
              setIsExportOpen={setIsExportOpen}
            />
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal
        opened={opened}
        onClose={close}
        title="Import Area"
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
