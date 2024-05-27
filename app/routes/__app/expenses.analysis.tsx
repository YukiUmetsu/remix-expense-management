
import { Link, useLoaderData } from "@remix-run/react";
import Chart from "~/components/expenses/Chart";
import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";
import { requireUserSession } from "~/data/auth.server";
import { getExpenses } from "~/data/expenses.server";

const ExpensesAnalysisPage = () => {
    const expenses = useLoaderData();
    const hasExpenses = expenses.length > 0;

    if (!hasExpenses) return (
        <section id="no-expenses">
            <h1>No expenses found</h1>
            <Link to="/expenses"><button>Start adding some</button></Link>
        </section>
    )

    return (
        <main>
            <Chart expenses={expenses} />
            <ExpenseStatistics expenses={expenses}/>
        </main>
    );
}

export default ExpensesAnalysisPage;

export const loader = async ({request}) => {
    await requireUserSession(request);
    return await getExpenses();
 }