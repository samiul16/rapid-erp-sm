import { useState } from "react";
import { Button } from "@/components/ui/button";
import SummaryCards from "./SummaryCards";
import UsersGrid from "./UsersGrid";
import UsersDataTable from "./UsersDataTable";
import YoutubeButton from "@/components/common/YoutubeButton";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function UsersPage() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { t } = useTranslation();

  // Mock data - replace with real data from your API
  const summaryData = {
    total: 42,
    draft: 5,
    active: 30,
    inactive: 5,
    deleted: 2,
  };

  // YouTube video ID (the part after 'v=' in the URL)
  const videoId = "PcVAyB3nDD4";

  return (
    <div className="container mx-auto px-4 py-4 dark:bg-gray-900">
      {/* Header Section */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <YoutubeButton videoId={videoId} />
        <h1 className="text-2xl font-bold flex-1 text-blue-400 min-w-[200px]">
          {t("users.title")}
        </h1>
        <Button
          className="bg-blue-400 hover:bg-blue-700 text-white rounded-full cursor-pointer"
          onClick={() => navigate("/users/create")}
        >
          {t("button.create")}
        </Button>
      </div>

      <SummaryCards data={summaryData} />

      {/* View Controls Section */}

      {/* Scrollable Content Area */}
      <div className="mt-4 h-[calc(100vh-350px)] overflow-y-auto overflow-x-hidden border rounded-lg scroll-smooth [scrollbar-gutter:stable]">
        {viewMode === "grid" ? (
          <UsersGrid setViewMode={setViewMode} />
        ) : (
          <UsersDataTable viewMode={viewMode} setViewMode={setViewMode} />
        )}
      </div>
    </div>
  );
}
