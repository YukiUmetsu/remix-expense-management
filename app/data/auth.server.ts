import type { UserInput } from "~/types/user"
import { prisma } from "./database.server"
import {compare, hash} from 'bcryptjs';
import { createCookieSessionStorage, redirect } from "remix";

const SESSION_SECRET = process.env.SESSION_SECRET || "";
const sessionStorage = createCookieSessionStorage({
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        secrets: [SESSION_SECRET],
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        httpOnly: true,
    }
});

const createUserSession = async (userId: string, redirectPath: string) => {
    const session = await sessionStorage.getSession();
    session.set('userId', userId);
    const cookie = await sessionStorage.commitSession(session);
    return redirect(redirectPath, {
        headers: {
            'Set-Cookie': cookie,
        }
    });
} 

export const signup = async ({email, password}: UserInput) => {
    email = String(email).toLowerCase();
    const existingUser = await prisma.user.findFirst({ where: { email } });
    if (existingUser) {
        throw new Error('Email already exists.');
    }
    const passwordHash = await hash(String(password), 12);
    const user = await prisma.user.create({ data: { email, password: passwordHash } })
    return createUserSession(user.id, '/expenses');
}

export const login = async ({email, password}: UserInput) => {
    email = String(email).toLowerCase();
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
        throw new Error('Invalid email or password.');
    }
    const passwordMatch = await compare(String(password), user.password);
    if (!passwordMatch) {
        throw { password: new Error('Invalid email or password.'), status: 422 };
    }
    return createUserSession(user.id, '/expenses');
}

export const getUserFromSession = async (request) => {
    const session = await sessionStorage.getSession(request.headers.get('Cookie'));
    const userId = session.get('userId'); 
    if (!userId) {
        return null;
    }
    return userId;
}

export const destroyUserSession = async (request) => {
    const session = await sessionStorage.getSession(request.headers.get('Cookie'));
    return redirect('/', {
        headers: {
            'Set-Cookie': await sessionStorage.destroySession(session),
        }
    });
}