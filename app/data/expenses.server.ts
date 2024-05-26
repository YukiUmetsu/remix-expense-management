import type { RawExpense } from '~/types/expense';
import {prisma} from './database.server'

export const addExpense = async (expenseData: RawExpense) => {
    try {
        await prisma.expense.create({
            data: {
                title: expenseData?.title,
                amount: +(expenseData?.amount || 0),
                date: new Date(expenseData?.date || '2024-01-01'),
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

export const getExpense = async (id: string) => {
    try {
        return await prisma.expense.findFirst({ where: { id: id } });
    }
    catch (error) {
        console.log(error);
        throw new Error("Failed to get expense");
    }
}

export const updateExpense = async (id: string, expenseData: RawExpense) => {
    try {
        await prisma.expense.update({
            where: { id: id },
            data: {
                title: expenseData?.title,
                amount: +(expenseData?.amount || 0),
                date: new Date(expenseData?.date || '2024-01-01'),
            }
        });
    }
    catch (error) {
        console.log(error);
        throw new Error("Failed to update expense");
    }
}
