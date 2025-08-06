import { useState } from 'react';

export default function LoginComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    // const res = await fetch('http://localhost:3000/api/v1/login', {
    const res = await fetch('/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('auth_token', data.token);
      alert('Logged in!');
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="px-auto mx-4">
      <h2 className="text-2xl font-bold">Login</h2>
      <input className="border border-gray-300 rounded px-2 py-1" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      <input className="border border-gray-300 rounded px-2 py-1" placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)} />
      <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" onClick={login}>Login</button>
    </div>
  );
}
