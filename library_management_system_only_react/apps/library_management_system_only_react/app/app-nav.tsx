import { NavLink } from 'react-router';

export function AppNav() {
  // const auth_token = localStorage.getItem('auth_token');
  // const isAuth = auth_token === null;

  let isAuth = false;
  let auth_token = null;
  if (typeof window !== 'undefined') {
    console.log('we are running on the client')
    // isAuth = isAuthenticated();
    auth_token = localStorage.getItem('auth_token');
    isAuth = auth_token === null;
    console.log("auth_token: ", auth_token)
    console.log("isAuth: ", isAuth)
  } else {
    console.log('we are running on the server');
  }
  // const isAuthenticated = () => false

  return (
    <nav className="my-6">
      <NavLink className="app-nav" to="/" end>
        Home
      </NavLink>
      { isAuth ? (
        <NavLink className="app-nav" to="/login" end>
          Login
        </NavLink>
      ) : (
        <NavLink className="app-nav" to="/logout" end>
          Logout
        </NavLink>
      )}
      <NavLink className="app-nav" to="/help" end>
        Help
      </NavLink>
    </nav>
  );
}
