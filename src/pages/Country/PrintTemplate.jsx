// // PrintTemplate.tsx
// import { Copyright, LayoutGrid } from "lucide-react";

// export interface CountryData {
//   code?: string;
//   name?: string;
//   createdTime?: string;
//   deletedTime?: string;
//   draft?: boolean;
//   draftedTime?: string;
//   name_in_arabic?: string;
//   print?: boolean;
//   is_active?: boolean;
// }

// const PrintTemplate = ({ countryData }: { countryData: CountryData }) => {
//   console.log("countryData", countryData);

//   return (
//     <div className="print-container h-screen">
//       <header>
//         <div
//           style={{ backgroundColor: "#F3F6F9" }}
//           className="flex items-center justify-between shadow-sm z-20 w-full border-b border-[#62a3fd] py-4 px-4"
//         >
//           <div className="flex gap-x-4 items-center">
//             <h1 className="text-black origin-left font-semibold text-sm lg:text-2xl duration-200 hover:cursor-pointer">
//               Rapid ERP
//             </h1>
//             <LayoutGrid
//               className="cursor-pointer hover:text-[#2274e7]"
//               strokeWidth={1.5}
//             />
//           </div>
//         </div>
//       </header>
//       <div className="content py-4 px-5 space-y-2">
//         <h2 className="!text-black">Code: {countryData?.code}</h2>
//         <h2 className="!text-black">Name: {countryData?.name}</h2>
//         <p className="!text-black">Created Time: {countryData?.createdTime}</p>
//         <p className="!text-black">Deleted Time: {countryData?.deletedTime}</p>
//         <p className="!text-black">
//           Draft: {countryData?.draft ? "Yes" : "No"}
//         </p>
//         <p className="!text-black">Drafted Time: {countryData?.draftedTime}</p>
//         <p className="!text-black">
//           Name in Arabic: {countryData?.name_in_arabic}
//         </p>
//         <p>Print: {countryData?.print ? "Yes" : "No"}</p>
//         <p>Status: {countryData?.is_active ? "Active" : "Inactive"}</p>
//       </div>
//       <footer
//         style={{ backgroundColor: "#F3F6F9" }}
//         className="footer fixed bottom-0 left-0 w-full"
//       >
//         <div className="py-4 px-5 flex justify-between border-t">
//           <p className="flex gap-1">
//             1996 <Copyright className="font-normal" size={20} /> Rapid
//           </p>
//           <h3 className="hover:text-[#639ff2] cursor-pointer">Need Help!</h3>
//           <h3 className="hover:text-[#639ff2] cursor-pointer">Live Chat</h3>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default PrintTemplate;
