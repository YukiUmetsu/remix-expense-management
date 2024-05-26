// resource route
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

export const loader = () => {
    return DUMMY_EXPENSES;
}