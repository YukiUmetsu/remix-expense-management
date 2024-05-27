import authStyles from '~/styles/auth.css'
import AuthForm from '~/components/auth/AuthForm'; // Import the 'AuthForm' component
import { getFormDataFromRequest } from '~/util';
import { redirect } from 'remix';
import { validateCredentials } from '~/data/validations.server';
import type { UserInput } from '~/types/user';
import { login, signup } from '~/data/auth.server';

const AuthPage = () => {
    return (
        <AuthForm />
    );
}

export default AuthPage;
export const links = () => {
    return [{ rel: 'stylesheet', href: authStyles }]
}

export const action = async ({request}: Request) => {
    const searchParams = new URL(request.url).searchParams;
    const authMode = searchParams.get('mode') || 'login';
    const credentials = await getFormDataFromRequest(request);
    try {
        validateCredentials(credentials as UserInput);
    } catch (error) {
        return new Response(JSON.stringify(error), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    try {
        if (authMode === 'signup') {
            return await signup(credentials as UserInput);
       } else {
            return await login(credentials as UserInput);
       }   
    } catch (error: Error) {
        return {credentials: error?.message || ''}
    }

    return redirect('/expenses');
}