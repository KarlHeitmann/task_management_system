import { useEffect, useState } from 'react';

interface Book {
  id: string;
  title: string;
  author?: string;
  isbn?: string;
  status?: 'available' | 'checked-out' | 'reserved';
}

export function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/v1/books');
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        const data = await response.json();
        setBooks(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching books:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block">Library Management</span>
          <span className="block text-blue-600">System</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Manage your book collection with ease
        </p>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Book Catalog</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">List of all available books in the library</p>
        </div>
        
        {books.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No books found in the library.
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {books.map((book) => (
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
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
