// import * as yup from "yup";
// import { statesSchema } from "../pages/States/Config/states.schemas";

// export type TState = {
//     id?: number;
//     code: string;
//     name: string;
//     name_in_bangla: string;
//     name_in_arabic: string;
//     country_id: number | string | null;
//     is_default: number;
//     draft: number;
//     drafted_at: string;
//     is_active: number;
//     is_deleted: number;
//     created_at: string;
//     updated_at: string;
//     deleted_at: string | null;
//     country_name: string;
// }

// export type TStatesList = {
//     totalStates: number;
//     totalDraft: number;
//     totalInactive: number;
//     totalActive: number;
//     totalUpdated: number;
//     totalDeleted: number;
//     list: TState[];
// }

// export type TStateResponse = {
//     data: TState;
//     message: string;
//     success: boolean;
// };

// export type TStatesResponse = {
//     data: TStatesList;
//     message: string;
//     success: boolean;
// };

// export type TStateFormValues = yup.InferType<typeof statesSchema>;
