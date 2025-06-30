import React from "react";
import {
  Globe,
  FileEdit,
  CheckCircle,
  PauseCircle,
  Trash2,
} from "lucide-react";

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
  borderColor: string;
  showPercentage?: boolean;
  total: number;
};

const colorMap: Record<
  string,
  {
    text: string;
    bar: string;
    percentageText: string;
    border: string;
    bg: string;
  }
> = {
  blue: {
    text: "text-blue-600",
    bar: "text-blue-500",
    percentageText: "text-blue-500",
    border: "border-blue-200",
    bg: "bg-blue-50",
  },
  yellow: {
    text: "text-yellow-600",
    bar: "text-yellow-500",
    percentageText: "text-yellow-500",
    border: "border-yellow-200",
    bg: "bg-yellow-50",
  },
  purple: {
    text: "text-purple-600",
    bar: "text-purple-500",
    percentageText: "text-purple-500",
    border: "border-purple-200",
    bg: "bg-purple-50",
  },
  green: {
    text: "text-green-600",
    bar: "text-green-500",
    percentageText: "text-green-500",
    border: "border-green-200",
    bg: "bg-green-50",
  },
  gray: {
    text: "text-gray-600",
    bar: "text-gray-500",
    percentageText: "text-gray-500",
    border: "border-gray-200",
    bg: "bg-gray-50",
  },
  red: {
    text: "text-red-600",
    bar: "text-red-500",
    percentageText: "text-red-500",
    border: "border-red-200",
    bg: "bg-red-50",
  },
};

export default function SummaryCards({ data }: SummaryCardsProps) {
  // Calculate percentages
  const calculatePercentage = (value: number) => {
    const percentage =
      data.total > 0 ? Math.round((value / data.total) * 100) : 0;
    return percentage;
  };

  const cardConfigs: CardData[] = [
    {
      key: "total",
      title: "Total",
      icon: <Globe size={28} className="text-blue-500" />,
      color: "blue",
      borderColor: "blue-200",
      showPercentage: true,
      total: 42,
    },
    {
      key: "draft",
      title: "Draft",
      icon: <FileEdit size={28} className="text-yellow-500" />,
      color: "yellow",
      borderColor: "yellow-200",
      showPercentage: true,
      total: 5,
    },
    {
      key: "active",
      title: "Active",
      icon: <CheckCircle size={28} className="text-green-500" />,
      color: "green",
      borderColor: "green-200",
      showPercentage: true,
      total: 30,
    },
    {
      key: "inactive",
      title: "Inactive",
      icon: <PauseCircle size={28} className="text-gray-500" />,
      color: "gray",
      borderColor: "gray-200",
      showPercentage: true,
      total: 5,
    },
    {
      key: "updated",
      title: "Updated",
      icon: <CheckCircle size={28} className="text-blue-500" />,
      color: "blue",
      borderColor: "blue-200",
      showPercentage: true,
      total: 30,
    },
    {
      key: "deleted",
      title: "Deleted",
      icon: <Trash2 size={28} className="text-red-500" />,
      color: "red",
      borderColor: "red-200",
      showPercentage: true,
      total: 2,
    },
  ];

  return (
    <div className="flex flex-wrap justify-between gap-y-6">
      {cardConfigs.map((config) => {
        const percentage = calculatePercentage(config.total);
        const colors = colorMap[config.color];

        return (
          <div
            key={config.key}
            className={`
              relative p-3 rounded-2xl border cursor-pointer transition-all duration-300 
              hover:shadow-md hover:scale-102 group h-[160px] flex flex-col
              flex-1 min-w-[140px] max-w-[180px] mx-2
              ${colors.border} ${colors.bg}
            `}
          >
            {/* Top Section: Title and Icon */}
            <div className="flex justify-between items-start mb-6">
              {/* Title - Top Left */}
              <h3
                className={`text-lg font-medium ${colors.text} leading-tight`}
              >
                {config.title}
              </h3>

              {/* Icon - Top Right */}
              <div className="flex-shrink-0">{config.icon}</div>
            </div>

            {/* Spacer to push bottom content down */}
            <div className="flex-1"></div>

            {/* Bottom Section: Count and Percentage */}
            <div className="flex justify-between items-end">
              {/* Count - Bottom Left */}
              <div className={`text-2xl font-bold ${colors.text}`}>
                {config.total}
              </div>

              {/* Circular Percentage - Bottom Right */}
              {config.showPercentage && percentage !== undefined && (
                <div className="relative flex items-center justify-center">
                  {/* Circular Progress with Border */}
                  <svg width="36" height="36" className="transform -rotate-90">
                    {/* Outer border circle */}
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      stroke="currentColor"
                      strokeWidth="1"
                      fill="none"
                      className="text-gray-300"
                    />
                    {/* Background circle */}
                    <circle
                      cx="18"
                      cy="18"
                      r="13"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      fill="none"
                      className="text-white opacity-50"
                    />
                    {/* Progress circle */}
                    <circle
                      cx="18"
                      cy="18"
                      r="13"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 13}`}
                      strokeDashoffset={`${
                        2 * Math.PI * 13 * (1 - percentage / 100)
                      }`}
                      className={colors.bar}
                      strokeLinecap="round"
                    />
                  </svg>
                  {/* Percentage text */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className={`text-xs font-semibold ${colors.percentageText}`}
                    >
                      {percentage}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
