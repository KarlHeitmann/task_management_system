import { Book } from "../interfaces/book";
import { BookForm } from "../interfaces/book";
import { UserType } from "../interfaces/user_type";
import { useState } from "react";
import { Form } from "./form";

export function Show({authToken, mode, book, setSelectedBook}: {authToken: string, mode: UserType, book: Book, setSelectedBook: (book: Book | null) => void}) {
  const [edit, setEdit] = useState(false);
  const disableButtons = (mode === 'member')

  const book_id = book.id

  const onSubmitServer = async (book: BookForm) => {
    const response = await fetch(`/api/v1/books/${book_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({ book }),
    });
    console.log(response);
    setEdit(false);
    setSelectedBook(null);
  }

  return (
    <div>
      {edit ? (
        <>
          <Form
            onSubmitServer={onSubmitServer}
            book={book}
          />
        </>
      ):(
        <>
          <h2 className="text-xl font-bold text-blue-600">{book.title}</h2>
          <p><span className="font-bold">Author: </span>{book.author}</p>
          <p><span className="font-bold">ISBN: </span>{book.isbn}</p>
          <p><span className="font-bold">Status: </span>{book.status}</p>
        </>
      )
        }
      <div className="my-4">
        <button
          className={`btn-primary mx-4 ${disableButtons ? 'opacity-25 cursor-not-allowed' : ''}`}
          onClick={() => {
            setEdit(true);
          }}
          disabled={disableButtons}>
            Edit
        </button>
        <button
          className={`btn-danger mx-4 ${disableButtons ? 'opacity-25 cursor-not-allowed' : ''}`}
          onClick={async () => {
            const response = await fetch(`/api/v1/books/${book.id}`, {
              method: 'DELETE',
            });
            console.log(response);
            setSelectedBook(null);
          }}
          disabled={disableButtons}>
            Delete
        </button>
        <button
          className="btn-primary mx-4"
          onClick={() => setSelectedBook(null)}>
          Back</button>

      </div>
    </div>
  );
}