/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Trash2, Undo } from "lucide-react";
import { Button } from "@/components/ui/button";
// import YoutubeButton from "@/components/common/YoutubeButton";
import { Switch } from "@/components/ui/switch";
import { useLocation, useNavigate } from "react-router-dom";
import { Autocomplete, Modal } from "@mantine/core";
import HistoryDataTable from "@/components/common/HistoryDataTable";
import { mockHistoryData } from "@/mockData/country-mockdata";
// import HeaderDropdown from "@/components/common/HeaderDropdown";
import { SplitButton } from "@/components/common/SplitButton";
import VideoModal from "@/components/common/VideoModal";
import video from "@/assets/videos/test.mp4";
import { printHtmlContent } from "@/lib/printHtmlContent";
import countryDetailPrintContent from "@/lib/printContents/countryDetails";
import { toastError } from "@/lib/toast";
import StatePDF from "@/components/common/CountryPDF";
import { pdf } from "@react-pdf/renderer";

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
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);

  let countryData = {
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
    draftedAt: "2025-05-20T14:45:00Z",
    deletedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
  };

  // const formatDate = (date: string | null) => {
  //   if (!date) return "--/--/----";
  //   const d = new Date(date);
  //   const day = d.getDate();
  //   const month = d.toLocaleString("default", { month: "short" });
  //   const year = d.getFullYear();
  //   return `${day} ${month} ${year}`;
  // };

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
    console.log("isViewPage", isViewPage);
    if (isViewPage) {
      countryData = {
        code: selectedCountry,
        callingCode: "",
        title: "",
        isDefault: true,
        isActive: true,
        isDraft: false,
        isDeleted: false,
        flag: "",
        createdAt: "",
        updatedAt: "",
        draftedAt: "",
        deletedAt: "",
      };
    }
  }, []);

  // const handlePrint = () => {
  //   window.print();
  //   setPrintEnabled(false); // Reset switch after printing
  // };

  const handlePrintCountry = (countryData: any) => {
    try {
      const html = countryDetailPrintContent([countryData]);

      printHtmlContent(html);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when printing");
    }
  };

  const handleSwitchChange = (checked: boolean) => {
    setPrintEnabled(checked);
    if (checked) {
      // Small delay to allow switch animation to complete
      setTimeout(() => handlePrintCountry(countryData), 100);
    }
  };

  const handlePDFSwitchChange = (pdfChecked: boolean) => {
    setPdfChecked(pdfChecked);
    if (pdfChecked) {
      // Small delay to allow switch animation to complete
      setTimeout(() => handleExportPDF(), 100);
    }
  };

  const handleExportPDF = async () => {
    console.log("Export PDF clicked");
    try {
      console.log("countryData on pdf click", countryData);
      const blob = await pdf(
        <StatePDF exportableDataList={[countryData]} />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "countries-details.pdf";
      a.click();
      console.log("a", a);
      console.log("url", url);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating PDF");
    }
  };

  const handleDeleteRestore = () =>
    console.log(countryData.isDeleted ? "Restoring..." : "Deleting...");

  const getRelativeTime = (dateString: string | null) => {
    if (!dateString) return "--/--/----";

    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();

    const minutes = Math.floor(diffInMs / (1000 * 60));
    const hours = Math.floor(diffInMs / (1000 * 60 * 60));
    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const months = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 30));
    const years = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 365));

    if (years > 0) {
      return `${years}y ago`;
    } else if (months > 0) {
      return `${months}mo ago`;
    } else if (days > 0) {
      return `${days}d ago`;
    } else if (hours > 0) {
      return `${hours}h ago`;
    } else if (minutes > 0) {
      return `${minutes}m ago`;
    } else {
      return "Just now";
    }
  };

  return (
    <div className="relative w-[calc(100vw-150px)]">
      {/* Container with full height minus external footer (80px assumed) */}
      <div className="flex flex-col h-[82vh] overflow-hidden border rounded shadow bg-white dark:bg-gray-800 ">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white dark:bg-gray-800 border-b px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {/* <YoutubeButton videoId="PcVAyB3nDD4" /> */}
            <VideoModal src={video} header={"Rapid ERP Video"} />
            <h1 className="text-xl font-bold text-primary">
              {t("button.viewingCountry")}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {/* Main List Button */}
              {/* <Button
                variant="outline"
                className="hover:bg-blue-600 text-white rounded-l-full rounded-r-none border-r-2 px-4 py-2"
                onClick={() => navigate("/countries")}
              >
                {t("button.list")}
              </Button> */}

              {/* Dropdown Button */}
              {/* <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="hover:bg-blue-600 text-white rounded-r-full rounded-l-none border-l-0 px-2 py-2"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-40 p-1" align="end">
                  <div className="flex flex-col">
                    <Button
                      variant="ghost"
                      className="justify-start gap-2 h-9 px-2 py-1 hover:bg-gray-100"
                      onClick={() => {
                        // Handle create action
                        console.log("Create clicked");
                      }}
                    >
                      <Plus className="h-4 w-4 text-primary" />
                      Create
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start gap-2 h-9 px-2 py-1 hover:bg-gray-100"
                      onClick={() => {
                        // Handle update action
                        console.log("Update clicked");
                      }}
                    >
                      <Edit className="h-4 w-4 text-blue-500" />
                      Update
                    </Button>
                  </div>
                </PopoverContent>
              </Popover> */}

              <SplitButton
                onListClick={() => navigate("/countries")}
                listText="List"
                listPath="/countries"
                popoverOptions={[
                  {
                    label: "Create",
                    onClick: () => navigate("/countries/create"),
                    // icon: <Plus className="h-4 w-4 text-primary" />,
                  },
                  {
                    label: "Edit",
                    onClick: () => navigate("/countries/1/edit"),
                    // icon: <Edit className="h-4 w-4 text-primary" />,
                  },
                ]}
              />
            </div>
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
                styles={{
                  input: {
                    "&:focus": {
                      borderColor: "var(--primary)",
                    },
                  },
                }}
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
              <div className="w-full px-1 py-1 text-gray-500 font-normal text-md">
                {countryData.callingCode}
              </div>
            </div>
            <div className="md:col-span-5">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">Country</h3>
              </div>
              <div className="w-full px-1 py-1 text-gray-500 font-normal text-md">
                {countryData.title}
              </div>
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
                className={` data-[state=unchecked]:bg-gray-600`}
              />
            </div>

            {/* Active Switch */}
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">Active</h3>
              <Switch
                checked={countryData.isActive}
                disabled
                className={`data-[state=unchecked]:bg-gray-600`}
              />
            </div>

            {/* Draft Switch */}
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">Draft</h3>
              <Switch
                checked={countryData.isDraft}
                disabled
                className={`data-[state=unchecked]:bg-gray-600`}
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
                className="disabled:cursor-not-allowed disabled:text-gray-400"
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
              <p className="text-gray-500 text-md font-normal">
                {getRelativeTime(countryData.createdAt)}
              </p>
            </div>
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">Updated</h3>
              <p className="text-gray-500 text-md font-normal">
                {getRelativeTime(countryData.updatedAt)}
              </p>
            </div>
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">Drafted</h3>
              <p className="text-gray-500 text-md font-normal">
                {getRelativeTime(countryData.draftedAt)}
              </p>
            </div>
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">Deleted</h3>
              <p className="text-gray-500 text-md font-normal">
                {getRelativeTime(countryData.deletedAt)}
              </p>
            </div>
          </div>

          {/* Flag */}
          <div className="flex flex-col items-center justify-center">
            <h3 className="font-medium mb-2 text-center">Flag</h3>
            <div className="w-32 h-20 border rounded-md bg-gray-100 overflow-hidden dark:bg-gray-700 mx-auto hover:scale-120 transition duration-300">
              {countryData.flag ? (
                <img
                  src={countryData.flag}
                  alt="Flag"
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No flag
                </div>
              )}
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
                <Switch
                  checked={pdfChecked}
                  className="data-[state=checked]:bg-blue-400"
                  onCheckedChange={handlePDFSwitchChange}
                />
                <span className="dark:text-gray-200">PDF</span>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={printEnabled}
                  onCheckedChange={handleSwitchChange}
                  className="data-[state=checked]:bg-blue-400"
                />
                <span className="dark:text-gray-200">Print</span>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                className="gap-2 text-primary rounded-full cursor-pointer border-primary"
                onClick={() => setIsOptionModalOpen(true)}
              >
                <span className="hidden sm:inline">History</span>
              </Button>
              {/* <Button
                variant="outline"
                className="gap-2 text-white hover:bg-blue-600 rounded-full cursor-pointer"
              >
                <span className="hidden sm:inline">Export</span>
              </Button> */}
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
