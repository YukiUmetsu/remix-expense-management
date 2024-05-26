import { useNavigate } from "@remix-run/react";
import { redirect } from "remix";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { addExpense } from "~/data/expenses.server";

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
    const expenseData = Object.fromEntries(formData);
    console.log(expenseData);
    await addExpense(expenseData);
    return redirect("/expenses");
}