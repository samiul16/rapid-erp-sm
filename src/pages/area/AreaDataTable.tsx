/* eslint-disable @typescript-eslint/no-explicit-any */
import CommonDataTable from "@/components/common/CommonDataTable";
import { useMemo } from "react";

const mockAreas = [
  {
    id: "1",
    name: "Manhattan",
    city: "New York",
    state: "New York",
    country: "United States",
    description: "The most famous borough of NYC",
    status: "active",
    created: "2023-01-15",
    updated: "2023-06-20",
  },
  {
    id: "2",
    name: "Westminster",
    city: "London",
    state: "London",
    country: "United Kingdom",
    description: "Central London borough",
    status: "active",
    created: "2023-02-10",
    updated: "2023-05-15",
  },
  {
    id: "3",
    name: "Shibuya",
    city: "Tokyo",
    state: "Tokyo",
    country: "Japan",
    description: "Famous shopping and entertainment district",
    status: "inactive",
    created: "2023-03-05",
    updated: "2023-04-18",
  },
  {
    id: "4",
    name: "Le Marais",
    city: "Paris",
    state: "Paris",
    country: "France",
    description: "Historic district in Paris",
    status: "draft",
    created: "2023-04-12",
    updated: "2023-04-12",
  },
  {
    id: "5",
    name: "Mitte",
    city: "Berlin",
    state: "Berlin",
    country: "Germany",
    description: "Central district of Berlin",
    status: "active",
    created: "2023-05-20",
    updated: "2023-07-01",
  },
  {
    id: "6",
    name: "CBD",
    city: "Sydney",
    state: "New South Wales",
    country: "Australia",
    description: "Central business district",
    status: "inactive",
    created: "2023-06-08",
    updated: "2023-08-12",
  },
  {
    id: "7",
    name: "Downtown",
    city: "Toronto",
    state: "Ontario",
    country: "Canada",
    description: "Central business district of Toronto",
    status: "active",
    created: "2023-07-14",
    updated: "2023-09-02",
  },
  {
    id: "8",
    name: "Downtown Dubai",
    city: "Dubai",
    state: "Dubai",
    country: "United Arab Emirates",
    description: "Central business district of Dubai",
    status: "active",
    created: "2023-08-22",
    updated: "2023-08-25",
  },
  {
    id: "9",
    name: "Orchard Road",
    city: "Singapore",
    state: "Singapore",
    country: "Singapore",
    description: "Famous shopping belt in Singapore",
    status: "active",
    created: "2023-09-05",
    updated: "2023-10-15",
  },
  {
    id: "10",
    name: "Copacabana",
    city: "Rio de Janeiro",
    state: "Rio de Janeiro",
    country: "Brazil",
    description: "Famous beach neighborhood in Rio",
    status: "inactive",
    created: "2023-10-18",
    updated: "2023-11-20",
  },
];

// Helper function to extract unique values from data
const getUniqueValues = (data: any[], key: string): string[] => {
  const values = data.map((item) => item[key]).filter(Boolean);
  return [...new Set(values)].sort();
};

export default function AreasDataTable({
  viewMode,
  setViewMode,
}: {
  viewMode: string;
  setViewMode: (viewMode: string) => void;
}) {
  // Dynamically generate options from the data
  const dynamicOptions = useMemo(
    () => ({
      name: getUniqueValues(mockAreas, "name"),
      city: getUniqueValues(mockAreas, "city"),
      state: getUniqueValues(mockAreas, "state"),
      country: getUniqueValues(mockAreas, "country"),
      status: getUniqueValues(mockAreas, "status"),
      description: getUniqueValues(mockAreas, "description"),
      created: getUniqueValues(mockAreas, "created"),
      updated: getUniqueValues(mockAreas, "updated"),
    }),
    []
  );

  const componentColumns = [
    {
      accessorKey: "name",
      title: "Area Name",
      options: dynamicOptions.name,
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) =>
          cellValue.toLowerCase().includes(val.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("name").localeCompare(row2.getValue("name"));
      },
    },
    {
      accessorKey: "city",
      title: "City",
      options: dynamicOptions.city,
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) =>
          cellValue.toLowerCase().includes(val.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("city").localeCompare(row2.getValue("city"));
      },
    },
    {
      accessorKey: "state",
      title: "State",
      options: dynamicOptions.state,
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) =>
          cellValue.toLowerCase().includes(val.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("state").localeCompare(row2.getValue("state"));
      },
    },
    {
      accessorKey: "country",
      title: "Country",
      options: dynamicOptions.country,
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) =>
          cellValue.toLowerCase().includes(val.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("country").localeCompare(row2.getValue("country"));
      },
    },
    {
      accessorKey: "description",
      title: "Description",
      options: dynamicOptions.description,
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) =>
          cellValue.toLowerCase().includes(val.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("description")
          .localeCompare(row2.getValue("description"));
      },
    },
    {
      accessorKey: "status",
      title: "Status",
      options: dynamicOptions.status,
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) =>
          cellValue.toLowerCase().includes(val.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("status").localeCompare(row2.getValue("status"));
      },
    },
    {
      accessorKey: "created",
      title: "Created",
      options: dynamicOptions.created,
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) => cellValue.includes(val));
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("created").localeCompare(row2.getValue("created"));
      },
    },
    {
      accessorKey: "updated",
      title: "Updated",
      options: dynamicOptions.updated,
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) => cellValue.includes(val));
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("updated").localeCompare(row2.getValue("updated"));
      },
    },
  ];

  return (
    <CommonDataTable
      columnData={mockAreas}
      viewMode={viewMode}
      setViewMode={setViewMode}
      componentColumns={componentColumns}
    />
  );
}
