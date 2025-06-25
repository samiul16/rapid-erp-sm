import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  };
  module: string;
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
  { text: string; bar: string; percentageText: string; border: string }
> = {
  blue: {
    text: "text-blue-600",
    bar: "bg-blue-500",
    percentageText: "text-blue-500",
    border: "border-blue-200",
  },
  purple: {
    text: "text-purple-600",
    bar: "bg-purple-500",
    percentageText: "text-purple-500",
    border: "border-purple-200",
  },
  green: {
    text: "text-green-600",
    bar: "bg-green-500",
    percentageText: "text-green-500",
    border: "border-blue-200",
  },
  gray: {
    text: "text-gray-600",
    bar: "bg-gray-500",
    percentageText: "text-gray-500",
    border: "border-gray-200",
  },
  red: {
    text: "text-red-600",
    bar: "bg-red-500",
    percentageText: "text-red-500",
    border: "border-red-200",
  },
};

export default function SummaryCards({ data, module }: SummaryCardsProps) {
  // Calculate percentages
  const calculatePercentage = (value: number) => {
    console.log("value", value, "data.total", data.total);
    console.log();
    const percentage =
      data.total > 0 ? Math.round((value / data.total) * 100) : 0;
    console.log("percentage", percentage);
    return percentage;
  };

  const cardConfigs: CardData[] = [
    {
      key: "total",
      title: "Total",
      icon: <Globe size={32} className="text-blue-500" />,
      color: "blue",
      borderColor: "blue-200",
      showPercentage: true,
      total: 25,
    },
    {
      key: "draft",
      title: "Draft",
      icon: <FileEdit size={32} className="text-purple-500" />,
      color: "purple",
      borderColor: "purple-200",
      showPercentage: true,
      total: 5,
    },
    {
      key: "active",
      title: "Active",
      icon: <CheckCircle size={32} className="text-green-500" />,
      color: "green",
      borderColor: "blue-200",
      showPercentage: true,
      total: 20,
    },
    {
      key: "inactive",
      title: "Inactive",
      icon: <PauseCircle size={32} className="text-gray-500" />,
      color: "gray",
      borderColor: "gray-200",
      showPercentage: true,
      total: 5,
    },
    {
      key: "deleted",
      title: "Deleted",
      icon: <Trash2 size={32} className="text-red-500" />,
      color: "red",
      borderColor: "red-200",
      showPercentage: true,
      total: 2,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 dark:bg-gray-900">
      {cardConfigs.map((config) => {
        const percentage = calculatePercentage(config.total);

        return (
          <Card
            key={config.key}
            className={`${
              colorMap[config.color].border
            } py-2 hover:shadow-md transition-shadow gap-2 bg-${
              config.color
            }-100 dark:bg-gray-900 cursor-pointer`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
              <CardTitle className="text-base text-2xl font-medium hover:text-${config.color}-700 transition-colors">
                {config.title}
              </CardTitle>
              {config.icon}
            </CardHeader>
            <CardContent>
              <div
                className={`text-2xl font-bold ${colorMap[config.color].text}`}
              >
                {config.total}
              </div>
              {config.showPercentage && percentage !== undefined && (
                <>
                  <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                    <div
                      className={`${
                        colorMap[config.color].bar
                      } h-1 rounded-full transition-all duration-300`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <p
                    className={`text-xs ${
                      colorMap[config.color].percentageText
                    } mt-1`}
                  >
                    {percentage}% of {module}
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
