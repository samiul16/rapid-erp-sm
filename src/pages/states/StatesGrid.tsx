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
import { useCallback, useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import GridFilterComponent from "@/pages/Country/GridFilterComponent";
import GridExportComponent from "@/pages/Country/GridExportComponent";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import ImportStepper from "@/components/common/ImportStepper";

// Mock data for states
const states = [
  {
    id: "1",
    name: "California",
    country: "United States",
    description: "Most populous state in the US",
    default: true,
    status: "active",
    deleted: false,
  },
  {
    id: "2",
    name: "Texas",
    country: "United States",
    description: "Second largest state by area and population",
    default: false,
    status: "active",
    deleted: false,
  },
  {
    id: "3",
    name: "New York",
    country: "United States",
    description: "State with the largest city in the US",
    default: false,
    status: "active",
    deleted: false,
  },
  {
    id: "4",
    name: "Florida",
    country: "United States",
    description: "Known for its warm climate and tourism",
    default: false,
    status: "inactive",
    deleted: false,
  },
  {
    id: "5",
    name: "Ontario",
    country: "Canada",
    description: "Most populous province in Canada",
    default: true,
    status: "active",
    deleted: false,
  },
  {
    id: "6",
    name: "Quebec",
    country: "Canada",
    description: "French-speaking province in Canada",
    default: false,
    status: "inactive",
    deleted: false,
  },
  {
    id: "7",
    name: "Bavaria",
    country: "Germany",
    description: "Largest state in Germany by area",
    default: true,
    status: "active",
    deleted: false,
  },
  {
    id: "8",
    name: "New South Wales",
    country: "Australia",
    description: "Most populous state in Australia",
    default: false,
    status: "active",
    deleted: false,
  },
  {
    id: "1",
    name: "California",
    country: "United States",
    description: "Most populous state in the US",
    default: true,
    status: "active",
    deleted: false,
  },
  {
    id: "2",
    name: "Texas",
    country: "United States",
    description: "Second largest state by area and population",
    default: false,
    status: "active",
    deleted: false,
  },
  {
    id: "3",
    name: "New York",
    country: "United States",
    description: "State with the largest city in the US",
    default: false,
    status: "active",
    deleted: false,
  },
  {
    id: "4",
    name: "Florida",
    country: "United States",
    description: "Known for its warm climate and tourism",
    default: false,
    status: "inactive",
    deleted: false,
  },
  {
    id: "5",
    name: "Ontario",
    country: "Canada",
    description: "Most populous province in Canada",
    default: true,
    status: "active",
    deleted: false,
  },
  {
    id: "6",
    name: "Quebec",
    country: "Canada",
    description: "French-speaking province in Canada",
    default: false,
    status: "inactive",
    deleted: false,
  },
  {
    id: "7",
    name: "Bavaria",
    country: "Germany",
    description: "Largest state in Germany by area",
    default: true,
    status: "active",
    deleted: false,
  },
  {
    id: "8",
    name: "New South Wales",
    country: "Australia",
    description: "Most populous state in Australia",
    default: false,
    status: "active",
    deleted: false,
  },
  {
    id: "1",
    name: "California",
    country: "United States",
    description: "Most populous state in the US",
    default: true,
    status: "active",
    deleted: false,
  },
  {
    id: "2",
    name: "Texas",
    country: "United States",
    description: "Second largest state by area and population",
    default: false,
    status: "active",
    deleted: false,
  },
  {
    id: "3",
    name: "New York",
    country: "United States",
    description: "State with the largest city in the US",
    default: false,
    status: "active",
    deleted: false,
  },
  {
    id: "4",
    name: "Florida",
    country: "United States",
    description: "Known for its warm climate and tourism",
    default: false,
    status: "inactive",
    deleted: false,
  },
  {
    id: "5",
    name: "Ontario",
    country: "Canada",
    description: "Most populous province in Canada",
    default: true,
    status: "active",
    deleted: false,
  },
  {
    id: "6",
    name: "Quebec",
    country: "Canada",
    description: "French-speaking province in Canada",
    default: false,
    status: "inactive",
    deleted: false,
  },
  {
    id: "7",
    name: "Bavaria",
    country: "Germany",
    description: "Largest state in Germany by area",
    default: true,
    status: "active",
    deleted: false,
  },
  {
    id: "8",
    name: "New South Wales",
    country: "Australia",
    description: "Most populous state in Australia",
    default: false,
    status: "active",
    deleted: false,
  },
];

export default function StatesGrid({
  setViewMode,
}: {
  setViewMode: (viewMode: "grid" | "list") => void;
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [stateToDelete, setStateToDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [, setIsShowResetButton] = useState(false);
  const [statesData, setStatesData] = useState(states);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [modalData, setModalData] = useState({
    title: "Import State",
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

    // Generate more mock data for demonstration
    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      name: `State ${statesData.length + index + 1}`,
      country: ["United States", "Canada", "Australia", "Germany"][
        Math.floor(Math.random() * 4)
      ],
      description: `Generated state description for demonstration ${
        statesData.length + index + 1
      }`,
      default: false,
      status: Math.random() > 0.5 ? "active" : "inactive",
      deleted: false,
    }));

    // Stop loading more after reaching 50 items for demo
    if (statesData.length >= 46) {
      setHasMore(false);
    } else {
      setStatesData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [statesData.length, isLoading, hasMore]);

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

  const handleDeleteClick = (stateId: string) => {
    setStateToDelete(stateId);
    setIsShowResetButton(true);
  };

  const handleViewModeChange = (viewMode: "grid" | "list") => {
    setViewMode(viewMode);
  };

  const toggleStatus = (stateId: string) => {
    setStatesData((prevStates) =>
      prevStates.map((state) =>
        state.id === stateId
          ? {
              ...state,
              status: state.status === "active" ? "inactive" : "active",
            }
          : state
      )
    );
  };

  const toggleDefault = (stateId: string) => {
    setStatesData((prevStates) =>
      prevStates.map((state) => ({
        ...state,
        default: state.id === stateId ? !state.default : state.default,
      }))
    );
  };

  // Filter states based on search query
  const filteredStates = statesData.filter((state) =>
    state.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-4 py-3 h-full flex flex-col bg-white dark:bg-gray-900">
      {/* Fixed header controls */}
      <div className="sticky top-0 z-50 bg-white dark:bg-gray-900 pb-2">
        <div className="grid grid-cols-12 gap-4 items-center">
          {/* Left buttons */}
          <div className="col-span-4 flex items-center gap-2">
            <Button
              variant="outline"
              className="gap-2 cursor-pointer bg-blue-300 hover:bg-blue-700 text-blue-700 hover:text-white rounded-full  min-w-[60px] sm:min-w-[80px]"
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
                  title: "Import State",
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
                <Search className="absolute left-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search states..."
                  className="pl-9 pr-9 w-full rounded-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-2 h-6 w-6 rounded-full cursor-pointer p-0"
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
      <div className="flex flex-1 overflow-hidden mt-2 gap-4">
        {/* Cards container - dynamic width */}
        <div
          ref={scrollContainerRef}
          className={`${
            isFilterOpen || isExportOpen ? "flex-1" : "w-full"
          } overflow-y-auto scroll-smooth smooth-scroll`}
        >
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pb-4">
            {filteredStates.map((state) => (
              <Card
                key={state.id}
                className="transition-all hover:shadow-lg hover:border-gray-300 relative group dark:bg-gray-800"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3">
                  <div className="flex items-center space-x-2">
                    <CardTitle
                      className="text-sm font-medium hover:text-blue-600 cursor-pointer"
                      onClick={() => navigate(`/states/${state.id}`)}
                    >
                      {state.name}
                    </CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 text-xs rounded-full cursor-pointer ${
                        state.status === "active"
                          ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200"
                          : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-200"
                      }`}
                      onClick={() => toggleStatus(state.id)}
                    >
                      {state.status}
                    </span>
                    {state.default && (
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        Default
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <div className="space-y-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                      {state.description}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Country:</span>{" "}
                      {state.country}
                    </p>
                    <div className="flex justify-between items-center pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-6 text-xs"
                        onClick={() => toggleDefault(state.id)}
                      >
                        {state.default ? "Remove Default" : "Set as Default"}
                      </Button>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        {stateToDelete === state.id ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900 h-6 w-6 p-0"
                            onClick={() => setStateToDelete(null)}
                          >
                            <RefreshCw className="h-3 w-3" />
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900 h-6 w-6 p-0"
                            onClick={() => handleDeleteClick(state.id)}
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
                <span className="text-sm">Loading more states...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredStates.length > 8 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more states to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component */}
        {isFilterOpen && (
          <div className="w-80 min-w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={states}
                setFilteredData={setStatesData}
                setShowFilter={setIsShowResetButton}
              />
            </div>
          </div>
        )}

        {/* Export component */}
        {isExportOpen && (
          <div className="w-80 min-w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridExportComponent
                data={states}
                setFilteredData={setStatesData}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>

      <Modal
        opened={opened}
        onClose={close}
        title="Import State"
        size="xl"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <div className="pt-5 pb-14 px-5">{modalData.message}</div>
      </Modal>
    </div>
  );
}
