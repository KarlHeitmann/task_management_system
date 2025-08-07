import { UserType } from "../../../interfaces/user_type";

export function Return({mode}: {mode: UserType}) {
  return (
    <button
      className={`btn-pill-secondary ${mode === 'member' ? 'opacity-25 cursor-not-allowed' : ''}`}
      disabled={mode === 'member'}
      >
      <h1>Return</h1>
    </button>
  );
}