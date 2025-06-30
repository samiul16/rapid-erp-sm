import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Edit, History, Download, Trash2, Undo } from "lucide-react";
import { Button } from "@/components/ui/button";
import YoutubeButton from "@/components/common/YoutubeButton";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";
import { Modal } from "@mantine/core";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MOCK_STATES = [
  { code: "CA", name: "California" },
  { code: "NY", name: "New York" },
  { code: "TX", name: "Texas" },
  { code: "FL", name: "Florida" },
  { code: "IL", name: "Illinois" },
];

export default function StateDetailsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedState, setSelectedState] = useState("CA");

  const stateData = {
    name:
      MOCK_STATES.find((s) => s.code === selectedState)?.name || "California",
    countryCode: "US",
    countryName: "United States",
    description: "The most populous state in the United States",
    isDefault: true,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: "2023-05-15T10:30:00Z",
    updatedAt: "2023-11-20T14:45:00Z",
    draftedAt: null,
    deletedAt: null,
  };

  const formatDate = (date: string | null) => {
    if (!date) return "--/--/----";
    const d = new Date(date);
    const day = d.getDate();
    const month = d.toLocaleString("default", { month: "short" });
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const handlePrint = () => window.print();
  const handleExportPDF = () => console.log("Exporting PDF...");
  const handleDeleteRestore = () =>
    console.log(stateData.isDeleted ? "Restoring..." : "Deleting...");

  return (
    <div className="relative w-full">
      {/* Container with full height minus external footer */}
      <div className="flex flex-col h-[calc(100vh-160px)] overflow-hidden border rounded shadow bg-white dark:bg-gray-800">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white dark:bg-gray-800 border-b px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <YoutubeButton videoId="PcVAyB3nDD4" />
            <h1 className="text-xl font-bold text-blue-400">
              {t("button.viewingState")}
            </h1>
          </div>
          <Button
            variant="outline"
            className="gap-2 bg-blue-400 hover:bg-blue-600 text-white rounded-full"
            onClick={() => navigate("/states/1/edit")}
          >
            <Edit className="h-4 w-4" />
            {t("button.edit")}
          </Button>
        </div>

        {/* Scrollable Form Section */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-6">
              <h3 className="font-medium mb-1">Name</h3>
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_STATES.map((state) => (
                    <SelectItem key={state.code} value={state.code}>
                      {state.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-6">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">Country</h3>
              </div>
              <div>{stateData.countryName}</div>
              {/* <input
                type="text"
                value={`${stateData.countryCode} - ${stateData.countryName}`}
                readOnly
                className="w-full px-3 py-1.5 dark:bg-gray-700 dark:border-gray-600"
              /> */}
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-12">
              <h3 className="font-medium mb-1">Description</h3>
              <textarea
                value={stateData.description}
                readOnly
                className="w-full px-3 py-1.5 h-20 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">Default</h3>
              <Switch checked={stateData.isDefault} disabled />
            </div>
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">Draft</h3>
              <Switch checked={stateData.isDraft} disabled />
            </div>
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">Active</h3>
              <Switch checked={stateData.isActive} disabled />
            </div>
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">
                {stateData.isDeleted ? "Restore" : "Delete"}
              </h3>
              <Button variant="ghost" size="icon" onClick={handleDeleteRestore}>
                {stateData.isDeleted ? (
                  <Undo className="text-blue-500" />
                ) : (
                  <Trash2 className="text-red-500" />
                )}
              </Button>
            </div>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">Created</h3>
              <p>{formatDate(stateData.createdAt)}</p>
            </div>
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">Drafted</h3>
              <p>{formatDate(stateData.draftedAt)}</p>
            </div>
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">Updated</h3>
              <p>{formatDate(stateData.updatedAt)}</p>
            </div>
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">Deleted</h3>
              <p>{formatDate(stateData.deletedAt)}</p>
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
                  onClick={handleExportPDF}
                />
                <span className="dark:text-gray-200">PDF</span>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  className="data-[state=checked]:bg-blue-400"
                  onClick={handlePrint}
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

      {/* Modal */}
      <Modal
        opened={isOptionModalOpen}
        onClose={() => setIsOptionModalOpen(false)}
        title="Options"
        size="xl"
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
      >
        <div className="pt-5 pb-14 px-5">Modal Content</div>
      </Modal>
    </div>
  );
}
