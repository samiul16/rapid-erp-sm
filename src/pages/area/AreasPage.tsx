import { useState } from "react";
import { Button } from "@/components/ui/button";
import SummaryCards from "@/pages/states/SummaryCards";
import AreaGrid from "@/pages/area/AreaGrid";
import YoutubeButton from "@/components/common/YoutubeButton";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import AreaDataTable from "@/pages/area/AreaDataTable";

export default function AreasPage() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("grid");
  const { t } = useTranslation();

  // Mock data - replace with real data from your API
  const summaryData = {
    total: 45,
    draft: 5,
    active: 35,
    inactive: 5,
    deleted: 0,
  };

  // YouTube video ID for area-related tutorial
  const videoId = "AREA_VIDEO_ID"; // Replace with actual area-related video ID

  return (
    <div className="container mx-auto px-4 py-4 dark:bg-gray-900">
      {/* Header Section */}
      <div className="flex items-center gap-4 mb-4">
        <YoutubeButton videoId={videoId} />
        <h1 className="text-2xl font-bold flex-1 text-blue-400">Areas</h1>
        <Button
          className="bg-blue-400 hover:bg-blue-700 text-white rounded-full cursor-pointer"
          onClick={() => navigate("/areas/create")}
        >
          <span className="hidden sm:inline">{t("button.create")}</span>
          <span className="sm:hidden">{t("button.create")}</span>
        </Button>
      </div>

      <SummaryCards data={summaryData} module="areas" />

      {/* Scrollable Content Area */}
      <div className="mt-4 h-[calc(100vh-350px)] overflow-y-auto overflow-x-hidden border rounded-lg scroll-smooth [scrollbar-gutter:stable]">
        {viewMode === "grid" ? (
          <AreaGrid setViewMode={setViewMode} />
        ) : (
          <AreaDataTable viewMode={viewMode} setViewMode={setViewMode} />
        )}
      </div>
    </div>
  );
}
