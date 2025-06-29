/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  X,
  MoreHorizontal,
  Archive,
  Trash2,
  Edit,
  Eye,
  Settings,
  CheckCircle2,
} from "lucide-react";

type TabId = "total" | "draft" | "active" | "inactive" | "deleted" | "updated";
type TabColor = "blue" | "orange" | "green" | "gray" | "red";

interface TabData {
  count: number;
  unread: number;
  color: TabColor;
}

interface TabConfig {
  id: TabId;
  label: string;
  icon: any;
  description: string;
}

const GmailTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>("total");
  const [hiddenTabs, setHiddenTabs] = useState<TabId[]>([]);

  // Sample data for demonstration
  const tabData: Record<TabId, TabData> = {
    total: { count: 1247, unread: 23, color: "blue" },
    draft: { count: 8, unread: 0, color: "orange" },
    active: { count: 892, unread: 15, color: "green" },
    inactive: { count: 203, unread: 3, color: "gray" },
    deleted: { count: 144, unread: 5, color: "red" },
    updated: { count: 144, unread: 5, color: "green" },
  };

  const tabConfig: TabConfig[] = [
    {
      id: "total",
      label: "Total",
      icon: Eye,
      description: "All items",
    },
    {
      id: "draft",
      label: "Draft",
      icon: Edit,
      description: "Draft items",
    },
    {
      id: "active",
      label: "Active",
      icon: Archive,
      description: "Active items",
    },
    {
      id: "inactive",
      label: "Inactive",
      icon: Settings,
      description: "Inactive items",
    },
    {
      id: "updated",
      label: "Updated",
      icon: CheckCircle2,
      description: "Updated items",
    },
    {
      id: "deleted",
      label: "Deleted",
      icon: Trash2,
      description: "Deleted items",
    },
  ];

  const visibleTabs = tabConfig.filter((tab) => !hiddenTabs.includes(tab.id));
  const availableHiddenTabs = tabConfig.filter((tab) =>
    hiddenTabs.includes(tab.id)
  );

  const getTabColorClasses = (color: TabColor, isActive: boolean): string => {
    const colors: Record<TabColor, string> = {
      blue: isActive
        ? "text-blue-600 border-blue-600 bg-blue-50"
        : "text-gray-600 hover:text-blue-600 border-transparent hover:border-blue-300",
      orange: isActive
        ? "text-orange-600 border-orange-600 bg-orange-50"
        : "text-gray-600 hover:text-orange-600 border-transparent hover:border-orange-300",
      green: isActive
        ? "text-green-600 border-green-600 bg-green-50"
        : "text-gray-600 hover:text-green-600 border-transparent hover:border-green-300",
      gray: isActive
        ? "text-gray-600 border-gray-600 bg-gray-50"
        : "text-gray-600 hover:text-gray-700 border-transparent hover:border-gray-300",
      red: isActive
        ? "text-red-600 border-red-600 bg-red-50"
        : "text-gray-600 hover:text-red-600 border-transparent hover:border-red-300",
    };
    return colors[color] || colors.blue;
  };

  const getCountColorClasses = (color: TabColor): string => {
    const colors: Record<TabColor, string> = {
      blue: "bg-blue-100 text-blue-800",
      orange: "bg-orange-100 text-orange-800",
      green: "bg-green-100 text-green-800",
      gray: "bg-gray-100 text-gray-800",
      red: "bg-red-100 text-red-800",
    };
    return colors[color] || colors.blue;
  };

  const hideTab = (tabId: TabId, e: React.MouseEvent): void => {
    e.stopPropagation();
    setHiddenTabs([...hiddenTabs, tabId]);
    if (activeTab === tabId) {
      setActiveTab("total");
    }
  };

  const showTab = (tabId: TabId): void => {
    setHiddenTabs(hiddenTabs.filter((id) => id !== tabId));
  };

  return (
    <div className="w-full mx-auto bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Tab Header */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="flex items-center">
          {/* Visible Tabs */}
          <div className="flex flex-1 overflow-x-auto scrollbar-hide">
            {visibleTabs.map((tab) => {
              const data = tabData[tab.id];
              const isActive = activeTab === tab.id;

              return (
                <div
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    relative flex items-center gap-2 px-4 py-3  cursor-pointer border-b-2 transition-all duration-200 min-w-fit whitespace-nowrap group
                    ${getTabColorClasses(data.color, isActive)}
                  `}
                >
                  <tab.icon className="h-4 w-4" />
                  <span className="font-medium">{tab.label}</span>

                  {/* Count badge */}
                  <span
                    className={`
                    px-2 py-0.5 rounded-full text-xs font-medium transition-colors
                    ${
                      isActive
                        ? `${getCountColorClasses(data.color)}`
                        : "bg-blue-500 text-white group-hover:bg-gray-300"
                    }
                  `}
                  >
                    {data.count}
                  </span>

                  {/* Unread indicator */}
                  {data.unread > 0 && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}

                  {/* Close button - only show on hover and not for total tab */}
                  {tab.id !== "total" && (
                    <button
                      onClick={(e) => hideTab(tab.id, e)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity ml-1 p-0.5 rounded hover:bg-gray-200"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* More menu for hidden tabs */}
          {availableHiddenTabs.length > 0 && (
            <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 border-b-2 border-transparent">
                <MoreHorizontal className="h-4 w-4" />
                <span className="text-sm">More</span>
              </button>

              {/* Dropdown for hidden tabs */}
              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 min-w-48">
                <div className="py-2">
                  {availableHiddenTabs.map((tab) => {
                    const data = tabData[tab.id];
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          showTab(tab.id);
                          setActiveTab(tab.id);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors"
                      >
                        <tab.icon className="h-4 w-4 text-gray-500" />
                        <span className="flex-1">{tab.label}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${getCountColorClasses(
                            data.color
                          )}`}
                        >
                          {data.count}
                        </span>
                        {data.unread > 0 && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GmailTabs;
