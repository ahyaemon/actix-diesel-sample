import {useState} from "react";

type TitleFilterAreaProps = {
  titleFilter: string
  setTitleFilter: (s: string) => void
}

export function TitleFilterArea({ setTitleFilter }: TitleFilterAreaProps) {

  const [tmpTitleFilter, setTmpTitleFilter] = useState("")

  return (
    <div className="flex flex-row gap-2">
      <input
        className="border border-solid border-slate-600 rounded"
        type="text"
        value={tmpTitleFilter}
        onChange={(e) => {
          setTmpTitleFilter(e.target.value)
        }}
        placeholder="Filter Title"
      />

      <button
        type="button"
        className="px-2 py-0.5 rounded bg-slate-500 hover:bg-slate-600 text-white bold"
        onClick={() => { setTitleFilter(tmpTitleFilter) }}
      >FILTER
      </button>
    </div>
  )
}
