import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Edit, Trash2, Undo } from "lucide-react";
import { Button } from "@/components/ui/button";
import YoutubeButton from "@/components/common/YoutubeButton";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";
import { Autocomplete, Modal } from "@mantine/core";
import HistoryDataTable from "@/components/common/HistoryDataTable";
import { mockHistoryData } from "@/mockData/country-mockdata";

const MOCK_COUNTRIES = [
  { code: "US", name: "United States", callingCode: "+1", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", callingCode: "+44", flag: "🇬🇧" },
  { code: "AE", name: "United Arab Emirates", callingCode: "+971", flag: "🇦🇪" },
  { code: "IN", name: "India", callingCode: "+91", flag: "🇮🇳" },
];

// Type definition for TypeScript
export type HistoryEntry = {
  id: string;
  date: string;
  user: string;
  status: "Active" | "InActive" | "Delete" | "Draft";
  export: "Single" | "Bulk";
  pdf: boolean;
  csv: boolean;
  xls: boolean;
  doc: boolean;
  print: boolean;
};

const COUNTRY_DATA = MOCK_COUNTRIES.map((country) => country.code);

export default function CountryDetailsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("US");

  const countryData = {
    code: selectedCountry,
    callingCode:
      MOCK_COUNTRIES.find((c) => c.code === selectedCountry)?.callingCode ||
      "+1",
    title:
      MOCK_COUNTRIES.find((c) => c.code === selectedCountry)?.name ||
      "United States",
    isDefault: true,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    flag: "https://flagcdn.com/us.svg",
    createdAt: "2023-05-15T10:30:00Z",
    updatedAt: "2023-11-20T14:45:00Z",
    draftedAt: null,
    deletedAt: null,
  };

  const formatDate = (date: string | null) => {
    if (!date) return "--/--/----";
    const d = new Date(date);
    const day = d.getDate();
    const month = d.toLocaleString("default", { month: "short" });
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const inputRef = useRef<HTMLInputElement>(null);

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchTerm(e.target.value);
  //   setOpen(true); // Ensure dropdown stays open when typing
  // };

  // const handleSelect = (value: string) => {
  //   const country = MOCK_COUNTRIES.find((c) => c.code === value);
  //   setSelectedCountry(country?.code || "");
  //   setSearchTerm(""); // Clear search term
  //   setOpen(false);
  // };

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // const handlePrint = () => window.print();
  // const handleExportPDF = () => console.log("Exporting PDF...");
  const handleDeleteRestore = () =>
    console.log(countryData.isDeleted ? "Restoring..." : "Deleting...");

  return (
    <div className="relative w-[calc(100vw-150px)]">
      {/* Container with full height minus external footer (80px assumed) */}
      <div className="flex flex-col h-[82vh] overflow-hidden border rounded shadow bg-white dark:bg-gray-800 ">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white dark:bg-gray-800 border-b px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <YoutubeButton videoId="PcVAyB3nDD4" />
            <h1 className="text-xl font-bold">{t("button.viewingCountry")}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="gap-2 bg-blue-400 hover:bg-blue-600 text-white rounded-full cursor-pointer"
              onClick={() => navigate("/countries")}
            >
              {t("button.list")}
            </Button>
          </div>
        </div>

        {/* Scrollable Form Section */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Row 1 */}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">Code</h3>
              <Autocomplete
                data={COUNTRY_DATA}
                value={selectedCountry}
                onChange={setSelectedCountry}
                placeholder="Select a country..."
                display="name"
                disabled={false}
                className="w-full"
              />
              {/* <Command className="rounded-lg border overflow-hidden">
                <CommandInput
                  placeholder="Type to search..."
                  value={searchTerm}
                  onValueChange={(value) => {
                    setSearchTerm(value);
                    setOpen(true);
                  }}
                />
                <CommandList>
                  {filteredCountries.length > 0 ? (
                    filteredCountries.map((country) => (
                      <CommandItem
                        key={country.code}
                        value={country.code}
                        onSelect={() => {
                          setSelectedCountry(country.code);
                          setSearchTerm("");
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <span>{country.flag}</span>
                          <span>{country.code}</span>
                          <span className="text-muted-foreground ml-2">
                            {country.name}
                          </span>
                        </div>
                      </CommandItem>
                    ))
                  ) : (
                    <div className="py-2 px-4 text-sm text-muted-foreground">
                      No countries found
                    </div>
                  )}
                </CommandList>
              </Command> */}
            </div>
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">Calling Code</h3>
              <div className="w-full px-3 py-2 dark:bg-gray-700 dark:border-gray-600">
                {countryData.callingCode}
              </div>
            </div>
            <div className="md:col-span-5">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">Country</h3>
              </div>
              <div className="w-full px-3 py-2 dark:bg-gray-700 dark:border-gray-600">
                {countryData.title}
              </div>
            </div>

            <div className="md:col-span-1 flex  justify-end">
              <Button
                variant="outline"
                className="gap-2 hover:bg-blue-500 hover:text-white rounded-full cursor-pointer"
                onClick={() => navigate("/countries/1/edit")}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Default Switch */}
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">Default</h3>
              <Switch
                checked={countryData.isDefault}
                disabled
                className={`data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-gray-600`}
              />
            </div>

            {/* Active Switch */}
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">Active</h3>
              <Switch
                checked={countryData.isActive}
                disabled
                className={`data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-gray-600`}
              />
            </div>

            {/* Draft Switch */}
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">Draft</h3>
              <Switch
                checked={countryData.isDraft}
                disabled
                className={`data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-gray-600`}
              />
            </div>

            {/* Delete/Restore Button */}
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">
                {countryData.isDeleted ? "Restore" : "Delete"}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDeleteRestore}
                disabled={countryData.isDeleted}
                className="disabled:cursor-not-allowed"
              >
                {countryData.isDeleted ? (
                  <Undo size={20} className="text-blue-500" />
                ) : (
                  <Trash2 size={20} className="text-red-600" />
                )}
              </Button>
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">Created</h3>
              <p>{formatDate(countryData.createdAt)}</p>
            </div>
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">Updated</h3>
              <p>{formatDate(countryData.updatedAt)}</p>
            </div>
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">Drafted</h3>
              <p>{formatDate(countryData.draftedAt)}</p>
            </div>
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">Deleted</h3>
              <p>{formatDate(countryData.deletedAt)}</p>
            </div>
          </div>

          {/* Flag */}
          <div>
            <h3 className="font-medium mb-1">Flag</h3>
            <div className="w-32 h-20 border rounded-md bg-gray-100 overflow-hidden dark:bg-gray-700">
              <img
                src={countryData.flag}
                alt="Flag"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-1">Flag</h3>
            <div className="w-32 h-20 border rounded-md bg-gray-100 overflow-hidden dark:bg-gray-700">
              <img
                src={countryData.flag}
                alt="Flag"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-1">Flag</h3>
            <div className="w-32 h-20 border rounded-md bg-gray-100 overflow-hidden dark:bg-gray-700">
              <img
                src={countryData.flag}
                alt="Flag"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Fixed Bottom Button Bar */}
        <div className="sticky bottom-0 z-30 bg-white dark:bg-gray-800 border-t px-6 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex gap-6 items-center">
              <div className="flex items-center gap-2">
                <Switch
                  checked={keepChanges}
                  className="data-[state=checked]:bg-blue-400"
                  onCheckedChange={setKeepChanges}
                />
                <span className="dark:text-gray-200">{t("button.keep")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Switch className="data-[state=checked]:bg-blue-400" />
                <span className="dark:text-gray-200">PDF</span>
              </div>
              <div className="flex items-center gap-2">
                <Switch className="data-[state=checked]:bg-blue-400" />
                <span className="dark:text-gray-200">Print</span>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                className="gap-2 text-white bg-blue-400 hover:bg-blue-600 rounded-full cursor-pointer"
                onClick={() => setIsOptionModalOpen(true)}
              >
                <span className="hidden sm:inline">History</span>
              </Button>
              <Button
                variant="outline"
                className="gap-2 text-white bg-blue-400 hover:bg-blue-600 rounded-full cursor-pointer"
              >
                <span className="hidden sm:inline">Export</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        opened={isOptionModalOpen}
        onClose={() => setIsOptionModalOpen(false)}
        size="50%"
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
        withCloseButton={false}
        styles={{
          body: {
            height: "720px", // Fixed height in pixels
            overflow: "hidden",
            padding: 4,
          },
          content: {
            // height: "80vh", // Fixed height - 80% of viewport height
            display: "flex",
            flexDirection: "column",
          },
          header: {
            flexShrink: 0,
          },
        }}
      >
        <Modal.Header>
          <Modal.Title>
            <span className="text-lg font-semibold text-blue-600">
              Country History
            </span>
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <HistoryDataTable columnData={mockHistoryData} />
        </Modal.Body>
      </Modal>
    </div>
  );
}
