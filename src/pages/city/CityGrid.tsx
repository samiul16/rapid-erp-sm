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
import { useState } from "react";
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
    <div className="px-4 py-3 h-full flex flex-col bg-white dark:bg-gray-900">
      {/* Fixed header controls */}
      <div className="sticky top-0 z-50 bg-white dark:bg-gray-900 pb-2">
        <div className="grid grid-cols-12 gap-4 items-center">
          {/* Left buttons */}
          <div className="col-span-4 flex items-center gap-2">
            <Button
              variant="outline"
              className="gap-2 cursor-pointer"
              onClick={() => handleViewModeChange("list")}
            >
              <List className="h-4 w-4" />
              <span className="hidden sm:inline">List</span>
            </Button>
            <Button
              variant="outline"
              className="gap-2 cursor-pointer"
              onClick={() => {
                console.log("Import City Modal open");
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
            <div className="w-full max-w-md">
              <div className="relative flex items-center rounded-full">
                <Search className="absolute left-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search cities..."
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
              className={`gap-2 cursor-pointer hover:bg-blue-400 hover:text-white ${
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
              className={`gap-2 cursor-pointer hover:bg-blue-400 hover:text-white ${
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
      <div className="flex flex-1 overflow-hidden mt-2">
        {/* Cards container - 75% width */}
        <div
          className={`${isFilterOpen ? "w-4/5" : "w-5/5"} pr-4 overflow-y-auto`}
        >
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pb-4">
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
        </div>

        {/* Filter component - 25% width */}
        <div
          className={`${
            isFilterOpen ? "w-1/5" : "w-0"
          } pl-4 dark:border-gray-700`}
        >
          {isFilterOpen && (
            <GridFilterComponent
              data={cities}
              setFilteredData={setCitiesData}
              setShowFilter={setIsShowResetButton}
            />
          )}
        </div>

        {/* Export component - 25% width */}
        <div
          className={`${
            isExportOpen ? "w-1/5" : "w-0"
          } pl-4 dark:border-gray-700`}
        >
          {isExportOpen && (
            <GridExportComponent
              data={cities}
              setFilteredData={setCitiesData}
              setIsExportOpen={setIsExportOpen}
            />
          )}
        </div>
      </div>

      <Modal
        opened={opened}
        onClose={close}
        title="Import City"
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
