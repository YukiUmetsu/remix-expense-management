import type { Expense } from "./expense";

export type UserType = {
    id?: string;
    email: string;
    password: string;
    expenses?: Expense[];
}

export type UserInput = {[k: string]: FormDataEntryValue};

export type UserError = {
    status: number;
    message: string;
}