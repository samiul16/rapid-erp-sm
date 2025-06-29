import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Edit, FileText, Printer, History, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import YoutubeButton from "@/components/common/YoutubeButton";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";

export default function CurrencyDetailsPage() {
  const { t } = useTranslation();
  const [keepChanges, setKeepChanges] = useState(false);
  const navigate = useNavigate();

  const currencyData = {
    code: "USD",
    name: "US Dollar",
    symbol: "$",
    rating: 4.5,
    isDefault: true,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: "2023-01-10T09:15:00Z",
    updatedAt: "2023-12-05T16:30:00Z",
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

  return (
    <div className="container mx-auto px-4 py-4 flex flex-col min-h-screen dark:bg-gray-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
        <div className="flex items-center gap-2">
          <YoutubeButton videoId="CURRENCY_VIDEO_ID" />
          <h1 className="text-xl font-bold text-blue-400">
            {t("button.viewingCurrency")}
          </h1>
        </div>
        <div className="flex gap-2 w-full sm:w-auto justify-end">
          <Button
            variant="outline"
            size="sm"
            className="gap-1 hover:bg-blue-600 hover:text-white cursor-pointer"
            onClick={() => navigate("/currencies/1/edit")}
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
            {/* Currency Code */}
            <div className="md:col-span-3">
              <h3 className="font-medium text-sm mb-1">{t("form.code")}</h3>
              <input
                type="text"
                value={currencyData.code}
                readOnly
                className="border rounded px-2 py-1 text-sm w-full dark:bg-gray-700"
              />
            </div>

            {/* Currency Name */}
            <div className="md:col-span-3">
              <h3 className="font-medium text-sm mb-1">{t("form.currency")}</h3>
              <input
                type="text"
                value={currencyData.name}
                readOnly
                className="border rounded px-2 py-1 text-sm w-full dark:bg-gray-700"
              />
            </div>

            {/* Rating */}
            <div className="md:col-span-3">
              <h3 className="font-medium text-sm mb-1">{t("form.rating")}</h3>
              <input
                type="text"
                value={currencyData.rating}
                readOnly
                className="border rounded px-2 py-1 text-sm w-full dark:bg-gray-700"
              />
            </div>

            {/* Symbol */}
            <div className="md:col-span-3">
              <h3 className="font-medium text-sm mb-1">{t("form.symbol")}</h3>
              <input
                type="text"
                value={currencyData.symbol}
                readOnly
                className="border rounded px-2 py-1 text-sm w-full dark:bg-gray-700"
              />
            </div>

            {/* Toggles */}
            <div className="md:col-span-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 pt-2">
              {[
                { label: t("common.active"), value: currencyData.isActive },
                { label: t("common.draft"), value: currencyData.isDraft },
                { label: t("button.delete"), value: currencyData.isDeleted },
                { label: t("common.default"), value: currencyData.isDefault },
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
                { label: "Created", value: currencyData.createdAt },
                { label: "Updated", value: currencyData.updatedAt },
                { label: "Drafted", value: currencyData.draftedAt },
                { label: "Deleted", value: currencyData.deletedAt },
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
