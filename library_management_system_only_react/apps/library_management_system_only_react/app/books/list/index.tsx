import { useEffect, useState } from 'react';
import { Book as BookInterface } from '../../interfaces/book';
import { Book } from './book';
import { UserType } from '../../interfaces/user_type';

export function List({setSelectedBook, authToken, mode}: {setSelectedBook: (book: BookInterface) => void, authToken: string, mode: UserType}) {
  const [books, setBooks] = useState<BookInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (querySearch: string | null) => {
    const url = querySearch == null ? '/api/v1/books' : `/api/v1/books?${new URLSearchParams({ q: querySearch }).toString()}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const data = await response.json();
      setBooks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(null);
  }, []);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    fetchData(e.target.value)
  };

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
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Book Catalog</h3>
        <div>
          <label htmlFor="search">Search:</label>
          <input
            type="text"
            id="search"
            name="search"
            value={search}
            onChange={onSearchChange}
            className="border border-4 border-blue-500 rounded m-1 px-2 py-1"
          />
        </div>
      </div>
      
      {books.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          No books found in the library.
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {books.map((book) => (
            <Book mode={mode} authToken={authToken} key={book.id} book={book} setSelectedBook={setSelectedBook}/>
          ))}
        </ul>
      )}
    </div>
  );
}
