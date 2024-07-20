import {useState} from "react";

type AddBookAreaProps = {
  addBook: (title: string, author: string) => Promise<void>
}

export function AddBookArea({ addBook }: AddBookAreaProps) {

  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")

  return (
    <div className="flex flex-row items-center gap-4">
      <div className="flex flex-row gap-2">
        Title:
        <input
          className="border border-solid border-slate-600 rounded"
          type="text"
          value={title}
          onChange={(e) => { setTitle(e.target.value) }}
        />
      </div>

      <div className="flex flex-row gap-2">
        Author:
        <input
          className="border border-solid border-slate-600 rounded"
          type="text"
          value={author}
          onChange={(e) => { setAuthor(e.target.value) }}
        />
      </div>

      <div>
        <button
          type="button"
          className="px-2 py-0.5 rounded bg-green-700 hover:bg-green-800 text-white bold"
          onClick={() => {
            addBook(title, author).catch(e => console.error(e))
          }}
        >ADD
        </button>
      </div>
    </div>
  )
}
