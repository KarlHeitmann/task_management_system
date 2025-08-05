import { NavLink } from 'react-router';

export function AppNav() {
  return (
    <nav>
      <NavLink to="/" end>
        Home
      </NavLink>
      <NavLink to="/login" end>
        Login
      </NavLink>
      <NavLink to="/help" end>
        Help
      </NavLink>
    </nav>
  );
}
