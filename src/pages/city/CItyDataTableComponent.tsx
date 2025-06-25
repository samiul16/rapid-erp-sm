/* eslint-disable @typescript-eslint/no-explicit-any */
import CommonDataTable from "@/components/common/CommonDataTable";

const mockCities = [
  {
    id: "1",
    name: "New York",
    country: "United States",
    description: "The most populous city in the United States",
    status: "active",
    state: "New York",
    created: "2023-01-15",
    updated: "2023-06-20",
    drafted: "2023-01-10",
  },
  {
    id: "2",
    name: "London",
    country: "United Kingdom",
    description: "Capital of England and the United Kingdom",
    status: "active",
    state: "London",
    created: "2023-02-10",
    updated: "2023-05-15",
    drafted: "2023-02-01",
  },
  {
    id: "3",
    name: "Tokyo",
    country: "Japan",
    description: "Capital and most populous city of Japan",
    status: "inactive",
    state: "Tokyo",
    created: "2023-03-05",
    updated: "2023-04-18",
    drafted: "2023-03-01",
  },
  {
    id: "4",
    name: "Paris",
    country: "France",
    description: "Capital of France, known as the City of Light",
    status: "draft",
    state: "Paris",
    created: "2023-04-12",
    updated: "2023-04-12",
    drafted: "2023-04-10",
  },
  {
    id: "5",
    name: "Sydney",
    country: "Australia",
    description: "Largest city in Australia and Oceania",
    status: "active",
    state: "Sydney",
    created: "2023-05-20",
    updated: "2023-07-01",
    drafted: "2023-05-15",
  },
  {
    id: "6",
    name: "Dubai",
    country: "United Arab Emirates",
    description: "Most populous city in the UAE",
    status: "active",
    state: "Dubai",
    created: "2023-06-08",
    updated: "2023-08-12",
    drafted: "2023-06-01",
  },
  {
    id: "7",
    name: "Berlin",
    country: "Germany",
    description: "Capital and largest city of Germany",
    status: "inactive",
    state: "Berlin",
    created: "2023-07-14",
    updated: "2023-09-02",
    drafted: "2023-07-10",
  },
  {
    id: "8",
    name: "Toronto",
    country: "Canada",
    description: "Largest city in Canada and financial capital",
    status: "draft",
    state: "Toronto",
    created: "2023-08-22",
    updated: "2023-08-25",
    drafted: "2023-08-20",
  },
  {
    id: "9",
    name: "Singapore",
    country: "Singapore",
    description: "City-state in Southeast Asia",
    status: "active",
    state: "Singapore",
    created: "2023-09-05",
    updated: "2023-10-15",
    drafted: "2023-09-01",
  },
  {
    id: "10",
    name: "Rio de Janeiro",
    country: "Brazil",
    description: "Second most populous municipality in Brazil",
    status: "inactive",
    state: "Rio de Janeiro",
    created: "2023-10-18",
    updated: "2023-11-20",
    drafted: "2023-10-15",
  },
];

export default function CitiesDataTable({
  viewMode,
  setViewMode,
}: {
  viewMode: string;
  setViewMode: (viewMode: string) => void;
}) {
  const componentColumns = [
    {
      accessorKey: "name",
      title: "Name",
      options: [
        "New York",
        "London",
        "Tokyo",
        "Paris",
        "Sydney",
        "Dubai",
        "Berlin",
        "Toronto",
        "Singapore",
        "Rio de Janeiro",
      ],
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
      accessorKey: "country",
      title: "Country",
      options: [
        "United States",
        "United Kingdom",
        "Japan",
        "France",
        "Australia",
        "United Arab Emirates",
        "Germany",
        "Canada",
        "Singapore",
        "Brazil",
      ],
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
      accessorKey: "state",
      title: "State",
      options: [
        "New York",
        "London",
        "Tokyo",
        "Paris",
        "Sydney",
        "Dubai",
        "Berlin",
        "Toronto",
        "Singapore",
        "Rio de Janeiro",
      ],
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
      accessorKey: "description",
      title: "Description",
      options: [], // No predefined options for description as it's free text
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
      options: ["active", "inactive", "draft"],
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
      options: [], // Dates are typically not filtered with predefined options
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
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) => cellValue.includes(val));
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("updated").localeCompare(row2.getValue("updated"));
      },
    },
    {
      accessorKey: "drafted",
      title: "Drafted",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) => cellValue.includes(val));
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("drafted").localeCompare(row2.getValue("drafted"));
      },
    },
  ];

  return (
    <CommonDataTable
      columnData={mockCities}
      viewMode={viewMode}
      setViewMode={setViewMode}
      componentColumns={componentColumns}
    />
  );
}
