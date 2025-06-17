// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useMemo, useEffect } from 'react';
// import {
//   useReactTable,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   flexRender,
//   type ColumnDef,
//   type ColumnFiltersState,
//   type SortingState,
//   type RowSelectionState,
//   type PaginationState,
//   type FilterFn,
//   type Column,
//   type Table as TableType,
// } from '@tanstack/react-table';
// import {
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
// } from '@/components/ui/popover';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import {
//   ChevronDown,
//   ChevronLeft,
//   ChevronRight,
//   ChevronsLeft,
//   ChevronsRight,
//   Filter,
//   X,
//   Edit,
//   Check,
//   Trash2,
// } from 'lucide-react';
// import { toast } from 'react-hot-toast';

// // Define our data type
// type Country = {
//   id: string;
//   title: string;
//   code: string;
//   rating: number;
//   status: 'active' | 'inactive' | 'pending';
//   createdAt: string;
//   currency: string;
// };

// // Define filter functions
// const ratingFilter: FilterFn<Country> = (row, columnId, value) => {
//   return row.original.rating >= value;
// };

// // Mock API function for updates
// const updateCountries = async (updates: Partial<Country>[]) => {
//   console.log('Bulk updating:', updates);
//   // In a real app, this would be an actual API call
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({ success: true });
//     }, 1000);
//   });
// };

// // Mock API function for deletions
// const deleteCountries = async (ids: string[]) => {
//   console.log('Deleting:', ids);
//   // In a real app, this would be an actual API call
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({ success: true });
//     }, 1000);
//   });
// };

// // Generate mock data
// const generateMockData = (): Country[] => {
//   const statuses: ('active' | 'inactive' | 'pending')[] = ['active', 'inactive', 'pending'];
//   const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD'];

//   return Array.from({ length: 100 }, (_, i) => ({
//     id: `id-${i}`,
//     title: `Country ${i + 1}`,
//     code: `CODE${String(i + 1).padStart(3, '0')}`,
//     rating: Math.floor(Math.random() * 5) + 1,
//     status: statuses[Math.floor(Math.random() * statuses.length)],
//     createdAt: new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365 * 3))
//       .toISOString()
//       .split('T')[0],
//     currency: currencies[Math.floor(Math.random() * currencies.length)],
//   }));
// };

// export default function CountriesTable() {
//   const [data, setData] = useState<Country[]>(() => generateMockData());
//   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
//   const [sorting, setSorting] = useState<SortingState>([]);
//   const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
//   const [pagination, setPagination] = useState<PaginationState>({
//     pageIndex: 0,
//     pageSize: 10,
//   });
//   const [editableCell, setEditableCell] = useState<{
//     rowId: string;
//     columnId: string;
//   } | null>(null);
//   const [editValue, setEditValue] = useState<any>('');
//   const [isUpdating, setIsUpdating] = useState(false);
//   const [isDeleting, setIsDeleting] = useState(false);

//   // Define columns
//   const columns = useMemo<ColumnDef<Country>[]>(
//     () => [
//       {
//         id: 'select',
//         header: ({ table }) => (
//           <input
//             type="checkbox"
//             checked={table.getIsAllPageRowsSelected()}
//             onChange={table.getToggleAllPageRowsSelectedHandler()}
//             className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//           />
//         ),
//         cell: ({ row }) => (
//           <input
//             type="checkbox"
//             checked={row.getIsSelected()}
//             disabled={!row.getCanSelect()}
//             onChange={row.getToggleSelectedHandler()}
//             className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//           />
//         ),
//       },
//       {
//         accessorKey: 'title',
//         header: () => <TableHeader title="Title" columnId="title" table={table} />,
//         cell: ({ row, getValue }) => (
//           <EditableCell
//             row={row}
//             columnId="title"
//             value={getValue()}
//             editableCell={editableCell}
//             setEditableCell={setEditableCell}
//             editValue={editValue}
//             setEditValue={setEditValue}
//           />
//         ),
//       },
//       {
//         accessorKey: 'code',
//         header: () => <TableHeader title="Code" columnId="code" table={table} />,
//         cell: ({ row, getValue }) => (
//           <EditableCell
//             row={row}
//             columnId="code"
//             value={getValue()}
//             editableCell={editableCell}
//             setEditableCell={setEditableCell}
//             editValue={editValue}
//             setEditValue={setEditValue}
//           />
//         ),
//       },
//       {
//         accessorKey: 'rating',
//         header: () => <TableHeader title="Rating" columnId="rating" table={table} />,
//         cell: ({ row, getValue }) => (
//           <EditableCell
//             row={row}
//             columnId="rating"
//             value={getValue()}
//             editableCell={editableCell}
//             setEditableCell={setEditableCell}
//             editValue={editValue}
//             setEditValue={setEditValue}
//           />
//         ),
//         filterFn: ratingFilter,
//       },
//       {
//         accessorKey: 'status',
//         header: () => <TableHeader title="Status" columnId="status" table={table} />,
//         cell: ({ row, getValue }) => (
//           <EditableCell
//             row={row}
//             columnId="status"
//             value={getValue()}
//             editableCell={editableCell}
//             setEditableCell={setEditableCell}
//             editValue={editValue}
//             setEditValue={setEditValue}
//             isSelect
//             options={['active', 'inactive', 'pending']}
//           />
//         ),
//       },
//       {
//         accessorKey: 'createdAt',
//         header: () => <TableHeader title="Created At" columnId="createdAt" table={table} />,
//         cell: ({ row, getValue }) => (
//           <span className="whitespace-nowrap">
//             {new Date(getValue() as string).toLocaleDateString()}
//           </span>
//         ),
//       },
//       {
//         accessorKey: 'currency',
//         header: () => <TableHeader title="Currency" columnId="currency" table={table} />,
//         cell: ({ row, getValue }) => (
//           <EditableCell
//             row={row}
//             columnId="currency"
//             value={getValue()}
//             editableCell={editableCell}
//             setEditableCell={setEditableCell}
//             editValue={editValue}
//             setEditValue={setEditValue}
//           />
//         ),
//       },
//     ],
//     [editableCell, editValue]
//   );

