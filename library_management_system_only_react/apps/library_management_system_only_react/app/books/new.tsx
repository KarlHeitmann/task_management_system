import { useState } from "react";
import { BookForm } from "../interfaces/book";
import { Form } from "./form"

export function New({setNewBook, book}: {setNewBook: (newBook: boolean) => void, book: BookForm}) {
  const onSubmitServer = async (book: BookForm) => {
    const response = await fetch('/api/v1/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ book }),
    });
    console.log(response);
    setNewBook(false);
  }
  return (
    <div>
      <h2 className="text-xl font-bold text-blue-600">New Book</h2>
      <Form
        book={book}
        onSubmitServer={onSubmitServer}
      />

      <button
        className="btn-secondary"
        onClick={() => setNewBook(false)}>
        Back
      </button>
    </div>
  );
}