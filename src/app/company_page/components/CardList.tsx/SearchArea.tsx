import type { ChangeEvent } from 'react'
import { usePost } from '../../context/usePost'

const SearchArea = () => {
  const { postsState, postsDispatch, allPosts, setSelectPost } = usePost()

  const searchPost = (e: ChangeEvent<HTMLInputElement>) => {
    const searchResult = allPosts.filter((post) =>
      post.name.toLowerCase().includes(e.target.value.toLowerCase()),
    )
    postsDispatch({ type: 'INITIALIZE', posts: searchResult })
    setSelectPost(searchResult[0])
  }

  return (
    <label className="input input-sm input-bordered  input-info flex w-3/5 items-center gap-2 bg-gray-100 sm:input-md dark:bg-gray-500 sm:w-2/3">
      <input
        type="text"
        className="grow "
        placeholder="企業名で検索"
        onChange={(e) => searchPost(e)}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="size-4 opacity-70"
      >
        <path
          fillRule="evenodd"
          d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
          clipRule="evenodd"
        />
      </svg>
    </label>
  )
}

export default SearchArea
