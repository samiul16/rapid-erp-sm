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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// Mock data - replace with real data from your API
const countries = [
  { id: "1", name: "United States", code: "US", status: "active" },
  { id: "2", name: "Canada", code: "CA", status: "active" },
  { id: "3", name: "United Kingdom", code: "UK", status: "active" },
  { id: "4", name: "Japan", code: "JP", status: "inactive" },
  { id: "5", name: "Germany", code: "DE", status: "active" },
  { id: "6", name: "France", code: "FR", status: "draft" },
  { id: "7", name: "Italy", code: "IT", status: "active" },
  { id: "8", name: "Spain", code: "ES", status: "active" },
  { id: "9", name: "Portugal", code: "PT", status: "active" },
  { id: "10", name: "Switzerland", code: "CH", status: "active" },
];

export default function CountriesGrid({
  setViewMode,
}: {
  setViewMode: (viewMode: "grid" | "list") => void;
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [countryToDelete, setCountryToDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [, setIsShowResetButton] = useState(false);
  const [countriesData, setCountriesData] = useState(countries);

  const handleDeleteClick = (countryId: string) => {
    setCountryToDelete(countryId);
    // setIsDeleteDialogOpen(true);
    setIsShowResetButton(true);
  };

  const handleDeleteConfirm = () => {
    // Add your delete logic here
    console.log("Deleting country with ID:", countryToDelete);
    setIsDeleteDialogOpen(false);
    setCountryToDelete(null);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setCountryToDelete(null);
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
  const filteredCountries = countriesData.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-4 py-3 h-full flex flex-col">
      {/* Fixed header controls */}
      <div className="pb-1">
        <div className="grid grid-cols-12 gap-4 items-center">
          {/* Left buttons */}
          <div className="col-span-3 flex items-center gap-2">
            <Button
              variant="outline"
              className="gap-2 cursor-pointer"
              onClick={() => handleViewModeChange("list")}
            >
              <List className="h-4 w-4" />
              <span className="hidden sm:inline">List</span>
            </Button>
            <Button variant="outline" className="gap-2 cursor-pointer">
              <Import className="h-4 w-4" />
              <span className="hidden sm:inline">{t("common.import")}</span>
            </Button>
          </div>

          {/* Search */}
          <div className="col-span-6 flex justify-center">
            <div className="w-full max-w-md">
              <div className="relative flex items-center rounded-full">
                <Search className="absolute left-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search countries..."
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
          <div className="col-span-3 flex items-center justify-end gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="gap-2 cursor-pointer hover:bg-blue-400 hover:text-white"
                >
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
                <Button
                  variant="outline"
                  className="gap-2 cursor-pointer hover:bg-blue-400 hover:text-white"
                >
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
      </div>

      {/* Scrollable card grid */}
      <div className="flex-1 overflow-y-auto mt-2">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 pb-4">
          {filteredCountries.map((country) => (
            <Card
              key={country.id}
              className="transition-all hover:shadow-lg hover:border-gray-300 relative group dark:bg-gray-900 h-fit"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center space-x-2">
                  <img
                    src={`https://flagcdn.com/${country.code.toLowerCase()}.svg`}
                    alt={`${country.name} flag`}
                    className="h-6 w-8 object-cover border"
                    onError={(e) => {
                      (
                        e.target as HTMLImageElement
                      ).src = `https://flagcdn.com/us.svg`;
                    }}
                  />
                  <CardTitle
                    className="text-lg font-medium hover:text-blue-600 cursor-pointer"
                    onClick={() => navigate(`/countries/${country.id}`)}
                  >
                    {country.name}
                  </CardTitle>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full cursor-pointer ${
                    country.status === "active"
                      ? "bg-green-100 text-green-800 hover:bg-green-200"
                      : country.status === "inactive"
                      ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                  onClick={() => toggleStatus(country.id)}
                >
                  {country.status}
                </span>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">
                      Code: {country.code}
                    </p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    {countryToDelete === country.id ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                        onClick={() => setCountryToDelete(null)}
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDeleteClick(country.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              country and remove its data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleDeleteCancel}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDeleteConfirm}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
