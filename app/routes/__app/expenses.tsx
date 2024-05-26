import { Link, Outlet } from "@remix-run/react";
import { FaDownload, FaPlus } from "react-icons/fa";
import ExpensesList from "~/components/expenses/ExpensesList";

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        title: 'First Expense',
        amount: 12.88,
        date: new Date().toISOString(),
    },
    {
        id: 'e2',
        title: 'Second Expense',
        amount: 12.88,
        date: new Date().toISOString(),
    },
];

const ExpensesLayout = () => {
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
                <ExpensesList expenses={DUMMY_EXPENSES} />
            </main>
        </>
    );
}

export default ExpensesLayout;
