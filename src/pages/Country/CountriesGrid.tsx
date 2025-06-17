import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye } from "lucide-react";

// Mock data - replace with real data from your API
const countries = [
  { id: "1", name: "United States", code: "US", status: "active" },
  { id: "2", name: "Canada", code: "CA", status: "active" },
  { id: "3", name: "United Kingdom", code: "UK", status: "active" },
  { id: "4", name: "Japan", code: "JP", status: "inactive" },
  { id: "5", name: "Germany", code: "DE", status: "active" },
  { id: "6", name: "France", code: "FR", status: "draft" },
];

export default function CountriesGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {countries.map((country) => (
        <Card key={country.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">
              {country.name}
            </CardTitle>
            <span
              className={`px-2 py-1 text-xs rounded-full ${
                country.status === "active"
                  ? "bg-green-100 text-green-800"
                  : country.status === "inactive"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {country.status}
            </span>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Code: {country.code}</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
