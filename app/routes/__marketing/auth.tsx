import authStyles from '~/styles/auth.css'
import AuthForm from '~/components/auth/AuthForm'; // Import the 'AuthForm' component
import { getFormDataFromRequest } from '~/util';
import { redirect } from 'remix';

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
    // TODO: Auth
    return redirect('/expenses');
}