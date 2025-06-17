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
};

export default function SummaryCards({ data }: SummaryCardsProps) {
  // Calculate percentages
  const calculatePercentage = (value: number) => {
    return data.total > 0 ? Math.round((value / data.total) * 100) : 0;
  };

  const percentages = {
    draft: calculatePercentage(data.draft),
    active: calculatePercentage(data.active),
    inactive: calculatePercentage(data.inactive),
    deleted: calculatePercentage(data.deleted),
  };

  return (
    <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-5">
      {/* Total Countries Card */}
      <Card className="border-blue-200 py-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Countries</CardTitle>
          <Globe size={32} className="text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">{data.total}</div>
          <p className="text-xs text-blue-500 mt-1">All countries</p>
        </CardContent>
      </Card>

      {/* Draft Card */}
      <Card className="border-purple-200 py-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Draft</CardTitle>
          <FileEdit size={32} className="text-purple-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-600">{data.draft}</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-purple-500 h-2 rounded-full"
              style={{ width: `${percentages.draft}%` }}
            ></div>
          </div>
          <p className="text-xs text-purple-500 mt-1">
            {percentages.draft}% of total
          </p>
        </CardContent>
      </Card>

      {/* Active Card */}
      <Card className="border-blue-200 py-3">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">Active</CardTitle>
          <CheckCircle size={32} className="text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{data.active}</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: `${percentages.active}%` }}
            ></div>
          </div>
          <p className="text-xs text-green-500 mt-1">
            {percentages.active}% of total
          </p>
        </CardContent>
      </Card>

      {/* Inactive Card */}
      <Card className="border-gray-200 py-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Inactive</CardTitle>
          <PauseCircle size={32} className="text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-600">
            {data.inactive}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-gray-500 h-2 rounded-full"
              style={{ width: `${percentages.inactive}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {percentages.inactive}% of total
          </p>
        </CardContent>
      </Card>

      {/* Deleted Card */}
      <Card className="border-red-200 py-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Deleted</CardTitle>
          <Trash2 size={32} className="text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">{data.deleted}</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-red-500 h-2 rounded-full"
              style={{ width: `${percentages.deleted}%` }}
            ></div>
          </div>
          <p className="text-xs text-red-500 mt-1">
            {percentages.deleted}% of total
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
