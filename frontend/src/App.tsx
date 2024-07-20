import useSWR from "swr";
import {bookRepository} from "./repository.ts";
import {AddBookArea} from "./components/AddBookArea.tsx";
import {ListBookArea} from "./components/ListBookArea.tsx";
import {TitleFilterArea} from "./components/TitleFilterArea.tsx";
import {useState} from "react";

function App() {

  const [titleFilter, setTitleFilter] = useState("")

  const {
    data: books,
    mutate: mutateBooks,
  } = useSWR(["listBooks", titleFilter], ([_url, titleFilter]) => bookRepository.list(titleFilter))

  const addBook = async (title: string, author: string) => {
    await bookRepository.add(title, author)
    await mutateBooks()
  }

  const deleteBook = async (bookId: string) => {
    await bookRepository.delete(bookId)
    await mutateBooks()
  }

  return (
    <div className="m-2 flex flex-col gap-8">
      <h1 className="text-2xl">Books</h1>

      <div>
        <AddBookArea addBook={addBook}/>
      </div>

      <hr />

      <div className="flex flex-col gap-2">
        <TitleFilterArea titleFilter={titleFilter} setTitleFilter={setTitleFilter}/>
        <div>
          {
            !books && <div>Loading...</div>
          }
          {
            books && <ListBookArea books={books} deleteBook={deleteBook}/>
          }
        </div>
      </div>
    </div>
  )
}

export default App