//   const table = useReactTable({
//     data,
//     columns,
//     state: {
//       columnFilters,
//       sorting,
//       rowSelection,
//       pagination,
//     },
//     onColumnFiltersChange: setColumnFilters,
//     onSortingChange: setSorting,
//     onRowSelectionChange: setRowSelection,
//     onPaginationChange: setPagination,
//     getCoreRowModel: getCoreRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     debugTable: true,
//   });

//   // Handle bulk updates
//   const handleBulkUpdate = async () => {
//     if (!editableCell) return;

//     const { rowId, columnId } = editableCell;
//     const updates = table.getSelectedRowModel().rows.map(row => ({
//       id: row.original.id,
//       [columnId]: editValue,
//     }));

//     try {
//       setIsUpdating(true);
//       await updateCountries(updates);

//       // Update local data
//       setData(prev => prev.map(item => {
//         if (table.getSelectedRowModel().rows.some(row => row.original.id === item.id)) {
//           return { ...item, [columnId]: editValue };
//         }
//         return item;
//       }));

//       toast.success('Bulk update successful');
//       setEditableCell(null);
//     } catch {
//       toast.error('Failed to update');
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   // Handle bulk delete
//   const handleBulkDelete = async () => {
//     const selectedIds = Object.keys(rowSelection).map(
//       id => table.getRow(id).original.id
//     );

//     if (selectedIds.length === 0) {
//       toast.error('No rows selected');
//       return;
//     }

//     try {
//       setIsDeleting(true);
//       await deleteCountries(selectedIds);

//       // Update local data
//       setData(prev => prev.filter(item => !selectedIds.includes(item.id)));
//       setRowSelection({});

