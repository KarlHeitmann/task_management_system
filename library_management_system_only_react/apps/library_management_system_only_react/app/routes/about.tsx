export default function AboutComponent() {
  return (
    <div>
      <h1>LOGIN!!!</h1>
      <button onClick={() => {
        window.location.href = 'http://localhost:3000/auth/google_oauth2?user_type=member';
      }}>Login</button>
    </div>
  );
}
