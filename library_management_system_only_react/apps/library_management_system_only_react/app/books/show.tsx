import { Book } from "../interfaces/book";

export function Show({book, setSelectedBook}: {book: Book, setSelectedBook: (book: Book | null) => void}) {
  return (
    <div>
      <h2>{book.title}</h2>
      <p>{book.author}</p>
      <p>{book.isbn}</p>
      <p>{book.status}</p>
      <button className="btn-primary">Edit</button>
      <button className="btn-danger">Delete</button>
      <button
        className="btn-primary"
        onClick={() => setSelectedBook(null)}>
        Back</button>
    </div>
  );
}