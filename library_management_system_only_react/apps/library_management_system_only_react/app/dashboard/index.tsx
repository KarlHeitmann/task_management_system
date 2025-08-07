import { UserType } from "../interfaces/user_type";
import { User } from "../interfaces/user";
import { useEffect, useState } from "react";
import { Member } from "./member";
import { Librarian } from "./librarian";
import { Book } from "../interfaces/book";

export default function Dashboard({mode, user, authToken}: {mode: UserType, user: User, authToken: string}) {
  const [overdueBooks, setOverdueBooks] = useState<Book[]>([]);
  const [dueBooks, setDueBooks] = useState<Book[]>([]);

  useEffect(() => {
    const submitQuery = async () => {
      const response = await fetch('/api/v1/me', {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });
      const data = await response.json();
      setOverdueBooks(data.overdue_books);
      setDueBooks(data.due_books);
    };
    submitQuery()
  }, []);
  return (
    <div
      className="border-2 border-gray-200 p-4 rounded"
      >
      <h1 className="text-3xl font-bold mr-4 mb-4">
        Welcome <span className="font-bold text-blue-500">{user?.email}</span>
      </h1>
      {
        mode === 'member' ? (
          <Member
            overdueBooks={overdueBooks}
            dueBooks={dueBooks}
            />
        ) : (
          <Librarian
            user={user}
            authToken={authToken}
            />
        )
      }
    </div>
  )
}