/* eslint-disable @typescript-eslint/no-explicit-any */
// import CommonDataTable from "@/components/common/CommonDataTable";
// import { useState } from "react";

// const mockUsers = [
//   {
//     id: "0",
//     name: "John Doe",
//     email: "john.doe@example.com",
//     status: "active",
//     createdAt: "2023-01-15",
//     deletedAt: null,
//     draftedAt: "2023-01-10",
//   },
//   {
//     id: "1",
//     name: "Jane Smith",
//     email: "jane.smith@example.com",
//     status: "active",
//     createdAt: "2023-02-20",
//     deletedAt: null,
//     draftedAt: "2023-02-18",
//   },
//   {
//     id: "2",
//     name: "Bob Johnson",
//     email: "bob.johnson@example.com",
//     status: "pending",
//     createdAt: "2023-03-10",
//     deletedAt: null,
//     draftedAt: "2023-03-05",
//   },
//   {
//     id: "3",
//     name: "Alice Brown",
//     email: "alice.brown@example.com",
//     status: "active",
//     createdAt: "2023-04-05",
//     deletedAt: null,
//     draftedAt: "2023-04-01",
//   },
//   {
//     id: "4",
//     name: "Charlie Wilson",
//     email: "charlie.wilson@example.com",
//     status: "inactive",
//     createdAt: "2023-05-12",
//     deletedAt: "2023-06-15",
//     draftedAt: "2023-05-08",
//   },
//   {
//     id: "5",
//     name: "Diana Davis",
//     email: "diana.davis@example.com",
//     status: "active",
//     createdAt: "2023-06-18",
//     deletedAt: null,
//     draftedAt: "2023-06-14",
//   },
//   {
//     id: "6",
//     name: "Eva Martinez",
//     email: "eva.martinez@example.com",
//     status: "pending",
//     createdAt: "2023-07-22",
//     deletedAt: null,
//     draftedAt: "2023-07-20",
//   },
//   {
//     id: "7",
//     name: "Frank Taylor",
//     email: "frank.taylor@example.com",
//     status: "inactive",
//     createdAt: "2023-08-30",
//     deletedAt: "2023-09-10",
//     draftedAt: "2023-08-25",
//   },
//   {
//     id: "8",
//     name: "Grace Lee",
//     email: "grace.lee@example.com",
//     status: "active",
//     createdAt: "2023-09-05",
//     deletedAt: null,
//     draftedAt: "2023-09-01",
//   },
//   {
//     id: "9",
//     name: "Henry Chen",
//     email: "henry.chen@example.com",
//     status: "active",
//     createdAt: "2023-10-15",
//     deletedAt: null,
//     draftedAt: "2023-10-12",
//   },
// ];

const Dashboard = () => {
  // const [viewMode, setViewMode] = useState("grid");
  // const componentColumns = [
  //   {
  //     accessorKey: "name",
  //     title: "Name",
  //     options: [
  //       "John Doe",
  //       "Jane Smith",
  //       "Bob Johnson",
  //       "Alice Brown",
  //       "Charlie Wilson",
  //       "Diana Davis",
  //       "Eva Martinez",
  //       "Frank Taylor",
  //       "Grace Lee",
  //       "Henry Chen",
  //     ],
  //     filterFn: (row: any, columnId: any, filterValue: any) => {
  //       if (!filterValue || filterValue.length === 0) return true;
  //       const cellValue = row.getValue(columnId) as string;
  //       return filterValue.some((filterVal: string) =>
  //         cellValue.toLowerCase().includes(filterVal.toLowerCase())
  //       );
  //     },
  //     sortingFn: (row1: any, row2: any) => {
  //       const name1 = row1.getValue("name") as string;
  //       const name2 = row2.getValue("name") as string;
  //       return name1.localeCompare(name2);
  //     },
  //   },
  //   {
  //     accessorKey: "email",
  //     title: "Email",
  //     options: [
  //       "john.doe@example.com",
  //       "jane.smith@example.com",
  //       "bob.johnson@example.com",
  //       "alice.brown@example.com",
  //       "charlie.wilson@example.com",
  //       "diana.davis@example.com",
  //       "eva.martinez@example.com",
  //       "frank.taylor@example.com",
  //       "grace.lee@example.com",
  //       "henry.chen@example.com",
  //     ],
  //     filterFn: (row: any, columnId: any, filterValue: any) => {
  //       if (!filterValue || filterValue.length === 0) return true;
  //       const cellValue = row.getValue(columnId) as string;
  //       return filterValue.some((filterVal: string) =>
  //         cellValue.toLowerCase().includes(filterVal.toLowerCase())
  //       );
  //     },
  //     sortingFn: (row1: any, row2: any) => {
  //       const name1 = row1.getValue("email") as string;
  //       const name2 = row2.getValue("email") as string;
  //       return name1.localeCompare(name2);
  //     },
  //   },
  //   {
  //     accessorKey: "status",
  //     title: "Status",
  //     options: ["active", "inactive", "pending"],
  //     filterFn: (row: any, columnId: any, filterValue: any) => {
  //       if (!filterValue || filterValue.length === 0) return true;
  //       const cellValue = row.getValue(columnId) as string;
  //       return filterValue.some((filterVal: string) =>
  //         cellValue.toLowerCase().includes(filterVal.toLowerCase())
  //       );
  //     },
  //     sortingFn: (row1: any, row2: any) => {
  //       const name1 = row1.getValue("status") as string;
  //       const name2 = row2.getValue("status") as string;
  //       return name1.localeCompare(name2);
  //     },
  //   },
  // ];
  // return (
  //   <CommonDataTable
  //     columnData={mockUsers}
  //     viewMode={viewMode}
  //     setViewMode={setViewMode}
  //     componentColumns={componentColumns}
  //   />
  // );
  return <div>Dashboard</div>;
};

export default Dashboard;
