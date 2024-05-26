import {prisma} from './database.server'

export const addExpense = async (expenseData) => {
    try {
        await prisma.expense.create({
            data: {
                title: expenseData.title,
                amount: +expenseData.amount,
                date: new Date(expenseData.date),
            }
        });
    }
    catch (error) {
        throw new Error("Failed to add expense");
    }
}