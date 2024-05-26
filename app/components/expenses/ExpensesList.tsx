import type { Expense } from '~/types/expense';
import ExpenseListItem from './ExpenseListItem';

function ExpensesList({ expenses }: { expenses: Expense[] }) {

  return (
    <ol id="expenses-list">
      {expenses.map((expense: Expense) => (
        <li key={expense.id}>
          <ExpenseListItem
            id={expense.id}
            title={expense.title}
            amount={expense.amount}
          />
        </li>
      ))}
    </ol>
  );
}

export default ExpensesList;
