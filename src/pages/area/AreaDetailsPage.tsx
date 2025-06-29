import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Edit, History, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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

const MOCK_AREAS = [
  {
    id: "1",
    name: "Downtown",
    cityId: "1",
    cityName: "Los Angeles",
    stateId: "1",
    stateName: "California",
    countryCode: "US",
    countryName: "United States",
    countryFlag: "🇺🇸",
    description: "The central business district of the city",
    isDefault: true,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: "2023-05-15T10:30:00Z",
    updatedAt: "2023-11-20T14:45:00Z",
    draftedAt: null,
    deletedAt: null,
  },
  {
    id: "2",
    name: "Financial District",
    cityId: "1",
    cityName: "Los Angeles",
    stateId: "1",
    stateName: "California",
    countryCode: "US",
    countryName: "United States",
    countryFlag: "🇺🇸",
    description: "The financial hub of the city",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: "2023-06-20T09:15:00Z",
    updatedAt: "2023-10-10T16:30:00Z",
    draftedAt: null,
    deletedAt: null,
  },
  {
    id: "3",
    name: "Midtown",
    cityId: "2",
    cityName: "San Francisco",
    stateId: "1",
    stateName: "California",
    countryCode: "US",
    countryName: "United States",
    countryFlag: "🇺🇸",
    description: "Central business and residential district",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: "2023-04-10T14:20:00Z",
    updatedAt: "2023-09-15T11:45:00Z",
    draftedAt: null,
    deletedAt: null,
  },
];

export default function AreaDetailsPage() {
  const { t } = useTranslation();
  const [keepChanges, setKeepChanges] = useState(false);
  const [selectedAreaId, setSelectedAreaId] = useState("1");
  const navigate = useNavigate();

  const selectedArea =
    MOCK_AREAS.find((area) => area.id === selectedAreaId) || MOCK_AREAS[0];

  const formatDate = (date: string | null) => {
    if (!date) return "--/--/----";
    const d = new Date(date);
    const day = d.getDate();
    const month = d.toLocaleString("default", { month: "short" });
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  };

  return (
    <div className="relative w-full">
      {/* Container with full height minus external footer */}
      <div className="flex flex-col h-[calc(100vh-160px)] overflow-hidden border rounded shadow bg-white dark:bg-gray-800">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white dark:bg-gray-800 border-b px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <YoutubeButton videoId="PcVAyB3nDD4" />
            <h1 className="text-xl font-bold text-blue-400">
              {t("button.viewingArea")}
            </h1>
          </div>
          <Button
            variant="outline"
            className="gap-2 bg-blue-400 hover:bg-blue-600 text-white rounded-full"
            onClick={() => navigate(`/areas/${selectedAreaId}/edit`)}
          >
            <Edit className="h-4 w-4" />
            {t("button.edit")}
          </Button>
        </div>

        {/* Scrollable Form Section */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* First Row - Area Details */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-3 space-y-2">
              <Label className="block">{t("form.area")}</Label>
              <Select value={selectedAreaId} onValueChange={setSelectedAreaId}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select an area" />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_AREAS.map((area) => (
                    <SelectItem key={area.id} value={area.id}>
                      {area.name}, {area.cityName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-3 space-y-2">
              <Label className="block">{t("form.city")}</Label>
              <div className="w-full h-10 px-3 py-2 dark:bg-gray-700 dark:border-gray-600 flex items-center">
                {selectedArea.cityName}
              </div>
            </div>

            <div className="md:col-span-3 space-y-2">
              <Label className="block">{t("form.state")}</Label>
              <div className="w-full h-10 px-3 py-2 dark:bg-gray-700 dark:border-gray-600 flex items-center">
                {selectedArea.stateName}
              </div>
            </div>

            <div className="md:col-span-3 space-y-2">
              <Label className="block">{t("form.country")}</Label>
              <div className="w-full h-10 px-3 py-2 dark:bg-gray-700 dark:border-gray-600 flex items-center gap-2">
                <span>{selectedArea.countryFlag}</span>
                <span>{selectedArea.countryName}</span>
              </div>
            </div>
          </div>

          {/* Description Row */}
          <div className="space-y-2">
            <Label className="block">{t("form.description")}</Label>
            <div className="w-full px-3 py-2 dark:bg-gray-700 dark:border-gray-600">
              {selectedArea.description}
            </div>
          </div>

          {/* Toggles Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-3 space-y-2">
              <Label className="block">{t("common.active")}</Label>
              <div className="h-10 flex items-center">
                <Switch
                  checked={selectedArea.isActive}
                  disabled
                  className="data-[state=checked]:bg-blue-400"
                />
              </div>
            </div>

            <div className="md:col-span-3 space-y-2">
              <Label className="block">{t("common.draft")}</Label>
              <div className="h-10 flex items-center">
                <Switch
                  checked={selectedArea.isDraft}
                  disabled
                  className="data-[state=checked]:bg-blue-400"
                />
              </div>
            </div>

            <div className="md:col-span-3 space-y-2">
              <Label className="block">{t("button.delete")}</Label>
              <div className="h-10 flex items-center">
                <Switch
                  checked={selectedArea.isDeleted}
                  disabled
                  className="data-[state=checked]:bg-blue-400"
                />
              </div>
            </div>

            <div className="md:col-span-3 space-y-2">
              <Label className="block">{t("common.default")}</Label>
              <div className="h-10 flex items-center">
                <Switch
                  checked={selectedArea.isDefault}
                  disabled
                  className="data-[state=checked]:bg-blue-400"
                />
              </div>
            </div>
          </div>

          {/* Dates Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-3 space-y-2">
              <Label className="block">Created</Label>
              <div className="w-full h-10 px-3 py-2 dark:bg-gray-700 dark:border-gray-600 flex items-center">
                {formatDate(selectedArea.createdAt)}
              </div>
            </div>

            <div className="md:col-span-3 space-y-2">
              <Label className="block">Updated</Label>
              <div className="w-full h-10 px-3 py-2 dark:bg-gray-700 dark:border-gray-600 flex items-center">
                {formatDate(selectedArea.updatedAt)}
              </div>
            </div>

            <div className="md:col-span-3 space-y-2">
              <Label className="block">Drafted</Label>
              <div className="w-full h-10 px-3 py-2 dark:bg-gray-700 dark:border-gray-600 flex items-center">
                {formatDate(selectedArea.draftedAt)}
              </div>
            </div>

            <div className="md:col-span-3 space-y-2">
              <Label className="block">Deleted</Label>
              <div className="w-full h-10 px-3 py-2 dark:bg-gray-700 dark:border-gray-600 flex items-center">
                {formatDate(selectedArea.deletedAt)}
              </div>
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
                <span className="dark:text-gray-200">
                  {t("button.keepChanges")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  className="data-[state=checked]:bg-blue-400"
                  onClick={() => console.log("PDF export")}
                />
                <span className="dark:text-gray-200">PDF</span>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  className="data-[state=checked]:bg-blue-400"
                  onClick={() => window.print()}
                />
                <span className="dark:text-gray-200">Print</span>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                className="gap-2 text-white bg-blue-400 hover:bg-blue-600 rounded-full"
              >
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Export</span>
              </Button>
              <Button
                variant="outline"
                className="gap-2 text-white bg-blue-400 hover:bg-blue-600 rounded-full"
              >
                <History className="h-4 w-4" />
                <span className="hidden sm:inline">History</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
