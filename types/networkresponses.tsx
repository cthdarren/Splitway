import { Float } from "react-native/Libraries/Types/CodegenTypes";
import { userModel } from "./models";

export type groupData = {
  id: number;
  name: string;
  expenditure: number;
  currency: string;
    members: userModel[];
};

export type returnData = {
  data: groupData[];
};

export type expenseParticipant = {
    id: number;
    expenseAmount: string | null;
}

export type createExpenseData = {
    groupId: number;
    categoryId: number;
    expenseName: string;
    totalAmount: number;
    payerId: number; // ID of user who paid
    splitType: boolean; // 0 for even, 1 for uneven
    participants: expenseParticipant[]
}
