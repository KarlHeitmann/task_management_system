export default function Logout() {
  return (
    <div>
      <h2 className="text-2xl font-bold">Logout</h2>
      <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded" onClick={() => localStorage.removeItem('auth_token')}>Logout</button>
    </div>
  );
}