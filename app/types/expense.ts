export type Expense = {
    id: number,
    title: string,
    amount: number,
    date: string,
    dateAdded: string
}

export type RawExpense = {
    title?: string,
    amount?: string,
    date?: string
}

export type ExpenseValidationResult = {
    valid: boolean,
    data: RawExpense,
    error: any,
}