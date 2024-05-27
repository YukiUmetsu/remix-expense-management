import authStyles from '~/styles/auth.css'
import AuthForm from '~/components/auth/AuthForm'; // Import the 'AuthForm' component
import { getFormDataFromRequest } from '~/util';
import { redirect } from 'remix';
import { validateCredentials } from '~/data/validations.server';
import { UserType } from '~/types/user';
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
        validateCredentials(credentials as UserType);
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
            return await signup(credentials as UserType);
       } else {
            return await login(credentials as UserType);
       }   
    } catch (error) {
        if (error?.status === 422) {
            return {credentials: error?.message}
        }
    }

    return redirect('/expenses');
}