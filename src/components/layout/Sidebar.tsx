import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  Search,
  LayoutDashboard,
  ShoppingCart,
  UtensilsCrossed,
  Users,
  X,
  Globe,
  Settings,
  Package,
  List,
  FileText,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Building2,
  Map,
  DollarSign,
} from "lucide-react";
import clsx from "clsx";
import { useTheme } from "@/hooks/useTheme";

const Sidebar = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("search");
  const [subSidebarWidth, setSubSidebarWidth] = useState("w-0");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("general");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const isRTL = i18n.language === "ar";

  const fixedTopMenus = [
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
  ];

  const scrollableMenus = [
    {
      key: "users",
      icon: Users,
      label: t("sidebar.menu.users"),
      path: "/users",
    },
    {
      key: "user-master",
      icon: Users,
      label: t("sidebar.menu.userMaster"),
      path: "/user-master",
    },
    {
      key: "states",
      icon: Map,
      label: t("sidebar.menu.states"),
      path: "/states",
    },
    {
      key: "cities",
      icon: Building2,
      label: t("sidebar.menu.cities"),
      path: "/cities",
    },
    {
      key: "areas",
      icon: Map,
      label: t("sidebar.menu.areas"),
      path: "/areas",
    },
    {
      key: "currencies",
      icon: DollarSign,
      label: t("sidebar.menu.currencies"),
      path: "/currencies",
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
    {
      key: "category",
      icon: List,
      label: t("sidebar.menu.category"),
      path: "/categories",
    },
    {
      key: "product",
      icon: Package,
      label: t("sidebar.menu.product"),
      path: "/products",
    },
    {
      key: "order",
      icon: ShoppingCart,
      label: t("sidebar.menu.order"),
      path: "/orders",
    },
    {
      key: "report",
      icon: FileText,
      label: t("sidebar.menu.report"),
      path: "/reports",
    },
  ];

  const fixedBottomMenus = [
    {
      key: "settings",
      icon: Settings,
      label: t("sidebar.menu.settings"),
      path: "/settings",
    },
    {
      key: "theme",
      icon: theme === "dark" ? Sun : Moon,
      label:
        theme === "dark" ? t("navbar.theme.light") : t("navbar.theme.dark"),
      action: toggleTheme,
    },
  ];

  const handleMenuClick = (key: string, path?: string, action?: () => void) => {
    setActiveMenu(key);
    if (action) {
      action();
    } else if (path) {
      setSubSidebarWidth("w-72");
      navigate(path);
    }
  };

  const closeSubSidebar = () => setSubSidebarWidth("w-0");
  const handleTabClick = (tab: string) => setActiveTab(tab);
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div className="flex h-screen relative">
      {/* Collapse/Expand Button */}
      <button
        onClick={toggleSidebar}
        className={clsx(
          "absolute z-10 w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-all",
          isRTL
            ? isCollapsed
              ? "right-0 translate-x-1/32"
              : "right-[6rem] translate-x-1/32"
            : isCollapsed
            ? "left-0 -translate-x-1/32"
            : "left-[6rem] -translate-x-1/32"
        )}
        style={{ top: "7%", transform: "translateY(-50%)" }}
      >
        {isCollapsed ? (
          isRTL ? (
            <ChevronLeft className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )
        ) : isRTL ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>

      {/* Main Sidebar */}
      <div
        className={clsx(
          "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300 h-[calc(100vh-4rem)]",
          isRTL ? "border-l" : "border-r",
          isCollapsed ? "w-0 overflow-hidden" : "w-32"
        )}
      >
        {/* Top Fixed Menus */}
        {!isCollapsed && (
          <div className="space-y-2 w-full px-2">
            {fixedTopMenus.map(({ key, icon: Icon, label, path }) => (
              <button
                key={key}
                className={clsx(
                  "relative group flex flex-col items-center transition-all w-full py-2",
                  {
                    "text-blue-500 border-b": activeMenu === key,
                    "text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800":
                      activeMenu !== key,
                  }
                )}
                onClick={() => handleMenuClick(key, path)}
              >
                <div className="flex flex-col items-center w-full">
                  <Icon className="w-6 h-6" />
                  <span className="text-xs mt-2 whitespace-nowrap">
                    {label}
                  </span>
                </div>
                {activeMenu === key && (
                  <div
                    className={clsx(
                      "absolute h-full w-1.5 bg-blue-500 rounded-full top-0",
                      isRTL ? "right-0" : "left-0"
                    )}
                  />
                )}
              </button>
            ))}
          </div>
        )}

        {/* Scrollable Middle Menus */}
        {!isCollapsed && (
          <div className="flex-1 overflow-y-auto py-2 px-2 smooth-scroll scroll-smooth">
            {scrollableMenus.map(({ key, icon: Icon, label, path }) => (
              <button
                key={key}
                className={clsx(
                  "relative group flex flex-col items-center transition-all w-full my-2 py-2",
                  {
                    "text-blue-500 border-b": activeMenu === key,
                    "text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800":
                      activeMenu !== key,
                  }
                )}
                onClick={() => handleMenuClick(key, path)}
              >
                <div className="flex flex-col items-center w-full">
                  <Icon className="w-6 h-6" />
                  <span className="text-xs mt-2 whitespace-nowrap">
                    {label}
                  </span>
                </div>
                {activeMenu === key && (
                  <div
                    className={clsx(
                      "absolute h-full w-1.5 bg-blue-500 rounded-full top-0",
                      isRTL ? "right-0" : "left-0"
                    )}
                  />
                )}
              </button>
            ))}
          </div>
        )}

        {/* Bottom Fixed Menus */}
        {!isCollapsed && (
          <div className="space-y-8 w-full px-2 py-4">
            {fixedBottomMenus.map(
              ({ key, icon: Icon, label, path, action }) => (
                <button
                  key={key}
                  className={clsx(
                    "relative group flex flex-col items-center transition-all w-full py-1",
                    {
                      " border-b text-blue-500": activeMenu === key,
                      "text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800":
                        activeMenu !== key,
                    }
                  )}
                  onClick={() => handleMenuClick(key, path, action)}
                >
                  <div className="flex flex-col items-center w-full">
                    <Icon className="w-6 h-6" />
                    <span className="text-xs mt-2 whitespace-nowrap">
                      {label}
                    </span>
                  </div>
                  {activeMenu === key && path && (
                    <div
                      className={clsx(
                        "absolute h-full w-1.5 bg-blue-500 rounded-full top-0",
                        isRTL ? "right-0" : "left-0"
                      )}
                    />
                  )}
                </button>
              )
            )}
          </div>
        )}
      </div>

      {/* Sub Sidebar */}
      <div
        className={clsx(
          "transition-all duration-300 overflow-hidden bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 relative flex flex-col",
          subSidebarWidth,
          isRTL ? "border-l" : "border-r"
        )}
        dir={i18n.language}
      >
        {subSidebarWidth === "w-72" && (
          <>
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

            <div className="flex flex-col flex-1 p-4 pt-8 overflow-y-auto">
              {activeMenu === "search" && (
                <>
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
                  <div className="flex gap-2 mb-4">
                    {["general", "favourite", "recent"].map((tab) => (
                      <button
                        key={tab}
                        className={clsx(
                          "px-3 py-1 rounded text-sm",
                          activeTab === tab
                            ? "bg-blue-100 dark:bg-blue-900 text-blue-500 dark:text-blue-300"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                        )}
                        onClick={() => handleTabClick(tab)}
                      >
                        {t(`sidebar.search.tabs.${tab}`)}
                      </button>
                    ))}
                  </div>
                </>
              )}

              <div className="flex-1">
                {activeMenu === "search" && searchQuery && (
                  <p
                    className={clsx(
                      "text-sm text-gray-600 dark:text-gray-300",
                      isRTL ? "text-right" : "text-left"
                    )}
                  >
                    {t("sidebar.search.results", { query: searchQuery })}
                  </p>
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
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
