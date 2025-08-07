import { Book as BookInterface } from '../../../interfaces/book';
import { Borrow } from './borrow';
import { Return } from './return';
import { UserType } from '../../../interfaces/user_type';
import { countDaysToDueDate, printsDate } from '../../../utils';

export function Book({book, setSelectedBook, mode, authToken}: {book: BookInterface, setSelectedBook: (book: BookInterface) => void, mode: UserType, authToken: string}) {
  // const action = "???"
  let action
  if (book.member_id == null) {
    action = <Borrow mode={mode} authToken={authToken} book_id={book.id}/>
  } else {
    action = <Return mode={mode} authToken={authToken} book_id={book.id}/>
  }
  const daysLeft = countDaysToDueDate(book.borrowed_at);
  return (
    <li key={book.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors duration-150">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-blue-600 truncate">
            {book.title}
          </p>
          {book.author && (
            <p className="mt-1 text-sm text-gray-500">
              by {book.author}
            </p>
          )}
          {book.isbn && (
            <p className="mt-1 text-xs text-gray-400">
              ISBN: {book.isbn}
            </p>
          )}
          {
            book.member_id && (
              <p className={`mt-1 text-sm text-gray-900 rounded-md px-2 py-1 ${Number(daysLeft) < 0 ? 'bg-red-100 text-red-800' : 'bg-amber-100'}`}>
                Book was borrowed: {printsDate(book.borrowed_at)}
                <br />
                {
                  Number(daysLeft) < 0 ? (
                    <span className="text-red-800">Overdue by {daysLeft}</span>
                  ) : (
                    <span className="text-amber-800">Days left to return it: {daysLeft}</span>
                  )
                }
              </p>
            )
          }
        </div>
        <div className="ml-4">
          <span className={`inline-flex items-center mx-1 px-2.5 py-0.5 rounded-full text-md font-medium ${
            book.status === 'available' 
              ? 'bg-green-100 text-green-800' 
              : book.status === 'checked-out'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-gray-100 text-gray-800'
          }`}>
            {book.status || 'Unknown status'}
          </span>
            <span
              onClick={() => {
                setSelectedBook(book);
              }}
              className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white inline-flex items-center mx-1 px-2.5 py-0.5 rounded-full text-md font-medium">
              View
            </span>
            { action }
        </div>
      </div>
    </li>
  );
}