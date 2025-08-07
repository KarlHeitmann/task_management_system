// import { Books } from "./routes/books";
import Books from "./books";
import { useEffect, useState } from "react";
import { User } from "./interfaces/user";
import { UserType } from "./interfaces/user_type";
import Login from "./routes/login";
import Dashboard from "./dashboard";

export function App() {
  const [user, setUser] = useState<User | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [mode, setMode] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userStored = localStorage.getItem('user');
    const authTokenStored = localStorage.getItem('auth_token');
    if (userStored) {
      setUser(JSON.parse(userStored));
      setMode(JSON.parse(userStored).user_type as UserType);
    }
    if (authTokenStored) {
      setAuthToken(authTokenStored);
    }
    setIsLoading(false)
  }, []);

  if (isLoading) {
    return (
      <div>Loading...</div>
    )
  } else {
    let content;
    if (authToken) {
      content = (
        <>
          <div className="flex justify-end">
            {authToken && (<button
                className="btn-danger"
                onClick={() => {
                  localStorage.removeItem('auth_token')
                  localStorage.removeItem('user')
                  window.location.reload();
                }}>
                Logout
              </button>
              )
            }
          </div>
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              My Library
            </h1>
            <h2>
              Mode: {mode}
            </h2>
          </div>
          <Dashboard mode={mode} user={user} authToken={authToken}/>
          <Books authToken={authToken} mode={mode}/>
        </>
      )
    } else {
      content = (
        <Login />
      )
    }
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {content}
      </div>
    )
  }
}

export default App;
