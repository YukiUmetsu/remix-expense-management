import { Link, useSearchParams } from '@remix-run/react';
import { FaLock, FaUserPlus } from 'react-icons/fa';

function AuthForm() {
  const [searchParams] = useSearchParams();
  const authMode = searchParams.get('mode') == 'signup' ? 'signup' : 'login';
  const submitBtnCaption = authMode === 'login' ? 'Login' : 'Signup';
  const toggleBtnCaption = authMode === 'login' ? 'Create a new user' : 'Log in with existing user';
  const actionLinkPath = authMode === 'login' ? '?mode=signup' : '?mode=login';

  return (
    <form method="post" className="form" id="auth-form">
      <div className="icon-img">
        {authMode === 'login' ? <FaLock /> : <FaUserPlus />}
      </div>
      <p>
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" name="email" required />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" minLength={7} />
      </p>
      <div className="form-actions">
        <button>{submitBtnCaption}</button>
        <Link to={actionLinkPath}>{toggleBtnCaption}</Link>
      </div>
    </form>
  );
}

export default AuthForm;
