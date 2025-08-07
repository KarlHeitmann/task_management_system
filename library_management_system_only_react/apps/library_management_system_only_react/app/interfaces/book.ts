// creates default Book with blank fields
export const defaultBook: Book = {
  id: '',
  title: '',
  author: '',
  isbn: '',
  borrowed_at: '',
  returned_at: '',
  member_id: undefined,
  status: undefined,
}

export interface Book {
  id: string;
  title: string;
  author?: string;
  isbn?: string;
  borrowed_at: string;
  returned_at: string;
  member_id?: number;
  status?: 'available' | 'checked-out' | 'reserved';
}

export interface BookForm {
  title: string;
  author?: string;
  isbn?: string;
}