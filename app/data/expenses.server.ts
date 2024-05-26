import type { RawExpense } from '~/types/expense';
import {prisma} from './database.server'

export const addExpense = async (expenseData: RawExpense) => {
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
        console.log(error);
        throw new Error("Failed to add expense");
    }
}

export const getExpenses = async () => {
    try {
        return await prisma.expense.findMany({
            orderBy: {
                date: 'desc'
            }
        });
    }
    catch (error) {
        throw new Error("Failed to get expenses");
    }
}