//       toast.success('Deleted successfully');
//     } catch {
//       toast.error('Failed to delete');
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   return (
//     <div className="p-4">
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center space-x-2">
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline" className="ml-auto">
//                 Columns <ChevronDown className="ml-2 h-4 w-4" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               {table
//                 .getAllColumns()
//                 .filter(column => column.getCanHide())
//                 .map(column => {
//                   return (
//                     <DropdownMenuCheckboxItem
//                       key={column.id}
//                       className="capitalize"
//                       checked={column.getIsVisible()}
//                       onCheckedChange={value => column.toggleVisibility(!!value)}
//                     >
//                       {column.id}
//                     </DropdownMenuCheckboxItem>
//                   );
//                 })}
//             </DropdownMenuContent>
//           </DropdownMenu>

//           {editableCell && (
//             <Button
//               onClick={handleBulkUpdate}
//               disabled={isUpdating}
//               variant="outline"
//               className="ml-2"
//             >
//               {isUpdating ? 'Saving...' : 'Save Changes'}
//             </Button>
//           )}

//           <Button
//             onClick={handleBulkDelete}
//             disabled={isDeleting || Object.keys(rowSelection).length === 0}
//             variant="destructive"
//             className="ml-2"
//           >
//             {isDeleting ? 'Deleting...' : 'Delete Selected'}
//           </Button>
//         </div>

//         <div className="flex items-center space-x-2">
//           <Input
//             placeholder="Filter all columns..."
//             value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
//             onChange={event =>
//               table.getColumn('title')?.setFilterValue(event.target.value)
//             }
//             className="max-w-sm"
//           />
//         </div>
//       </div>

//       <div className="rounded-md border">
//         <table className="w-full">
//           <thead className="bg-gray-50 dark:bg-gray-800">
//             {table.getHeaderGroups().map(headerGroup => (
//               <tr key={headerGroup.id}>
//                 {headerGroup.headers.map(header => (
//                   <th key={header.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                     {header.isPlaceholder
//                       ? null
//                       : flexRender(
//                           header.column.columnDef.header,
//                           header.getContext()
//                         )}
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
//             {table.getRowModel().rows.map(row => (
//               <tr key={row.id} className={row.getIsSelected() ? 'bg-gray-50 dark:bg-gray-800' : ''}>
//                 {row.getVisibleCells().map(cell => (
//                   <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="flex items-center justify-between mt-4">
//         <div className="flex items-center space-x-2">
//           <span className="text-sm text-gray-700 dark:text-gray-300">
//             Page {table.getState().pagination.pageIndex + 1} of{' '}
//             {table.getPageCount()}
//           </span>
//           <select
//             value={table.getState().pagination.pageSize}
//             onChange={e => {
//               table.setPageSize(Number(e.target.value));
//             }}
//             className="border rounded text-sm p-1"
//           >
//             {[10, 20, 30, 40, 50].map(pageSize => (
//               <option key={pageSize} value={pageSize}>
//                 Show {pageSize}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="flex items-center space-x-2">
//           <Button
//             variant="outline"
//             onClick={() => table.setPageIndex(0)}
//             disabled={!table.getCanPreviousPage()}
//           >
//             <ChevronsLeft className="h-4 w-4" />
//           </Button>
//           <Button
//             variant="outline"
//             onClick={() => table.previousPage()}
//             disabled={!table.getCanPreviousPage()}
//           >
//             <ChevronLeft className="h-4 w-4" />
//           </Button>
//           <Button
//             variant="outline"
//             onClick={() => table.nextPage()}
//             disabled={!table.getCanNextPage()}
//           >
//             <ChevronRight className="h-4 w-4" />
//           </Button>
//           <Button
//             variant="outline"
//             onClick={() => table.setPageIndex(table.getPageCount() - 1)}
//             disabled={!table.getCanNextPage()}
//           >
//             <ChevronsRight className="h-4 w-4" />
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Component for editable cells
// function EditableCell({
//   row,
//   columnId,
//   value,
//   editableCell,
//   setEditableCell,
//   editValue,
//   setEditValue,
//   isSelect = false,
//   options = [],
// }: {
//   row: any;
//   columnId: string;
//   value: any;
//   editableCell: any;
//   setEditableCell: any;
//   editValue: any;
//   setEditValue: any;
//   isSelect?: boolean;
//   options?: string[];
// }) {
//   const isEditing =
//     editableCell?.rowId === row.id && editableCell?.columnId === columnId;

//   const handleEditClick = () => {
//     setEditableCell({ rowId: row.id, columnId });
//     setEditValue(value);
//   };

//   const handleSave = () => {
//     row._valuesCache[columnId] = editValue; // Update the local cache
//     setEditableCell(null);
//   };

//   if (isEditing) {
//     return (
//       <div className="flex items-center space-x-2">
//         {isSelect ? (
//           <select
//             value={editValue}
//             onChange={e => setEditValue(e.target.value)}
//             className="border rounded p-1 text-sm"
//           >
//             {options.map(option => (
//               <option key={option} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>
//         ) : (
//           <Input
//             type={columnId === 'rating' ? 'number' : 'text'}
//             value={editValue}
//             onChange={e => setEditValue(e.target.value)}
//             className="h-8 w-full"
//           />
//         )}
//         <Button
//           onClick={handleSave}
//           size="sm"
//           variant="ghost"
//           className="h-8 w-8 p-0"
//         >
//           <Check className="h-4 w-4" />
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div className="flex items-center">
//       <span>{value}</span>
//       <Button
//         onClick={handleEditClick}
//         size="sm"
//         variant="ghost"
//         className="h-8 w-8 p-0 ml-1 opacity-0 group-hover:opacity-100"
//       >
//         <Edit className="h-4 w-4" />
//       </Button>
//     </div>
//   );
// }

// // Component for table headers with filtering
// function TableHeader({
//   title,
//   columnId,
//   table,
// }: {
//   title: string;
//   columnId: string;
//   table: TableType<Country>;
// }) {
//   const column = table.getColumn(columnId);
//   const [filterValue, setFilterValue] = useState('');

//   const handleFilterChange = (value: string) => {
//     setFilterValue(value);
//     column?.setFilterValue(value);
//   };

//   const clearFilter = () => {
//     setFilterValue('');
//     column?.setFilterValue('');
//   };

//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <div className="flex items-center cursor-pointer">
//           <span>{title}</span>
//           <Filter className="ml-2 h-3 w-3" />
//           {column?.getIsFiltered() && (
//             <span className="ml-1 text-blue-500">*</span>
//           )}
//         </div>
//       </PopoverTrigger>
//       <PopoverContent className="w-48 p-2">
//         <div className="space-y-2">
//           <Input
//             placeholder={`Filter ${title}`}
//             value={filterValue}
//             onChange={e => handleFilterChange(e.target.value)}
//             className="h-8"
//           />
//           {column?.getIsFiltered() && (
//             <Button
//               onClick={clearFilter}
//               variant="ghost"
//               size="sm"
//               className="h-8 w-full"
//             >
//               Clear
//             </Button>
//           )}
//         </div>
//       </PopoverContent>
//     </Popover>
//   );
// }
