import { useState } from "react";
import { Button } from "@/components/ui/button";
import SummaryCards from "@/pages/Country/SummaryCards";
import CityGrid from "@/pages/city/CityGrid";
import YoutubeButton from "@/components/common/YoutubeButton";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CityDataTable from "@/pages/city/CItyDataTableComponent";

export default function CitiesPage() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("grid");
  const { t } = useTranslation();

  // Mock data - replace with real data from your API
  const summaryData = {
    total: 35,
    draft: 3,
    active: 28,
    inactive: 4,
    deleted: 0,
    updated: 0,
  };

  // YouTube video ID (the part after 'v=' in the URL)
  const videoId = "CITY_VIDEO_ID"; // Replace with actual city-related video ID

  return (
    <div className="container mx-auto px-4 py-4 dark:bg-gray-900">
      {/* Header Section */}
      <div className="flex items-center gap-4 mb-4">
        <YoutubeButton videoId={videoId} />
        <h1 className="text-2xl font-bold flex-1 text-blue-400">Cities</h1>
        <Button
          className="bg-blue-400 hover:bg-blue-700 text-white rounded-full cursor-pointer"
          onClick={() => navigate("/cities/create")}
        >
          <span className="hidden sm:inline">{t("button.create")}</span>
          <span className="sm:hidden">{t("button.create")}</span>
        </Button>
      </div>

      <SummaryCards data={summaryData} />

      {/* Scrollable Content Area */}
      <div className="mt-4 h-[calc(100vh-350px)] overflow-y-auto overflow-x-hidden border rounded-lg scroll-smooth [scrollbar-gutter:stable]">
        {viewMode === "grid" ? (
          <CityGrid setViewMode={setViewMode} />
        ) : (
          <CityDataTable viewMode={viewMode} setViewMode={setViewMode} />
        )}
      </div>
    </div>
  );
}
