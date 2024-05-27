import { validateExpenseInput } from "./data/validations.server";
import type { RawExpense } from "./types/expense";

// This function is used to get form data from the request
export const getFormDataFromRequest = async (req: Request) => {
    const formData = await req.formData();
    return await Object.fromEntries(formData);
}

// This function is used to get expense data from the request and validate the expense data
export const getValidateExpenseFromRequest = async (req: Request) => {
    const expenseData = await getFormDataFromRequest(req);
    try {
        validateExpenseInput(expenseData as RawExpense);
     }
     catch (error) {
        return { valid: false, data: expenseData, error: error };
     }
     return { valid: true, data: expenseData, error: null };
}