import {Book} from "../type.ts";

type BookListItemProps = {
  book: Book
  deleteBook: (bookId: string) => Promise<void>
}

export function BookListItem({ book, deleteBook }: BookListItemProps) {
  return (
    <div
      className="px-2 py-1 border border-solid border-slate-300 rounded max-w-screen-sm flex flex-row justify-between items-center"
    >
      <div>
        <p
          className="font-bold"
        >
          {book.title}
        </p>
        <p>{book.author}</p>
      </div>
      <div>
        <button
          type="button"
          className="px-2 py-0.5 rounded bg-red-600 hover:bg-red-700 text-white bold"
          onClick={() => {
            deleteBook(book.id).catch(e => console.error(e))
          }}
        >DELETE
        </button>
      </div>
    </div>
  )
}
