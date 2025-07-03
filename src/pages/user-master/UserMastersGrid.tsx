import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Trash2,
  List,
  Import,
  Download,
  Filter,
  Mic,
  Search,
  RefreshCw,
  Facebook,
  Linkedin,
  Instagram,
  Mail,
  Phone,
} from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import GridFilterComponent from "@/pages/Country/GridFilterComponent";
import GridExportComponent from "@/pages/Country/GridExportComponent";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import ImportStepper from "@/components/common/ImportStepper";

// Mock data - replace with real data from your API
const users = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    facebook: "john.doe",
    linkedin: "john-doe",
    instagram: "johndoe",
    status: "active",
    createdAt: "2024-01-01",
    updatedAt: "2024-06-01",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 (555) 987-6543",
    facebook: "jane.smith",
    linkedin: "jane-smith",
    instagram: "janesmith",
    status: "inactive",
    createdAt: "2024-02-10",
    updatedAt: "2024-06-02",
  },
];

export default function UserMastersGrid({
  setViewMode,
}: {
  setViewMode: (viewMode: "grid" | "list") => void;
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [, setIsShowResetButton] = useState(false);
  const [usersData, setUsersData] = useState(users);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [modalData, setModalData] = useState({
    title: "Import User",
    message: <ImportStepper />,
  });

  const handleDeleteClick = (userId: string) => {
    setUserToDelete(userId);
    setIsShowResetButton(true);
  };

  const handleViewModeChange = (viewMode: "grid" | "list") => {
    setViewMode(viewMode);
  };

  const toggleStatus = (userId: string) => {
    setUsersData((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? {
              ...user,
              status: user.status === "active" ? "inactive" : "active",
            }
          : user
      )
    );
  };

  // Filter users based on search query
  const filteredUsers = usersData.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-4 py-3 h-full flex flex-col bg-white dark:bg-gray-900">
      {/* Fixed header controls */}
      <div className="sticky top-0 z-50 bg-white dark:bg-gray-900 pb-2">
        <div className="grid grid-cols-12 gap-4 items-center">
          {/* Left buttons */}
          <div className="col-span-4 flex items-center gap-2">
            <Button
              variant="outline"
              className="gap-2 cursor-pointer"
              onClick={() => handleViewModeChange("list")}
            >
              <List className="h-4 w-4" />
              <span className="hidden sm:inline">List</span>
            </Button>
            <Button
              variant="outline"
              className="gap-2 cursor-pointer"
              onClick={() => {
                console.log("Import User Modal open");
                open();
                setModalData({
                  title: "Import User",
                  message: <ImportStepper />,
                });
              }}
            >
              <Import className="h-4 w-4" />
              <span className="hidden sm:inline">{t("common.import")}</span>
            </Button>
          </div>

          {/* Search */}
          <div className="col-span-4 flex justify-center">
            <div className="w-full max-w-md">
              <div className="relative flex items-center rounded-full">
                <Search className="absolute left-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search..."
                  className="pl-9 pr-9 w-full rounded-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-2 h-6 w-6 rounded-full cursor-pointer p-0"
                >
                  <Mic className="h-4 w-4 text-blue-400" />
                </Button>
              </div>
            </div>
          </div>

          {/* Right buttons */}
          <div className="col-span-4 flex items-center justify-end gap-2">
            <Button
              variant="outline"
              className={`gap-2 cursor-pointer hover:bg-blue-400 hover:text-white ${
                isExportOpen ? "bg-blue-400 text-white" : ""
              }`}
              onClick={() => {
                setIsExportOpen(!isExportOpen);
                setIsFilterOpen(false);
              }}
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">{t("common.export")}</span>
            </Button>

            <Button
              variant="outline"
              className={`gap-2 cursor-pointer hover:bg-blue-400 hover:text-white ${
                isFilterOpen ? "bg-blue-400 text-white" : ""
              }`}
              onClick={() => {
                setIsFilterOpen(!isFilterOpen);
                setIsExportOpen(false);
              }}
            >
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">{t("common.filters")}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden mt-2">
        {/* Cards container - 75% width */}
        <div
          className={`${isFilterOpen ? "w-4/5" : "w-5/5"} pr-4 overflow-y-auto`}
        >
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pb-4">
            {filteredUsers.map((user) => (
              <Card
                key={user.id}
                className="transition-all hover:shadow-lg hover:border-gray-300 relative group dark:bg-gray-800"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3">
                  <CardTitle
                    className="text-sm font-medium hover:text-blue-600 cursor-pointer"
                    onClick={() => navigate(`/users/${user.id}`)}
                  >
                    {user.name}
                  </CardTitle>
                  <span
                    className={`px-2 py-1 text-xs rounded-full cursor-pointer ${
                      user.status === "active"
                        ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200"
                        : user.status === "inactive"
                        ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-200"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200"
                    }`}
                    onClick={() => toggleStatus(user.id)}
                  >
                    {user.status}
                  </span>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <div className="flex flex-col gap-2">
                    {/* Email */}
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="truncate">{user.email}</span>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>{user.phone}</span>
                    </div>

                    {/* Social Media Icons */}
                    <div className="flex flex-col gap-2 pt-2">
                      {/* Facebook - Row 1 */}
                      {user.facebook && (
                        <a
                          href={`${
                            user.facebook.startsWith("http") ? "" : "https://"
                          }${user.facebook}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <Facebook className="h-4 w-4" />
                          <span className="text-xs truncate">Facebook</span>
                        </a>
                      )}

                      {/* LinkedIn - Row 2 */}
                      {user.linkedin && (
                        <a
                          href={`${
                            user.linkedin.startsWith("http") ? "" : "https://"
                          }${user.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-700 hover:text-blue-900 dark:text-blue-500 dark:hover:text-blue-400"
                        >
                          <Linkedin className="h-4 w-4" />
                          <span className="text-xs truncate">LinkedIn</span>
                        </a>
                      )}

                      {/* Instagram - Row 3 */}
                      {user.instagram && (
                        <a
                          href={`${
                            user.instagram.startsWith("http") ? "" : "https://"
                          }${user.instagram}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-pink-600 hover:text-pink-800 dark:text-pink-400 dark:hover:text-pink-300"
                        >
                          <Instagram className="h-4 w-4" />
                          <span className="text-xs truncate">Instagram</span>
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end items-center mt-3">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      {userToDelete === user.id ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900 h-6 w-6 p-0"
                          onClick={() => setUserToDelete(null)}
                        >
                          <RefreshCw className="h-3 w-3" />
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900 h-6 w-6 p-0"
                          onClick={() => handleDeleteClick(user.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Filter component - 25% width */}
        <div
          className={`${
            isFilterOpen ? "w-1/5" : "w-0"
          } pl-4 dark:border-gray-700`}
        >
          {isFilterOpen && (
            <GridFilterComponent
              data={usersData}
              setFilteredData={setUsersData}
              setShowFilter={setIsShowResetButton}
            />
          )}
        </div>

        {/* Export component - 25% width */}
        <div
          className={`${
            isExportOpen ? "w-1/5" : "w-0"
          } pl-4 dark:border-gray-700`}
        >
          {isExportOpen && (
            <GridExportComponent
              data={usersData}
              setFilteredData={setUsersData}
              setIsExportOpen={setIsExportOpen}
            />
          )}
        </div>
      </div>

      <Modal
        opened={opened}
        onClose={close}
        title="Import User"
        size="xl"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <div className="pt-5 pb-14 px-5">{modalData.message}</div>
      </Modal>
    </div>
  );
}
