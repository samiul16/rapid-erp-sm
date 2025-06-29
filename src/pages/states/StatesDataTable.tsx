/* eslint-disable @typescript-eslint/no-explicit-any */
// import CommonDataTable from "@/components/common/CommonDataTable";
import FixedColumnDataTable from "@/components/common/FixedColumnDataTable";

const mockStates = [
  {
    id: "1",
    name: "California",
    country: "United States",
    description:
      "Most populous state in the US, known for Silicon Valley and Hollywood",
    status: "active",
    capital: "Sacramento",
    created: "2023-01-10",
    updated: "2023-06-15",
    drafted: "2023-01-05",
  },
  {
    id: "2",
    name: "Texas",
    country: "United States",
    description: "Second largest state by both area and population",
    status: "active",
    capital: "Austin",
    created: "2023-01-12",
    updated: "2023-05-20",
    drafted: "2023-01-08",
  },
  {
    id: "3",
    name: "New York",
    country: "United States",
    description: "Known as the Empire State, home to NYC",
    status: "active",
    capital: "Albany",
    created: "2023-02-05",
    updated: "2023-07-10",
    drafted: "2023-02-01",
  },
  {
    id: "4",
    name: "Florida",
    country: "United States",
    description: "Southeastern state known for beaches and tourism",
    status: "active",
    capital: "Tallahassee",
    created: "2023-02-15",
    updated: "2023-06-25",
    drafted: "2023-02-10",
  },
  {
    id: "5",
    name: "Ontario",
    country: "Canada",
    description: "Most populous province in Canada",
    status: "active",
    capital: "Toronto",
    created: "2023-03-01",
    updated: "2023-08-05",
    drafted: "2023-02-25",
  },
  {
    id: "6",
    name: "Quebec",
    country: "Canada",
    description: "French-speaking province in eastern Canada",
    status: "active",
    capital: "Quebec City",
    created: "2023-03-10",
    updated: "2023-07-18",
    drafted: "2023-03-05",
  },
  {
    id: "7",
    name: "New South Wales",
    country: "Australia",
    description: "Most populous state in Australia, home to Sydney",
    status: "active",
    capital: "Sydney",
    created: "2023-03-20",
    updated: "2023-08-12",
    drafted: "2023-03-15",
  },
  {
    id: "8",
    name: "Victoria",
    country: "Australia",
    description: "Second most populous state in Australia",
    status: "active",
    capital: "Melbourne",
    created: "2023-04-02",
    updated: "2023-09-01",
    drafted: "2023-03-28",
  },
  {
    id: "9",
    name: "Bavaria",
    country: "Germany",
    description: "Largest state by land area in Germany",
    status: "active",
    capital: "Munich",
    created: "2023-04-15",
    updated: "2023-08-20",
    drafted: "2023-04-10",
  },
  {
    id: "10",
    name: "North Rhine-Westphalia",
    country: "Germany",
    description: "Most populous state in Germany",
    status: "active",
    capital: "Düsseldorf",
    created: "2023-05-05",
    updated: "2023-09-15",
    drafted: "2023-05-01",
  },
  {
    id: "11",
    name: "Maharashtra",
    country: "India",
    description: "Second most populous state in India",
    status: "active",
    capital: "Mumbai",
    created: "2023-05-18",
    updated: "2023-10-02",
    drafted: "2023-05-15",
  },
  {
    id: "12",
    name: "Uttar Pradesh",
    country: "India",
    description: "Most populous state in India",
    status: "active",
    capital: "Lucknow",
    created: "2023-06-01",
    updated: "2023-09-25",
    drafted: "2023-05-28",
  },
  {
    id: "13",
    name: "São Paulo",
    country: "Brazil",
    description: "Most populous state in Brazil",
    status: "active",
    capital: "São Paulo",
    created: "2023-06-12",
    updated: "2023-10-08",
    drafted: "2023-06-08",
  },
  {
    id: "14",
    name: "Minas Gerais",
    country: "Brazil",
    description: "Second most populous state in Brazil",
    status: "inactive",
    capital: "Belo Horizonte",
    created: "2023-07-01",
    updated: "2023-09-10",
    drafted: "2023-06-25",
  },
  {
    id: "15",
    name: "Tokyo",
    country: "Japan",
    description: "Capital prefecture of Japan",
    status: "draft",
    capital: "Tokyo",
    created: "2023-07-15",
    updated: "2023-07-20",
    drafted: "2023-07-12",
  },
  {
    id: "16",
    name: "Osaka",
    country: "Japan",
    description: "Prefecture in the Kansai region",
    status: "active",
    capital: "Osaka",
    created: "2023-08-01",
    updated: "2023-10-15",
    drafted: "2023-07-28",
  },
  {
    id: "17",
    name: "England",
    country: "United Kingdom",
    description: "Largest constituent country of the UK",
    status: "active",
    capital: "London",
    created: "2023-08-10",
    updated: "2023-11-05",
    drafted: "2023-08-05",
  },
  {
    id: "18",
    name: "Scotland",
    country: "United Kingdom",
    description: "Northern constituent country of the UK",
    status: "active",
    capital: "Edinburgh",
    created: "2023-08-20",
    updated: "2023-10-25",
    drafted: "2023-08-15",
  },
  {
    id: "19",
    name: "Île-de-France",
    country: "France",
    description: "Region surrounding Paris",
    status: "active",
    capital: "Paris",
    created: "2023-09-01",
    updated: "2023-11-12",
    drafted: "2023-08-28",
  },
  {
    id: "20",
    name: "Provence-Alpes-Côte d'Azur",
    country: "France",
    description: "Southeastern region of France",
    status: "inactive",
    capital: "Marseille",
    created: "2023-09-15",
    updated: "2023-10-30",
    drafted: "2023-09-10",
  },
];

