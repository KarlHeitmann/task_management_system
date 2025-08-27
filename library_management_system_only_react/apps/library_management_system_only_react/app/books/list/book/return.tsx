import { UserType } from "../../../interfaces/user_type";

export function Return({mode, authToken, book_id}: {mode: UserType, authToken: string, book_id: string}) {
  const onSubmitServer = async () => {
    const response = await fetch(`/api/v1/books/${book_id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
    });
    // TODO: Refresh list of books when borrow is successful. Don't use window.location.reload();
    window.location.reload();
  }

  return (
    <button
      className={`btn-pill-secondary ${mode === 'member' ? 'opacity-25 cursor-not-allowed' : ''}`}
      onClick={onSubmitServer}
      disabled={mode === 'member'}
      >
      <h1>Return</h1>
    </button>
  );
}