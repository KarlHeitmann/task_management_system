import GoogleLoginButton from "../components/google-login-button";

export default function AboutComponent() {
  return (
    <div>
      <h1>About!!!</h1>
      <GoogleLoginButton userType="member" />
      <button onClick={() => window.location.href = 'http://localhost:3000/auth/google_oauth2?user_type=member'}>Login</button>
    </div>
  );
}
