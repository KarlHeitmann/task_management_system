// creates default Book with blank fields
export const defaultBook: Book = {
  id: '',
  title: '',
  author: '',
  isbn: '',
  status: undefined,
}

export interface Book {
  id: string;
  title: string;
  author?: string;
  isbn?: string;
  status?: 'available' | 'checked-out' | 'reserved';
}

export interface BookForm {
  title: string;
  author?: string;
  isbn?: string;
}