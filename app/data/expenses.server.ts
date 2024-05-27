import type { RawExpense } from '~/types/expense';
import {prisma} from './database.server'

export const addExpense = async (expenseData: RawExpense) => {
    try {
        await prisma.expense.create({
            data: {
                title: expenseData?.title || '',
                amount: +(expenseData?.amount || 0),
                date: new Date(expenseData?.date || '2024-01-01'),
                User: { connect: { id: expenseData?.userId }},
            }
        });
    }
    catch (error) {
        console.log(error);
        throw new Error("Failed to add expense");
    }
}

export const getExpenses = async (userId: string) => {
    if (!userId) throw new Error("Failed to get expenses");
    try {
        return await prisma.expense.findMany({
            where: { userId: userId},
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


export const deleteExpense = async (id: string) => {
    try {
        await prisma.expense.delete({
            where: { id: id }
        });
    }
    catch (error) {
        console.log(error);
        throw new Error("Failed to delete expense");
    }
}   