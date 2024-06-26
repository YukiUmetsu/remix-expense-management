import { Form, Link, useActionData, useMatches, useTransition as useNavigation, useParams } from "@remix-run/react";

function ExpenseForm() {
  const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10
  const validationErrors = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== 'idle';

  // get the prefetched expenses data  and filter to get the expense data with the same id
  const matches = useMatches();
  const expenses =  matches.find(match => match.id === 'routes/__app/expenses')?.data || [];
  const params = useParams();
  const expenseData = expenses.find(expense => expense.id === params.id);

  const defaultValues = expenseData ? { 
    title: expenseData.title,
    amount: expenseData.amount,
    date: expenseData.date
  }: {
    title: '',
    amount: '',
    date: ''
  };

  return (
    <Form 
      method={expenseData ? 'patch': 'post'} 
      className="form" 
      id="expense-form"
    >
      <p>
        <label htmlFor="title">Expense Title</label>
        <input type="text" id="title" name="title" required maxLength={30} defaultValue={defaultValues.title}/>
      </p>

      <div className="form-row">
        <p>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            min="0"
            step="0.01"
            required
            defaultValue={defaultValues.amount}
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input type="date" id="date" name="date" max={today} required defaultValue={defaultValues.date ? defaultValues.date.slice(0, 10) : today} />
        </p>
      </div>
      {
        validationErrors && <ul>
          {Object.values(validationErrors).map((error, index) => <li key={index}>{error}</li>)}
        </ul>
      }
      <div className="form-actions">
        <button disabled={isSubmitting} type="submit">{isSubmitting ? 'Saving Expense...': 'Save Expense'}</button>
        <Link to="..">Cancel</Link>
      </div>
    </Form>
  );
}

export default ExpenseForm;