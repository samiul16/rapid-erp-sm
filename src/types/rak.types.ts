// import * as yup from "yup";
// import { divisionSchema } from "../pages/Division/Config/division.schemas";

// export type TRak = {
//   id?: number;
//   name: string;
//   code: string;
//   name_in_bangla: string | null;
//   name_in_arabic: string | null;
//   draft: number | boolean | null;
//   is_active: number | boolean | null;
//   is_deleted: number | boolean | null;
//   is_delete?: number | boolean | null;
//   is_default: number | boolean | null;
//   created_at?: string;
//   updated_at?: string;
//   drafted_at?: string | null;
//   deleted_at?: string | null;
// };

// export type TRakList = {
//   totalRaks: number;
//   totalDraft: number;
//   totalInactive: number;
//   totalActive: number;
//   totalUpdated: number;
//   totalDeleted: number;
//   list: TRak[];
// };

// export type TRakResponse = {
//   data: TRak;
//   error?: { data: { message: string } };
//   message: string;
//   success: boolean;
// };

// export type TRaksResponse = {
//   data?: TRakList;
//   error?: { data: { message: string } };
//   message: string;
//   success: boolean;
// };

// export type TRakFormValues = yup.InferType<typeof divisionSchema>;
