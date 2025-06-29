import { useState } from "react";
import { Button } from "@/components/ui/button";
import SummaryCards from "@/pages/states/SummaryCards";
import CurrencyGrid from "@/pages/currencies/CurrenciesGrid";
import YoutubeButton from "@/components/common/YoutubeButton";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CurrencyDataTable from "@/pages/currencies/CurrenciesDataTable";

export default function CurrenciesPage() {
  const navigate = useNavigate();
  const [viewMode] = useState("grid");
  const { t } = useTranslation();

  // Mock data - replace with real data from your API
  const summaryData = {
    total: 15,
    draft: 1,
    active: 12,
    inactive: 2,
    deleted: 0,
  };

  // YouTube video ID for currency-related tutorial
  const videoId = "CURRENCY_VIDEO_ID"; // Replace with actual currency-related video ID

  return (
    <div className="container mx-auto px-4 py-4 bg-brand dark:bg-gray-900">
      {/* Header Section */}
      <div className="flex items-center gap-4 mb-4">
        <YoutubeButton videoId={videoId} />
        <h1 className="text-2xl font-bold flex-1 text-blue-400">Currencies</h1>
        <Button
          className="bg-blue-300 hover:bg-blue-700 text-white rounded-full cursor-pointer"
          onClick={() => navigate("/currencies/create")}
        >
          <span className="hidden sm:inline">{t("button.create")}</span>
          <span className="sm:hidden">{t("button.create")}</span>
        </Button>
      </div>

      <SummaryCards data={summaryData} module="currencies" />

      {/* Scrollable Content Area */}
      <div className="mt-4 h-[calc(100vh-350px)] overflow-y-auto overflow-x-hidden border rounded-lg scroll-smooth [scrollbar-gutter:stable]">
        {viewMode === "grid" ? <CurrencyGrid /> : <CurrencyDataTable />}
      </div>
    </div>
  );
}
