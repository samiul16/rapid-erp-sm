/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/FixedColumnDataTable";

const mockCountries = [
  {
    id: "1",
    title: "United States",
    flag: "flagcdn.com/us",
    code: "US",
    callingCode: "+1",
    status: "active",
    currency: "USD",
    createdAt: "2023-01-15",
    updatedAt: "2023-11-20",
    draftedAt: "2023-01-10",
    actionMessage: "2h",
  },
  {
    id: "2",
    title: "Canada",
    flag: "flagcdn.com/ca",
    code: "CA",
    callingCode: "+1",
    status: "active",
    currency: "CAD",
    createdAt: "2023-01-18",
    updatedAt: "2023-10-15",
    draftedAt: "2023-01-12",
    actionMessage: "2h ",
  },
  {
    id: "3",
    title: "United Kingdom",
    flag: "flagcdn.com/gb",
    code: "GB",
    callingCode: "+44",
    status: "active",
    currency: "GBP",
    createdAt: "2023-02-01",
    updatedAt: "2023-11-10",
    draftedAt: "2023-01-25",
    actionMessage: "20m",
  },
  {
    id: "4",
    title: "Germany",
    flag: "flagcdn.com/de",
    code: "DE",
    callingCode: "+49",
    status: "active",
    currency: "EUR",
    createdAt: "2023-02-10",
    updatedAt: "2023-11-05",
    draftedAt: "2023-02-05",
    actionMessage: "15 Apr",
  },
  {
    id: "5",
    title: "France",
    code: "FR",
    callingCode: "+33",
    status: "active",
    currency: "EUR",
    createdAt: "2023-02-15",
    updatedAt: "2023-10-28",
    draftedAt: "2023-02-08",
    actionMessage: "15 Apr 2023",
  },
  {
    id: "6",
    title: "Japan",
    code: "JP",
    callingCode: "+81",
    status: "active",
    currency: "JPY",
    createdAt: "2023-03-01",
    updatedAt: "2023-11-15",
    draftedAt: "2023-02-20",
    actionMessage: "15 Apr 2024",
  },
  {
    id: "7",
    title: "Australia",
    code: "AU",
    callingCode: "+61",
    status: "active",
    currency: "AUD",
    createdAt: "2023-03-10",
    updatedAt: "2023-11-08",
    draftedAt: "2023-03-05",
    actionMessage: "15 Apr 2024",
  },
  {
    id: "8",
    title: "Brazil",
    code: "BR",
    callingCode: "+55",
    status: "active",
    currency: "BRL",
    createdAt: "2023-03-20",
    updatedAt: "2023-10-22",
    draftedAt: "2023-03-15",
    actionMessage: "15 Apr 2024",
  },
  {
    id: "9",
    title: "India",
    code: "IN",
    callingCode: "+91",
    status: "active",
    currency: "INR",
    createdAt: "2023-04-01",
    updatedAt: "2023-11-25",
    draftedAt: "2023-03-25",
    actionMessage: "15 Apr 2024",
  },
  {
    id: "10",
    title: "China",
    code: "CN",
    callingCode: "+86",
    status: "active",
    currency: "CNY",
    createdAt: "2023-04-10",
    updatedAt: "2023-11-18",
    draftedAt: "2023-04-05",
    actionMessage: "2h ",
  },
  {
    id: "11",
    title: "Russia",
    code: "RU",
    callingCode: "+7",
    status: "inactive",
    currency: "RUB",
    createdAt: "2023-04-15",
    updatedAt: "2023-09-10",
    draftedAt: "2023-04-10",
    actionMessage: "2h ",
  },
  {
    id: "12",
    title: "South Korea",
    code: "KR",
    callingCode: "+82",
    status: "active",
    currency: "KRW",
    createdAt: "2023-05-01",
    updatedAt: "2023-11-12",
    draftedAt: "2023-04-25",
    actionMessage: "2h ",
  },
  {
    id: "13",
    title: "Mexico",
    code: "MX",
    callingCode: "+52",
    status: "active",
    currency: "MXN",
    createdAt: "2023-05-10",
    updatedAt: "2023-10-30",
    draftedAt: "2023-05-05",
  },
  {
    id: "14",
    title: "Italy",
    code: "IT",
    callingCode: "+39",
    status: "active",
    currency: "EUR",
    createdAt: "2023-05-20",
    updatedAt: "2023-11-02",
    draftedAt: "2023-05-15",
  },
  {
    id: "15",
    title: "Spain",
    code: "ES",
    callingCode: "+34",
    status: "active",
    currency: "EUR",
    createdAt: "2023-06-01",
    updatedAt: "2023-11-08",
    draftedAt: "2023-05-25",
  },
  {
    id: "16",
    title: "Netherlands",
    code: "NL",
    callingCode: "+31",
    status: "active",
    currency: "EUR",
    createdAt: "2023-06-10",
    updatedAt: "2023-10-25",
    draftedAt: "2023-06-05",
  },
  {
    id: "17",
    title: "Switzerland",
    code: "CH",
    callingCode: "+41",
    status: "draft",
    currency: "CHF",
    createdAt: "2023-06-15",
    updatedAt: "2023-06-20",
    draftedAt: "2023-06-12",
  },
  {
    id: "18",
    title: "Sweden",
    code: "SE",
    callingCode: "+46",
    status: "active",
    currency: "SEK",
    createdAt: "2023-07-01",
    updatedAt: "2023-11-15",
    draftedAt: "2023-06-25",
  },
  {
    id: "19",
    title: "Norway",
    code: "NO",
    callingCode: "+47",
    status: "active",
    currency: "NOK",
    createdAt: "2023-07-10",
    updatedAt: "2023-10-18",
    draftedAt: "2023-07-05",
  },
  {
    id: "20",
    title: "Argentina",
    code: "AR",
    callingCode: "+54",
    status: "inactive",
    currency: "ARS",
    createdAt: "2023-07-20",
    updatedAt: "2023-09-15",
    draftedAt: "2023-07-15",
  },
];

