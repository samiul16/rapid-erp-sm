import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  Edit,
  FileText,
  Printer,
  Plus,
  Save,
  Star,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Badge } from "@/components/ui/badge";
import YoutubeButton from "@/components/common/YoutubeButton";

export default function CountryDetailsPage() {
  const { t } = useTranslation();
  const [keepChanges, setKeepChanges] = useState(false);

  // Mock data - replace with real data from your API
  const countryData = {
    code: "US",
    title: "United States",
    isDefault: true,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    rating: 4,
    flag: "https://flagcdn.com/us.svg",
    createdAt: "2023-05-15T10:30:00Z",
    updatedAt: "2023-11-20T14:45:00Z",
    draftedAt: null,
    deletedAt: null,
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = () => {
    console.log("Exporting to PDF...");
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header with back and action buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <Button variant="outline" size="sm" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          {t("button.back")}
        </Button>
        <div className="flex gap-2 w-full sm:w-auto justify-end">
          <YoutubeButton videoId="PcVAyB3nDD4" />
          <Button variant="outline" className="gap-2">
            <Edit className="h-4 w-4" />
            {t("button.edit")}
          </Button>
          <Button className="bg-white hover:bg-white text-black border border-black">
            <Plus className="h-4 w-4" />
            {t("button.create")}
          </Button>
        </div>
      </div>

      {/* Main content - Titles remain in English as requested */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left column - Flag and basic info */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-14 border rounded-md overflow-hidden bg-gray-100">
                <img
                  src={countryData.flag}
                  alt={`${countryData.title} flag`}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{countryData.title}</h1>
                <p className="text-gray-500">{countryData.code}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Rating</h3>
              {renderStars(countryData.rating)}
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Status</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant={countryData.isDefault ? "default" : "outline"}>
                  {countryData.isDefault ? "Default" : "Not Default"}
                </Badge>
                <Badge variant={countryData.isActive ? "default" : "outline"}>
                  {countryData.isActive ? "Active" : "Inactive"}
                </Badge>
                <Badge variant={countryData.isDraft ? "default" : "outline"}>
                  {countryData.isDraft ? "Draft" : "Not Draft"}
                </Badge>
                <Badge
                  variant={countryData.isDeleted ? "destructive" : "outline"}
                >
                  {countryData.isDeleted ? "Deleted" : "Not Deleted"}
                </Badge>
              </div>
            </div>
          </div>

          {/* Middle column - Dates */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="font-semibold text-lg">Timestamps</h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <h3 className="text-sm text-gray-500">Created</h3>
                  <p>{formatDate(countryData.createdAt)}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">Updated</h3>
                  <p>{formatDate(countryData.updatedAt)}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">Drafted</h3>
                  <p>{formatDate(countryData.draftedAt)}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">Deleted</h3>
                  <p>{formatDate(countryData.deletedAt)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer with actions */}
      <div className="sticky bottom-0 bg-white border-t py-4 px-6 shadow-sm mt-6">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Toggle
              pressed={keepChanges}
              onPressedChange={setKeepChanges}
              variant="outline"
              aria-label="Keep changes"
              className="gap-2"
            >
              <Save className="h-4 w-4" />
              {t("button.keepChanges")}
            </Toggle>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={handleExportPDF}
            >
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">{t("button.exportPDF")}</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={handlePrint}
            >
              <Printer className="h-4 w-4" />
              <span className="hidden sm:inline">{t("button.print")}</span>
            </Button>
            <Button variant="destructive" size="sm" className="gap-2">
              <Trash2 className="h-4 w-4" />
              <span className="hidden sm:inline">{t("button.delete")}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
