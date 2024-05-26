import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { FaDownload, FaPlus } from "react-icons/fa";
import ExpensesList from "~/components/expenses/ExpensesList";
import { getExpenses } from "~/data/expenses.server";

const ExpensesLayout = () => {
    const expenses = useLoaderData();

    return (
        <>
            <Outlet />
            <main>
                <section id="expenses-actions">
                    <Link to="add">
                        <FaPlus />
                        <span>Add New Expense</span>
                    </Link>
                    <a href="/expenses/raw" target="_blank">
                        <FaDownload />
                        <span>Download Raw Data</span>
                    </a>
                </section>
                <ExpensesList expenses={expenses} />
            </main>
        </>
    );
}

export default ExpensesLayout;

export const loader = async () => {
   return await getExpenses();
}