export default function CountriesDataTable2({
  viewMode,
  setViewMode,
}: {
  viewMode: string;
  setViewMode: (viewMode: string) => void;
}) {
  const componentColumns = [
    {
      accessorKey: "title",
      title: "title",
      options: [...new Set(mockCountries.map((item) => item.title))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("title").localeCompare(row2.getValue("title"));
      },
      size: 180,
      minSize: 120,
    },
    {
      accessorKey: "code",
      title: "Country Code",
      options: [...new Set(mockCountries.map((item) => item.code))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("code").localeCompare(row2.getValue("code"));
      },
      size: 120,
      minSize: 80,
    },
    {
      accessorKey: "callingCode",
      title: "Calling Code",
      options: [...new Set(mockCountries.map((item) => item.callingCode))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("callingCode")
          .localeCompare(row2.getValue("callingCode"));
      },
      size: 50,
      minSize: 50,
    },
    {
      accessorKey: "currency",
      title: "Currency",
      options: [...new Set(mockCountries.map((item) => item.currency))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("currency")
          .localeCompare(row2.getValue("currency"));
      },
      size: 150,
      minSize: 100,
    },
    {
      accessorKey: "status",
      title: "Status",
      options: ["active", "inactive", "draft"],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("status").localeCompare(row2.getValue("status"));
      },
      size: 120,
      minSize: 80,
    },
    {
      accessorKey: "createdAt",
      title: "Created",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = new Date(row.getValue(columnId) as string)
          .toISOString()
          .split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          new Date(row1.getValue("createdAt")).getTime() -
          new Date(row2.getValue("createdAt")).getTime()
        );
      },
      size: 130,
      minSize: 100,
    },
    {
      accessorKey: "updatedAt",
      title: "Updated",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = new Date(row.getValue(columnId) as string)
          .toISOString()
          .split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          new Date(row1.getValue("updatedAt")).getTime() -
          new Date(row2.getValue("updatedAt")).getTime()
        );
      },
      size: 130,
      minSize: 100,
    },
    {
      accessorKey: "draftedAt",
      title: "Drafted",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = new Date(row.getValue(columnId) as string)
          .toISOString()
          .split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          new Date(row1.getValue("draftedAt")).getTime() -
          new Date(row2.getValue("draftedAt")).getTime()
        );
      },
      size: 130,
      minSize: 100,
    },
  ];

  return (
    <FixedColumnDataTable
      columnData={mockCountries}
      viewMode={viewMode}
      setViewMode={setViewMode}
      componentColumns={componentColumns}
      fixedColumns={[]} // Pin country name column
    />
  );
}
