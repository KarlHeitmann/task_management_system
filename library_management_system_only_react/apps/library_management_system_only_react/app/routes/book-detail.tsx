import { useParams, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { Book } from '../interfaces/book';

export default function BookDetail() {
  const [book, setBook] = useState<Book | null>(null);
  // const [book, setBook] = useState<Book>();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  // Now you can use the id to fetch the book details
  //

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/v1/books/${id}`);
      const data: Book = await response.json();
      console.log(data);
      setBook(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center items-center min-h-screen">
  //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  //     </div>
  //   );
  // }

  // const content = isLoading ? <WaitingWidget /> : <BookContent book={book} />
  const content = isLoading || !book ? <WaitingWidget /> : <BookContent book={book} />
  // const content = isLoading ? <WaitingWidget /> : <BookContent book={book} />

  return (
    <div>
      <div onClick={() => navigate('/')} className="mx-12">
        <span className="text-blue-500 hover:text-blue-600 cursor-pointer">Books</span> / {book ? book.title : id}
      </div>
      {content}
    </div>
  )
}

function WaitingWidget() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  )
}
function BookContent({ book }: { book: Book }) {
// function BookContent(book: Book) {
  return (
    <section className="mx-12 px-12 py-8">
      <p>Book Title: {book.title}</p>
    </section>
  )
}