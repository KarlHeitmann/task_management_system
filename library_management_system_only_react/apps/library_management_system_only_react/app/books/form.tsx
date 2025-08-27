import { BookForm } from "../interfaces/book";
import { useState } from "react";

export function Form({book, onSubmitServer}: {book: BookForm, onSubmitServer: (book: BookForm) => void}) {

  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [isbn, setIsbn] = useState(book.isbn);

  const onFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'title') {
      setTitle(value);
    } else if (name === 'author') {
      setAuthor(value);
    } else if (name === 'isbn') {
      setIsbn(value);
    }
  }

  const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const book: BookForm = {
      title,
      author,
      isbn,
    };
    onSubmitServer(book);
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" required value={title} onChange={onFieldChange}/>
      </div>
      <div>
        <label htmlFor="author">Author:</label>
        <input type="text" id="author" name="author" required value={author} onChange={onFieldChange}/>
      </div>
      <div>
        <label htmlFor="isbn">ISBN:</label>
        <input type="text" id="isbn" name="isbn" required value={isbn} onChange={onFieldChange}/>
      </div>
      <button type="submit" className="btn-primary">Submit</button>
    </form>
  );
}