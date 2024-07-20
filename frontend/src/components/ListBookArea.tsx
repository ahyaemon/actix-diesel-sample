import {BookListItem} from "./BookListItem.tsx";
import {Book} from "../type.ts";

type ListBookAreaProps = {
  books: Book[]
  deleteBook: (bookId: string) => Promise<void>
}

export function ListBookArea({ books, deleteBook }: ListBookAreaProps) {

  return (
    <div>
      <div className="flex flex-col gap-2">
        {
          books && books.map(book => (
            <BookListItem key={book.id} book={book} deleteBook={deleteBook}/>
          ))
        }
      </div>
    </div>
  )
}
