import { Book } from "../interfaces/book";
import { User } from "../interfaces/user";
import { countDaysToDueDate, dueDate, printsDate } from "../utils"

export function Librarian({totalBooks, totalBorrowedBooks, booksDueToday, membersWithOverdueBooks}: {totalBooks: number, totalBorrowedBooks: number, booksDueToday: Book[], membersWithOverdueBooks: User[]}) {
  return (
    <section>
      <div className="flex">
        <p className="mr-4">Total books: <span className="font-bold">{totalBooks}</span></p>
        <p className="mr-4">Total borrowed books: <span className="font-bold">{totalBorrowedBooks}</span></p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <ul>
          <h2 className="text-xl font-bold text-blue-600">Books due today</h2>
          {
            booksDueToday.map((book) => (
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
        <ul>
          <h2 className="text-xl font-bold text-blue-600">Members with overdue books</h2>
          {
            membersWithOverdueBooks.map((user) => (
              <li key={user.id}>{user.email}</li>
            ))
          }
        </ul>
      </div>
    </section>
  )
}