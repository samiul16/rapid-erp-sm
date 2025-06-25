/* eslint-disable @typescript-eslint/no-explicit-any */
import CommonDataTable from "@/components/common/CommonDataTable";

const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    mobile: "+8801777000001",
    email: "john@example.com",
    status: "active",
    password: "pass1234",
    otp: "987654",
    facebook: "https://facebook.com/johndoe",
    instagram: "https://instagram.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
  },
  {
    id: "2",
    name: "Jane Smith",
    mobile: "+8801777000002",
    email: "jane@example.com",
    status: "inactive",
    password: "pass5678",
    otp: "123456",
    facebook: "https://facebook.com/janesmith",
    instagram: "https://instagram.com/janesmith",
    linkedin: "https://linkedin.com/in/janesmith",
  },
  {
    id: "3",
    name: "Alex Johnson",
    mobile: "+8801777000003",
    email: "alex@example.com",
    status: "draft",
    password: "password321",
    otp: "654321",
    facebook: "https://facebook.com/alexjohnson",
    instagram: "https://instagram.com/alexjohnson",
    linkedin: "https://linkedin.com/in/alexjohnson",
  },
  {
    id: "4",
    name: "Maria Garcia",
    mobile: "+8801777000004",
    email: "maria@example.com",
    status: "deleted",
    password: "maria123",
    otp: "111222",
    facebook: "https://facebook.com/mariagarcia",
    instagram: "https://instagram.com/mariagarcia",
    linkedin: "https://linkedin.com/in/mariagarcia",
  },
  {
    id: "5",
    name: "David Lee",
    mobile: "+8801777000005",
    email: "david@example.com",
    status: "updated",
    password: "lee456",
    otp: "789101",
    facebook: "https://facebook.com/davidlee",
    instagram: "https://instagram.com/davidlee",
    linkedin: "https://linkedin.com/in/davidlee",
  },
  {
    id: "6",
    name: "Sophia Khan",
    mobile: "+8801777000006",
    email: "sophia@example.com",
    status: "created",
    password: "sophia789",
    otp: "303112",
    facebook: "https://facebook.com/sophiakhan",
    instagram: "https://instagram.com/sophiakhan",
    linkedin: "https://linkedin.com/in/sophiakhan",
  },
  {
    id: "7",
    name: "Mohammad Ali",
    mobile: "+8801777000007",
    email: "ali@example.com",
    status: "active",
    password: "ali999",
    otp: "990011",
    facebook: "https://facebook.com/mohammadali",
    instagram: "https://instagram.com/mohammadali",
    linkedin: "https://linkedin.com/in/mohammadali",
  },
  {
    id: "8",
    name: "Emily Zhang",
    mobile: "+8801777000008",
    email: "emily@example.com",
    status: "inactive",
    password: "emilypass",
    otp: "565656",
    facebook: "https://facebook.com/emilyzhang",
    instagram: "https://instagram.com/emilyzhang",
    linkedin: "https://linkedin.com/in/emilyzhang",
  },
  {
    id: "9",
    name: "Carlos Mendez",
    mobile: "+8801777000009",
    email: "carlos@example.com",
    status: "draft",
    password: "carlos321",
    otp: "774411",
    facebook: "https://facebook.com/carlosmendez",
    instagram: "https://instagram.com/carlosmendez",
    linkedin: "https://linkedin.com/in/carlosmendez",
  },
  {
    id: "10",
    name: "Fatima Noor",
    mobile: "+8801777000010",
    email: "fatima@example.com",
    status: "active",
    password: "noor2025",
    otp: "882200",
    facebook: "https://facebook.com/fatimanoor",
    instagram: "https://instagram.com/fatimanoor",
    linkedin: "https://linkedin.com/in/fatimanoor",
  },
];

export default function UserMastersDataTable({
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
        "John Doe",
        "Jane Smith",
        "Alex Johnson",
        "Maria Garcia",
        "David Lee",
        "Sophia Khan",
        "Mohammad Ali",
        "Emily Zhang",
        "Carlos Mendez",
        "Fatima Noor",
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
      accessorKey: "email",
      title: "Email",
      options: [
        "john@example.com",
        "jane@example.com",
        "alex@example.com",
        "maria@example.com",
        "david@example.com",
        "sophia@example.com",
        "ali@example.com",
        "emily@example.com",
        "carlos@example.com",
        "fatima@example.com",
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) =>
          cellValue.toLowerCase().includes(val.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("email").localeCompare(row2.getValue("email"));
      },
    },
    {
      accessorKey: "mobile",
      title: "Mobile",
      options: [
        "+8801777000001",
        "+8801777000002",
        "+8801777000003",
        "+8801777000004",
        "+8801777000005",
        "+8801777000006",
        "+8801777000007",
        "+8801777000008",
        "+8801777000009",
        "+8801777000010",
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) => cellValue.includes(val));
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("mobile").localeCompare(row2.getValue("mobile"));
      },
    },
    {
      accessorKey: "status",
      title: "Status",
      options: ["active", "inactive", "draft", "deleted", "updated", "created"],
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
      accessorKey: "facebook",
      title: "Facebook",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) =>
          cellValue.toLowerCase().includes(val.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("facebook")
          .localeCompare(row2.getValue("facebook"));
      },
    },
    {
      accessorKey: "instagram",
      title: "Instagram",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) =>
          cellValue.toLowerCase().includes(val.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("instagram")
          .localeCompare(row2.getValue("instagram"));
      },
    },
    {
      accessorKey: "linkedin",
      title: "LinkedIn",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) =>
          cellValue.toLowerCase().includes(val.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("linkedin")
          .localeCompare(row2.getValue("linkedin"));
      },
    },
  ];

  return (
    <CommonDataTable
      columnData={mockUsers}
      viewMode={viewMode}
      setViewMode={setViewMode}
      componentColumns={componentColumns}
    />
  );
}
