import { User } from "../interfaces/user";
import { UserType } from "../interfaces/user_type";
import { List } from "./list";
import { Show } from "./show";
import { Book, defaultBook } from "../interfaces/book";
import { New } from "./new";
import { useState } from "react";

export default function Books({authToken, mode, user}: {authToken: string, mode: UserType, user: User}) {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [newBook, setNewBook] = useState<boolean>(false);
  const disableButtons = (mode === 'member');

  return (
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
      <div className="flex justify-end items-center">
        <h1 className="mr-4">
          Welcome <span className="font-bold text-blue-500">{user?.email}</span>
        </h1>
        <button 
          className={`btn-primary ${disableButtons ? 'opacity-25 cursor-not-allowed' : ''}`}
          disabled={disableButtons}
          onClick={() => setNewBook(true)}>
          Add new book
        </button>
      </div>
      <section className="mt-8">
        {
          newBook ? (
            <New
              setNewBook={setNewBook}
              book={defaultBook}
              />
          ) : (
            selectedBook ? (
              <Show
                authToken={authToken} mode={mode}
                book={selectedBook} setSelectedBook={setSelectedBook}
                />
            ) : (
              <List setSelectedBook={setSelectedBook}/>
            )
          )
        }
      </section>
    </>
  )
}