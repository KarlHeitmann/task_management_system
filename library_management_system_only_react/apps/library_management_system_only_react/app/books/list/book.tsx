import { Book as BookInterface } from '../../interfaces/book';

export function Book({book, setSelectedBook}: {book: BookInterface, setSelectedBook: (book: BookInterface) => void}) {
  return (
    <li key={book.id} className="cursor-pointer px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors duration-150">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0"
        onClick={() => {
          setSelectedBook(book);
        }}>
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
        </div>
        <div className="ml-4">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            book.status === 'available' 
              ? 'bg-green-100 text-green-800' 
              : book.status === 'checked-out'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-gray-100 text-gray-800'
          }`}>
            {book.status || 'Unknown status'}
          </span>
        </div>
      </div>
    </li>
  );
}