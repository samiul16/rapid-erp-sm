import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Edit, FileText, Printer, History, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import YoutubeButton from "@/components/common/YoutubeButton";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AreaDetailsPage() {
  const { t } = useTranslation();
  const [keepChanges, setKeepChanges] = useState(false);
  const navigate = useNavigate();

  // Mock data for dropdowns
  const countries = [
    { code: "US", name: "United States", flag: "🇺🇸" },
    { code: "IN", name: "India", flag: "🇮🇳" },
    { code: "UK", name: "United Kingdom", flag: "🇬🇧" },
  ];

  const states = [
    { id: "1", name: "California", countryCode: "US" },
    { id: "2", name: "Texas", countryCode: "US" },
    { id: "3", name: "Maharashtra", countryCode: "IN" },
  ];

  const cities = [
    { id: "1", name: "Los Angeles", stateId: "1" },
    { id: "2", name: "San Francisco", stateId: "1" },
    { id: "3", name: "Mumbai", stateId: "3" },
  ];

  const areaData = {
    name: "Downtown",
    countryCode: "US",
    stateId: "1",
    cityId: "1",
    description: "The central business district of the city",
    isDefault: true,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: "2023-05-15T10:30:00Z",
    updatedAt: "2023-11-20T14:45:00Z",
    draftedAt: null,
    deletedAt: null,
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "--/--/----";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = () => {
    console.log("Exporting to PDF...");
  };

  // Get selected country, state, and city details
  const selectedCountry = countries.find(
    (c) => c.code === areaData.countryCode
  );
  //   const selectedState = states.find((s) => s.id === areaData.stateId);
  //   const selectedCity = cities.find((c) => c.id === areaData.cityId);

  return (
    <div className="container mx-auto px-4 py-4 flex flex-col min-h-screen dark:bg-gray-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
        <div className="flex items-center gap-2">
          <YoutubeButton videoId="PcVAyB3nDD4" />
          <h1 className="text-xl font-bold text-blue-400">
            {t("button.viewingArea")}
          </h1>
        </div>
        <div className="flex gap-2 w-full sm:w-auto justify-end">
          <Button
            variant="outline"
            size="sm"
            className="gap-1 hover:bg-blue-600 hover:text-white cursor-pointer"
            onClick={() => navigate("/areas/1/edit")}
          >
            <Edit className="h-3 w-3" />
            {t("button.edit")}
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto pb-4">
        <div className="bg-white rounded-lg shadow-sm border p-4 mb-4 dark:bg-gray-800 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Area Name */}
            <div className="md:col-span-3">
              <h3 className="font-medium text-sm mb-1">{t("form.area")}</h3>
              <input
                type="text"
                value={areaData.name}
                readOnly
                className="border rounded px-2 py-1 text-sm w-full dark:bg-gray-700"
              />
            </div>

            {/* State Dropdown */}
            <div className="md:col-span-3">
              <h3 className="font-medium text-sm mb-1">{t("form.state")}</h3>
              <Select disabled value={areaData.stateId}>
                <SelectTrigger className="w-full text-sm">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state.id} value={state.id}>
                      {state.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* City Dropdown */}
            <div className="md:col-span-3">
              <h3 className="font-medium text-sm mb-1">{t("form.city")}</h3>
              <Select disabled value={areaData.cityId}>
                <SelectTrigger className="w-full text-sm">
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  {cities
                    .filter((city) => city.stateId === areaData.stateId)
                    .map((city) => (
                      <SelectItem key={city.id} value={city.id}>
                        {city.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {/* Country Dropdown */}
            <div className="md:col-span-3">
              <h3 className="font-medium text-sm mb-1">{t("form.country")}</h3>
              <Select disabled value={areaData.countryCode}>
                <SelectTrigger className="w-full text-sm">
                  {selectedCountry && (
                    <div className="flex items-center gap-2">
                      <span>{selectedCountry.flag}</span>
                      <span>{selectedCountry.name}</span>
                    </div>
                  )}
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      <div className="flex items-center gap-2">
                        <span>{country.flag}</span>
                        <span>{country.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="md:col-span-12">
              <h3 className="font-medium text-sm mb-1">
                {t("form.description")}
              </h3>
              <textarea
                value={areaData.description}
                readOnly
                className="border rounded px-2 py-1 text-sm w-full h-16 dark:bg-gray-700"
              />
            </div>

            {/* Toggles */}
            <div className="md:col-span-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 pt-2">
              {[
                { label: t("common.active"), value: areaData.isActive },
                { label: t("common.draft"), value: areaData.isDraft },
                { label: t("button.delete"), value: areaData.isDeleted },
                { label: t("common.default"), value: areaData.isDefault },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <div>
                    <h3 className="font-medium text-sm mb-1">{item.label}</h3>
                    <Switch
                      checked={item.value}
                      disabled
                      className="data-[state=checked]:bg-blue-400 h-4 w-7"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Dates */}
            <div className="md:col-span-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 pt-2 text-sm">
              {[
                { label: "Created", value: areaData.createdAt },
                { label: "Updated", value: areaData.updatedAt },
                { label: "Drafted", value: areaData.draftedAt },
                { label: "Deleted", value: areaData.deletedAt },
              ].map((item) => (
                <div key={item.label}>
                  <h3 className="font-medium text-sm mb-1">{item.label}</h3>
                  <p>{formatDate(item.value)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 bg-white border-t py-2 px-4 shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <Switch
              checked={keepChanges}
              className="data-[state=checked]:bg-blue-400 h-4 w-7"
              onCheckedChange={setKeepChanges}
              aria-label={t("button.keepChanges")}
            />
            <span className="text-sm">{t("button.keepChanges")}</span>

            <Button
              variant="outline"
              size="sm"
              className="gap-1 cursor-pointer text-white bg-blue-400 hover:bg-blue-600 hover:text-white h-8"
              onClick={handleExportPDF}
            >
              <FileText className="h-3 w-3" />
              <span className="hidden sm:inline text-xs">PDF</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1 cursor-pointer text-white bg-blue-400 hover:bg-blue-600 hover:text-white h-8"
              onClick={handlePrint}
            >
              <Printer className="h-3 w-3" />
              <span className="hidden sm:inline text-xs">Print</span>
            </Button>
          </div>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="sm"
              className="gap-1 cursor-pointer text-white bg-blue-400 hover:bg-blue-600 hover:text-white h-8"
            >
              <Download className="h-3 w-3" />
              <span className="hidden sm:inline text-xs">Export</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1 cursor-pointer text-white bg-blue-400 hover:bg-blue-600 hover:text-white h-8"
            >
              <History className="h-3 w-3" />
              <span className="hidden sm:inline text-xs">History</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
