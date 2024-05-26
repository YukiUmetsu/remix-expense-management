import { useNavigate } from "@remix-run/react";
import { redirect } from "remix";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { addExpense } from "~/data/expenses.server";
import { validateExpenseInput } from "~/data/validations.server";
import type { RawExpense } from "~/types/expense";

const ExpensesAddPage = () => {
    const navigate = useNavigate();
    const closeHandler = () => {
        navigate("..");
    }

    return (
        <Modal onClose={closeHandler}>
            <ExpenseForm />
        </Modal>
    );
}

export default ExpensesAddPage;

export const action = async ({request}: {request: Request}) => {
    const formData = await request.formData();
    const expenseData = Object.fromEntries(formData) as RawExpense;
  
    try {
      validateExpenseInput(expenseData);
    } catch (error) {
        console.log(`Error: ${error}`);
        return error;
    }
  
    await addExpense(expenseData);
    return redirect('/expenses');
}