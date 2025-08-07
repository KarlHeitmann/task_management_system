import { Book } from "../interfaces/book";
import { countDaysToDueDate, printsDate, dueDate } from "../utils";

export function Member({overdueBooks, dueBooks}: {overdueBooks: Book[], dueBooks: Book[]}) {
  return (
    <section className="max-h-[calc(100vh-20rem)] overflow-y-auto">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <ul className="list-disc bg-lime-100 rounded-lg p-4">
          <h2 className="text-xl font-bold text-blue-600">Books due:</h2>
          {
            dueBooks.map((book) => (
              <li key={book.id}>{book.title}
                <br />
                Borrowed at: {printsDate(book.borrowed_at)}
                <span className="bg-lime-900 text-white px-2 py-1 ml-2 rounded">
                  Due Date: {dueDate(book.borrowed_at)} | {countDaysToDueDate(book.borrowed_at)} days left
                </span>
              </li>
            ))
          }
        </ul>
        <ul className="list-disc bg-orange-100 rounded-lg p-4">
          <h2 className="text-xl font-bold text-blue-600">Books borrowed:</h2>
          {
            overdueBooks.map((book) => (
              <li key={book.id}>
                {book.title}
                <br />
                Borrowed at: {printsDate(book.borrowed_at)}
                <span className="bg-amber-900 text-white px-2 py-1 ml-2 rounded">
                  Due Date: {dueDate(book.borrowed_at)} | {countDaysToDueDate(book.borrowed_at)} days ago
                </span>
              </li>
            ))
          }
        </ul>
      </div>
    </section>
  )
}