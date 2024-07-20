import {Book} from "./type.ts";

export const bookRepository = {
  list: async (titleFilter: string): Promise<Book[]> => {
    const params = {title_filter : titleFilter};
    const query = new URLSearchParams(params);

    return fetch(`http://localhost:18081/books/list?${query}`)
      .then(r => r.json())
      .then(j => j.books)
  },

  add: async (title: string, author: string): Promise<Book> => {
    const data = { title, author }
    return fetch("http://localhost:18081/books/add_book", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(r => r.json())
  },

  delete: async (bookId: string): Promise<string> => {
    const data = { book_id: bookId }
    return fetch("http://localhost:18081/books/delete_book", {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(r => r.text())
  },
}
