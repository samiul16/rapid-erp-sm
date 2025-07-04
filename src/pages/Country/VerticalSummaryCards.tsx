import React from "react";
import { FileEdit, CheckCircle, PauseCircle, Trash2 } from "lucide-react";

type SummaryCardsProps = {
  data: {
    total: number;
    draft: number;
    active: number;
    inactive: number;
    deleted: number;
    updated: number;
  };
};

type CardData = {
  key: keyof SummaryCardsProps["data"];
  title: string;
  icon: React.ReactNode;
  color: string;
  total: number;
};

const colorMap: Record<string, string> = {
  green: "from-green-400 to-green-500",
  yellow: "from-yellow-400 to-yellow-500",
  gray: "from-gray-500 to-gray-600",
  red: "from-red-400 to-red-500",
  blue: "from-blue-400 to-blue-500",
  purple: "from-purple-400 to-purple-500",
};

export default function HorizontalProgressCards({ data }: SummaryCardsProps) {
  const calculatePercentage = (value: number) => {
    return data.total > 0 ? Math.round((value / data.total) * 100) : 0;
  };

  const cardConfigs: CardData[] = [
    {
      key: "total",
      title: "TOTAL COUNTRIES",
      icon: <CheckCircle size={24} className="text-blue-600" />,
      color: "blue",
      total: data.total,
    },
    {
      key: "active",
      title: "ACTIVE COUNTRIES",
      icon: <CheckCircle size={24} className="text-green-700" />,
      color: "green",
      total: data.active,
    },
    {
      key: "draft",
      title: "DRAFT COUNTRIES",
      icon: <FileEdit size={24} className="text-yellow-700" />,
      color: "yellow",
      total: data.draft,
    },
    {
      key: "updated",
      title: "UPDATED COUNTRIES",
      icon: <CheckCircle size={24} className="text-purple-600" />,
      color: "purple",
      total: data.updated,
    },
    {
      key: "inactive",
      title: "INACTIVE COUNTRIES",
      icon: <PauseCircle size={24} className="text-gray-700" />,
      color: "gray",
      total: data.inactive,
    },
    {
      key: "deleted",
      title: "DELETED COUNTRIES",
      icon: <Trash2 size={24} className="text-red-600" />,
      color: "red",
      total: data.deleted,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-2">
      {cardConfigs.map((config) => {
        const percentage = calculatePercentage(config.total);
        const barColor = colorMap[config.color];

        return (
          <div
            key={config.key}
            className="flex items-center bg-white shadow-xl overflow-hidden p-5 h-20 cursor-pointer"
          >
            {/* Icon */}
            <div
              className="w-14 h-14 bg-white flex items-center justify-center rounded-full shadow-xl z-10 relative border-3 border-white
                        -mr-1 rtl:mr-0 rtl:-ml-1
                        [box-shadow:0_25px_50px_-12px_rgba(0,0,0,0.25),inset_0_4px_8px_0_rgba(0,0,0,0.2)]"
            >
              {config.icon}
            </div>

            {/* Progress Bar */}
            <div className="flex-1 h-10 relative -ml-9 rtl:-mr-9 rtl:ml-0">
              <div className="h-full w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full flex items-center justify-between text-white font-semibold px-4 text-sm transition-all duration-500 ease-out bg-gradient-to-r ${barColor} rounded-full`}
                  style={{ width: `${Math.max(percentage, 15)}%` }}
                >
                  <span className="whitespace-nowrap ml-8 rtl:ml-0 rtl:mr-8">
                    {config.title}
                  </span>
                  <span>{percentage}%</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