export default function StatesDataTable({
  viewMode,
  setViewMode,
}: {
  viewMode: string;
  setViewMode: (viewMode: string) => void;
}) {
  const componentColumns = [
    {
      accessorKey: "name",
      title: "State Name",
      options: [
        "California",
        "Texas",
        "New York",
        "Florida",
        "Ontario",
        "Quebec",
        "New South Wales",
        "Victoria",
        "Bavaria",
        "North Rhine-Westphalia",
        "Maharashtra",
        "Uttar Pradesh",
        "São Paulo",
        "Minas Gerais",
        "Tokyo",
        "Osaka",
        "England",
        "Scotland",
        "Île-de-France",
        "Provence-Alpes-Côte d'Azur",
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
      size: 180,
      minSize: 120,
    },
    {
      accessorKey: "country",
      title: "Country",
      options: [
        "United States",
        "Canada",
        "Australia",
        "Germany",
        "India",
        "Brazil",
        "Japan",
        "United Kingdom",
        "France",
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
      size: 150,
      minSize: 100,
    },
    {
      accessorKey: "capital",
      title: "Capital City",
      options: [
        "Sacramento",
        "Austin",
        "Albany",
        "Tallahassee",
        "Toronto",
        "Quebec City",
        "Sydney",
        "Melbourne",
        "Munich",
        "Düsseldorf",
        "Mumbai",
        "Lucknow",
        "São Paulo",
        "Belo Horizonte",
        "Tokyo",
        "Osaka",
        "London",
        "Edinburgh",
        "Paris",
        "Marseille",
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) =>
          cellValue.toLowerCase().includes(val.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("capital").localeCompare(row2.getValue("capital"));
      },
      size: 150,
      minSize: 100,
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
      size: 300,
      minSize: 200,
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
      size: 120,
      minSize: 80,
    },
    {
      accessorKey: "created",
      title: "Created Date",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) => cellValue.includes(val));
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          new Date(row1.getValue("created")).getTime() -
          new Date(row2.getValue("created")).getTime()
        );
      },
      size: 130,
      minSize: 100,
    },
    {
      accessorKey: "updated",
      title: "Updated Date",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) => cellValue.includes(val));
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          new Date(row1.getValue("updated")).getTime() -
          new Date(row2.getValue("updated")).getTime()
        );
      },
      size: 130,
      minSize: 100,
    },
    {
      accessorKey: "drafted",
      title: "Drafted Date",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) => cellValue.includes(val));
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          new Date(row1.getValue("drafted")).getTime() -
          new Date(row2.getValue("drafted")).getTime()
        );
      },
      size: 130,
      minSize: 100,
    },
  ];

  return (
    <FixedColumnDataTable
      columnData={mockStates}
      viewMode={viewMode}
      setViewMode={setViewMode}
      componentColumns={componentColumns}
      fixedColumns={[]}
    />
    // <CommonDataTable
    //   columnData={mockStates}
    //   viewMode={viewMode}
    //   setViewMode={setViewMode}
    //   componentColumns={componentColumns}
    // />
  );
}
