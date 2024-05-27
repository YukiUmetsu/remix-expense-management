import { useNavigate } from "@remix-run/react";
import { redirect } from "remix";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { deleteExpense, updateExpense } from "~/data/expenses.server";
import type { Expense, RawExpense } from "~/types/expense";
import { getValidateExpenseFromRequest } from "~/util";

const UpdateExpensesPage = () => {
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

export default UpdateExpensesPage;

export const action = async ({params, request}) => {
    const expenseId = params.id;
    
    if (request.method === 'DELETE') {
        await deleteExpense(expenseId);
        return { deletedId: expenseId };
    }


    const result = await getValidateExpenseFromRequest(request);
    if (result.error) {
        return result.error;
    }
    await updateExpense(expenseId, result.data as RawExpense);
    return redirect("/expenses");
}

export const meta = ({params, location, data, parentData}) => {
    const expense = parentData['routes/__app/expenses/'].find((expense: Expense) => expense.id === params.id);
    return {
        title: expense.title || 'update your expense',
        description: "Update an expense",
    };
}