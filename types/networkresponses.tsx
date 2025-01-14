import { Float } from "react-native/Libraries/Types/CodegenTypes";
import { userModel } from "./models";

export type GroupData = {
    id: number;
    name: string;
    expenditure: number;
    currency: string;
    members: userModel[];
};

export type ExpenseData = {
    id: number;
    groupId: number;
    expenseName: string;
    expenseAmount: number;
    category: string;
    paidBy: string;
    splitType: boolean;
    dateCreated: string;
    participants: {
        userId: number;
        splitAmount: number | null;
    }[];
};

export type ExpenseParticipant = {
    id: number;
    expenseAmount: string | null;
};

export type CreateExpenseData = {
    groupId: number;
    categoryId: number;
    expenseName: string;
    totalAmount: number;
    payerId: number; // ID of user who paid
    splitType: boolean; // 0 for even, 1 for uneven
    participants: ExpenseParticipant[];
};
