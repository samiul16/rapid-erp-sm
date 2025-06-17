import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom"; // Add this import
import {
  Search,
  LayoutDashboard,
  ShoppingCart,
  UtensilsCrossed,
  Users,
  X,
  Globe,
} from "lucide-react";
import clsx from "clsx";

const Sidebar = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate(); // Initialize useNavigate
  const [activeMenu, setActiveMenu] = useState("search");
  const [subSidebarWidth, setSubSidebarWidth] = useState("w-0");
  const [searchQuery, setSearchQuery] = useState("");

  const isRTL = i18n.language === "ar";

  const menuItems = [
    {
      key: "search",
      icon: Search,
      label: t("sidebar.menu.search"),
      path: "/search",
    },
    {
      key: "dashboard",
      icon: LayoutDashboard,
      label: t("sidebar.menu.dashboard"),
      path: "/dashboard",
    },
    {
      key: "pos",
      icon: ShoppingCart,
      label: t("sidebar.menu.pos"),
      path: "/pos",
    },
    {
      key: "table",
      icon: UtensilsCrossed,
      label: t("sidebar.menu.table"),
      path: "/tables",
    },
    {
      key: "waiters",
      icon: Users,
      label: t("sidebar.menu.waiters"),
      path: "/waiters",
    },
    {
      key: "country",
      icon: Globe,
      label: t("sidebar.menu.country"),
      path: "/countries",
    },
  ];

  const handleMenuClick = (key: string, path: string) => {
    setActiveMenu(key);
    setSubSidebarWidth("w-64");
    navigate(path); // Navigate to the corresponding page
  };

  const closeSubSidebar = () => {
    setSubSidebarWidth("w-0");
  };

  return (
    <div className="flex h-screen">
      {/* Main Sidebar */}
      <div
        className={clsx(
          "w-16 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 flex flex-col items-center py-4 space-y-4",
          isRTL ? "border-l" : "border-r"
        )}
      >
        {menuItems.map(({ key, icon: Icon, label, path }) => (
          <button
            key={key}
            className={clsx(
              "relative group flex flex-col items-center transition-all",
              {
                "text-blue-500 dark:text-blue-400": activeMenu === key,
                "text-gray-500 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400":
                  activeMenu !== key,
              }
            )}
            onClick={() => handleMenuClick(key, path)}
          >
            <Icon className="w-6 h-6" />
            <span className="text-[10px] mt-1 whitespace-nowrap">{label}</span>
            {/* Active indicator */}
            {activeMenu === key && (
              <div
                className={clsx(
                  "absolute h-8 w-1 bg-blue-500 rounded-full",
                  isRTL ? "left-0" : "right-0"
                )}
              />
            )}
          </button>
        ))}
      </div>

      {/* Sub Sidebar */}
      <div
        className={clsx(
          "transition-all duration-300 overflow-hidden bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 relative",
          subSidebarWidth,
          isRTL ? "border-l" : "border-r"
        )}
        dir={i18n.language}
      >
        {subSidebarWidth === "w-64" && (
          <>
            {/* Close Button */}
            <button
              onClick={closeSubSidebar}
              className={clsx(
                "absolute top-2 p-1 mb-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-300 cursor-pointer",
                isRTL ? "left-2" : "right-2"
              )}
              aria-label={t("sidebar.close")}
            >
              <X className="w-4 h-4" />
            </button>

            {/* Submenu Content */}
            <div className="flex flex-col p-4 pt-8">
              {activeMenu === "search" && (
                <>
                  <div className="flex gap-2 mb-4">
                    <button className="px-3 py-1 rounded bg-brand text-gray-700 dark:text-gray-300 text-sm">
                      {t("sidebar.search.tabs.general")}
                    </button>
                    <button className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-300">
                      {t("sidebar.search.tabs.favourite")}
                    </button>
                    <button className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-300">
                      {t("sidebar.search.tabs.recent")}
                    </button>
                  </div>
                  <div className="mb-4">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder={t("sidebar.search.placeholder")}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={clsx(
                          "w-full pl-8 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand",
                          isRTL ? "text-right pr-8 pl-4" : "text-left pl-8 pr-4"
                        )}
                      />
                      <Search
                        className={clsx(
                          "absolute top-2.5 h-4 w-4 text-gray-400",
                          isRTL ? "right-2" : "left-2"
                        )}
                      />
                    </div>
                  </div>
                  {searchQuery && (
                    <p
                      className={clsx(
                        "text-sm text-gray-600 dark:text-gray-300",
                        isRTL ? "text-right" : "text-left"
                      )}
                    >
                      {t("sidebar.search.results", { query: searchQuery })}
                    </p>
                  )}
                </>
              )}

              {activeMenu === "dashboard" && (
                <div className={isRTL ? "text-right" : "text-left"}>
                  <h3 className="font-medium mb-2">
                    {t("sidebar.dashboard.title")}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {t("sidebar.dashboard.content")}
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
