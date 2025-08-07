import { UserType } from "../../../interfaces/user_type";

export function Borrow({mode, authToken, book_id}: {mode: UserType, authToken: string, book_id: string}) {

  const onSubmitServer = async () => {
    const response = await fetch(`/api/v1/books/${book_id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
    });
    console.log(response);
    // setNewBook(false);
  }

  return (
    <button
      className={`btn-pill-primary ${mode === 'librarian' ? 'opacity-25 cursor-not-allowed' : ''}`}
      onClick={onSubmitServer}
      disabled={mode === 'librarian'}
      >
      <h1>Borrow</h1>
    </button>
  );
}