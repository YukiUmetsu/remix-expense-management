import { useNavigate } from "@remix-run/react";
import { redirect } from "remix";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { deleteExpense, updateExpense } from "~/data/expenses.server";
import { validateExpenseInput } from "~/data/validations.server";

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


    const formData = await request.formData();
    const expenseData = Object.fromEntries(formData);


    try {
       validateExpenseInput(expenseData);
    }
    catch (error) {
        return error;
    }

    await updateExpense(expenseId, expenseData);
    return redirect("/expenses");
}