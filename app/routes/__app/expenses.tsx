import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { FaDownload, FaPlus } from "react-icons/fa";
import ExpensesList from "~/components/expenses/ExpensesList";
import { requireUserSession } from "~/data/auth.server";
import { getExpenses } from "~/data/expenses.server";

const ExpensesLayout = () => {
    const expenses = useLoaderData();
    const hasExpenses = expenses.length > 0;

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
                {hasExpenses && <ExpensesList expenses={expenses} />}
                {!hasExpenses && 
                    <>
                        <section id="no-expenses">
                            <h1>No expenses found</h1>
                            <Link to="add"><button>Start adding some</button></Link>
                        </section>
                    </>}
            </main>
        </>
    );
}

export default ExpensesLayout;

export const loader = async ({request}) => {
   await requireUserSession(request);
   return await getExpenses();
}