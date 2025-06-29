import { useState } from "react";
import { Button } from "@/components/ui/button";
import SummaryCards from "@/pages/states/SummaryCards";
import StateGrid from "@/pages/states/StatesGrid";
import YoutubeButton from "@/components/common/YoutubeButton";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import StateDataTable from "./StatesDataTable";

export default function StatesPage() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("grid");
  const { t } = useTranslation();

  // Mock data - replace with real data from your API
  const summaryData = {
    total: 25,
    draft: 2,
    active: 20,
    inactive: 3,
    deleted: 0,
  };

  // YouTube video ID for state-related tutorial
  const videoId = "STATE_VIDEO_ID"; // Replace with actual state-related video ID

  return (
    <div className="container mx-auto px-4 py-4 bg-brand dark:bg-gray-900">
      {/* Header Section */}
      <div className="flex items-center gap-4 mb-4">
        <YoutubeButton videoId={videoId} />
        <h1 className="text-2xl font-bold flex-1 text-blue-400">States</h1>
        <Button
          className="bg-blue-300 hover:bg-blue-700 text-white rounded-full cursor-pointer"
          onClick={() => navigate("/states/create")}
        >
          <span className="hidden sm:inline">{t("button.create")}</span>
          <span className="sm:hidden">{t("button.create")}</span>
        </Button>
      </div>

      <SummaryCards data={summaryData} module="states" />

      {/* Scrollable Content Area */}
      <div className="mt-4 h-[calc(100vh-350px)] overflow-y-auto overflow-x-hidden border rounded-lg scroll-smooth [scrollbar-gutter:stable]">
        {viewMode === "grid" ? (
          <StateGrid setViewMode={setViewMode} />
        ) : (
          <StateDataTable viewMode={viewMode} setViewMode={setViewMode} />
        )}
      </div>
    </div>
  );
}
