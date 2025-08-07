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
      <section className="mt-8 max-h-[calc(100vh-20rem)] overflow-y-auto">
        {
          newBook ? (
            <New
              authToken={authToken}
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
              <List
                authToken={authToken}
                mode={mode}
                setSelectedBook={setSelectedBook}/>
            )
          )
        }
      </section>
      <div className="mt-8 flex justify-end items-center">
        <button 
          className={`btn-primary ${disableButtons ? 'opacity-25 cursor-not-allowed' : ''}`}
          disabled={disableButtons}
          onClick={() => setNewBook(true)}>
          Add new book
        </button>
      </div>
    </>
  )
}