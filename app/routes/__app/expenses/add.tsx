import { useNavigate } from "@remix-run/react";
import { redirect } from "remix";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { addExpense } from "~/data/expenses.server";
import { validateExpenseInput } from "~/data/validations.server";
import type { RawExpense } from "~/types/expense";
import { getValidateExpenseFromRequest } from "~/util";

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
    const result = await getValidateExpenseFromRequest(request);
    if (result.error) {
        return result.error;
    }
  
    await addExpense(result.data as RawExpense);
    return redirect('/expenses');
}