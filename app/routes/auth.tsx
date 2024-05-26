import authStyles from '~/styles/auth.css'
import AuthForm from '~/components/auth/AuthForm'; // Import the 'AuthForm' component

const AuthPage = () => {
    return (
        <AuthForm />
    );
}

export default AuthPage;
export const links = () => {
    return [{ rel: 'stylesheet', href: authStyles }]
}