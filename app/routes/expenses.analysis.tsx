
import Chart from "~/components/expenses/Chart";
import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        title: 'First Expense',
        amount: 12.88,
        date: new Date().toISOString(),
    },
    {
        id: 'e2',
        title: 'First Expense',
        amount: 12.88,
        date: new Date().toISOString(),
    },
];


const ExpensesAnalysisPage = () => {
    return (
        <main>
            <Chart expenses={DUMMY_EXPENSES} />
            <ExpenseStatistics expenses={DUMMY_EXPENSES}/>
        </main>
    );
}

export default ExpensesAnalysisPage;