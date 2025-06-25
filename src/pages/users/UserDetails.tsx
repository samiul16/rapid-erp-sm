import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Edit, FileText, Printer, History, Download, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import YoutubeButton from "@/components/common/YoutubeButton";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";

export default function UserDetailsPage() {
  const { t } = useTranslation();
  const [keepChanges, setKeepChanges] = useState(false);
  const navigate = useNavigate();

  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    isActive: true,
    isInactive: false,
    isDefault: false,
    isDraft: false,
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    createdAt: "2023-05-15T10:30:00Z",
    updatedAt: "2023-11-20T14:45:00Z",
    draftedAt: null,
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
    <div className="container mx-auto px-4 py-6 flex flex-col min-h-screen dark:bg-gray-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-4">
          <YoutubeButton videoId="PcVAyB3nDD4" />
          <h1 className="text-2xl font-bold text-blue-400">
            {t("button.viewingUser")}
          </h1>
        </div>
        <div className="flex gap-2 w-full sm:w-auto justify-end">
          <Button
            variant="outline"
            className="gap-2 hover:bg-blue-600 hover:text-white cursor-pointer"
            onClick={() => navigate("/users/1/edit")}
          >
            <Edit className="h-4 w-4" />
            {t("button.edit")}
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1">
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6 dark:bg-gray-800 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Avatar */}
            <div>
              <h3 className="font-medium mb-1">Avatar</h3>
              <div className="w-16 h-16 border rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
                {userData.avatar ? (
                  <img
                    src={userData.avatar}
                    alt="User Avatar"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <User className="h-8 w-8 text-gray-400" />
                )}
              </div>
            </div>

            {/* Name and Email */}
            <div>
              <h3 className="font-medium mb-1">Name</h3>
              <p className="text-gray-700 dark:text-gray-200">
                {userData.name}
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-1">Email</h3>
              <p className="text-gray-700 dark:text-gray-200">
                {userData.email}
              </p>
            </div>

            {/* Empty column for alignment */}
            <div></div>

            {/* Toggles in one line */}
            <div className="col-span-full grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              <div className="flex items-center gap-3">
                <div>
                  <h3 className="font-medium mb-1">Active</h3>
                  <Switch
                    checked={userData.isActive}
                    disabled
                    className="data-[state=checked]:bg-blue-400"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div>
                  <h3 className="font-medium mb-1">Inactive</h3>
                  <Switch
                    checked={userData.isInactive}
                    disabled
                    className="data-[state=checked]:bg-blue-400"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div>
                  <h3 className="font-medium mb-1">Default</h3>
                  <Switch
                    checked={userData.isDefault}
                    disabled
                    className="data-[state=checked]:bg-blue-400"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div>
                  <h3 className="font-medium mb-1">Draft</h3>
                  <Switch
                    checked={userData.isDraft}
                    disabled
                    className="data-[state=checked]:bg-blue-400"
                  />
                </div>
              </div>
            </div>

            {/* Dates */}
            <div>
              <h3 className="font-medium mb-1">Created</h3>
              <p>{formatDate(userData.createdAt)}</p>
            </div>

            <div>
              <h3 className="font-medium mb-1">Updated</h3>
              <p>{formatDate(userData.updatedAt)}</p>
            </div>

            <div>
              <h3 className="font-medium mb-1">Drafted</h3>
              <p>{formatDate(userData.draftedAt)}</p>
            </div>

            {/* Empty column for alignment */}
            <div></div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 bg-white border py-4 px-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch
              checked={keepChanges}
              className="data-[state=checked]:bg-blue-400"
              onCheckedChange={setKeepChanges}
              aria-label={t("button.keepChanges")}
            />
            <span>{t("button.keepChanges")}</span>

            <Button
              variant="outline"
              size="sm"
              className="gap-2 cursor-pointer text-white bg-blue-400 hover:bg-blue-600 hover:text-white"
              onClick={handleExportPDF}
            >
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">PDF</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 cursor-pointer text-white bg-blue-400 hover:bg-blue-600 hover:text-white"
              onClick={handlePrint}
            >
              <Printer className="h-4 w-4" />
              <span className="hidden sm:inline">Print</span>
            </Button>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 cursor-pointer text-white bg-blue-400 hover:bg-blue-600 hover:text-white"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 cursor-pointer text-white bg-blue-400 hover:bg-blue-600 hover:text-white"
            >
              <History className="h-4 w-4" />
              <span className="hidden sm:inline">History</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
