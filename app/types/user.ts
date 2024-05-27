import type { Expense } from "./expense";

export type UserType = {
    id?: string;
    email: string;
    password: string;
    expenses?: Expense[];
}