import { useState } from "react";
import { BookForm } from "../interfaces/book";
import { Form } from "./form"

export function New({setNewBook, book, authToken}: {setNewBook: (newBook: boolean) => void, book: BookForm, authToken: string}) {
  const onSubmitServer = async (book: BookForm) => {
    const response = await fetch('/api/v1/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
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