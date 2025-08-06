import { User } from "../interfaces/user";
import { UserType } from "../interfaces/user_type";
import { List } from "./list";
import { Show } from "./show";
import { Book } from "../interfaces/book";
import { useState } from "react";

export default function Books({authToken, mode, user}: {authToken: string, mode: UserType, user: User}) {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  return (
    <>
      <div className="flex justify-end">
        <button 
          className="btn-primary mx-12"
          onClick={() => console.log("Add new book")}>
          Add new book
        </button>
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
      <h1>
        Welcome {user?.email}
      </h1>
      {selectedBook ? (
        <Show book={selectedBook} setSelectedBook={setSelectedBook}/>
      ) : (
        <List setSelectedBook={setSelectedBook}/>
      )}
    </>
  )
}