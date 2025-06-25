import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Edit, FileText, Printer, History, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import YoutubeButton from "@/components/common/YoutubeButton";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";

export default function UserFormDetailsPage() {
  const { t } = useTranslation();
  const [keepChanges, setKeepChanges] = useState(false);
  const [showPassword] = useState(false);
  const navigate = useNavigate();

  const userData = {
    name: "John Doe",
    mobileNumber: "+12025550123",
    email: "john.doe@example.com",
    status: "active",
    password: "password123",
    confirmPassword: "password123",
    otp: "123456",
    facebook: "john.doe",
    linkedin: "john-doe",
    instagram: "@johndoe",
    createdAt: "2023-05-15T10:30:00Z",
    updatedAt: "2023-11-20T14:45:00Z",
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
            {t("button.viewingUserMaster")}
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
          {/* First Row: Name, Mobile, Email, Status */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="space-y-2">
              <Label>{t("form.name")} *</Label>
              <div className="p-2 border rounded-md text-sm">
                {userData.name}
              </div>
            </div>

            <div className="space-y-2">
              <Label>{t("form.mobileNumber")} *</Label>
              <div className="p-2 border rounded-md text-sm">
                {userData.mobileNumber}
              </div>
            </div>

            <div className="space-y-2">
              <Label>{t("form.email")} *</Label>
              <div className="p-2 border rounded-md text-sm">
                {userData.email}
              </div>
            </div>

            <div className="space-y-2">
              <Label>{t("form.status")}</Label>
              <div className="p-2 border rounded-md text-sm">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    userData.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {t(`common.${userData.status}`)}
                </span>
              </div>
            </div>
          </div>

          {/* Second Row: Password, Confirm Password, OTP */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="space-y-2">
              <Label>{t("form.password")} *</Label>
              <div className="p-2 border rounded-md text-sm">
                {showPassword ? userData.password : "••••••••"}
              </div>
            </div>

            {/* <div className="space-y-2">
              <Label>{t("form.confirmPassword")} *</Label>
              <div className="p-2 border rounded-md text-sm">
                {showConfirmPassword ? userData.confirmPassword : "••••••••"}
              </div>
            </div> */}

            <div className="space-y-2">
              <Label>{t("form.otp")}</Label>
              <div className="p-2 border rounded-md text-sm">
                {userData.otp}
              </div>
            </div>
          </div>

          {/* Third Row: Dates */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="space-y-2">
              <Label>{t("common.createdAt")}</Label>
              <div className="p-2 border rounded-md text-sm">
                {formatDate(userData.createdAt)}
              </div>
            </div>
            <div className="space-y-2">
              <Label>{t("common.updatedAt")}</Label>
              <div className="p-2 border rounded-md text-sm">
                {formatDate(userData.updatedAt)}
              </div>
            </div>
          </div>

          {/* Fourth Row: Social Media */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="space-y-2">
              <Label>{t("form.facebook")}</Label>
              <div className="p-2 border rounded-md text-sm">
                {userData.facebook}
              </div>
            </div>

            <div className="space-y-2">
              <Label>{t("form.linkedin")}</Label>
              <div className="p-2 border rounded-md text-sm">
                {userData.linkedin}
              </div>
            </div>

            <div className="space-y-2">
              <Label>{t("form.instagram")}</Label>
              <div className="p-2 border rounded-md text-sm">
                {userData.instagram}
              </div>
            </div>
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
