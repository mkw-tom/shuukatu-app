// 'use client'
import { FilterAlt } from '@mui/icons-material'
import { useRouter } from 'next/navigation'
import { usePost } from '../../context/usePost'

const Filter = () => {
  const { postsState, postsDispatch, setSelectPost, allPosts } = usePost()
  const router = useRouter()
  const completedNum = allPosts.filter((post) => post.completed === true).length
  const failedNum = allPosts.filter((post) => post.failed === true).length
  const allNum = allPosts.length

  const getCompletedPosts = () => {
    postsDispatch({ type: 'INITIALIZE', posts: allPosts })

    postsDispatch({ type: 'ONLY_COMPLETED' })
    setSelectPost(postsState[0])
  }

  const getFailedPosts = () => {
    postsDispatch({ type: 'INITIALIZE', posts: allPosts })

    postsDispatch({ type: 'ONLY_FAILED' })
    setSelectPost(postsState[0])
  }

  const getAllPosts = () => {
    postsDispatch({ type: 'INITIALIZE', posts: allPosts })
    router.refresh()
  }

  return (
    <div className="group btn btn-square btn-sm relative z-50 dark:border-gray-500 dark:bg-gray-500">
      <FilterAlt />
      <div className="absolute -top-1 right-1 z-50 hidden w-[200px] items-center rounded-xl bg-gray-200 shadow-md group-hover:flex group-hover:flex-col dark:border-gray-500 dark:bg-gray-500 ">
        <button
          className="pointer-events-auto flex w-full items-center justify-center gap-2 rounded-t-xl py-2 text-info duration-200 hover:bg-info hover:text-gray-200 dark:text-gray-200"
          onClick={getAllPosts}
        >
          <span className="size-6 rounded-full bg-info pt-1 text-gray-200">{allPosts.length}</span>
          <span>全ての企業</span>
        </button>
        <button
          className="text-orange pointer-events-auto flex w-full items-center justify-center gap-2 py-2 duration-200 hover:bg-orange-500 hover:text-gray-200 dark:text-gray-200"
          onClick={getCompletedPosts}
        >
          <span className="size-6 rounded-full bg-orange-500 pt-1 text-gray-200">
            {completedNum}
          </span>
          <span>内定・参加確定</span>
        </button>
        <button
          className="text-orange pointer-events-auto flex w-full items-center justify-center gap-2 rounded-b-xl py-2 duration-200 hover:bg-error hover:text-gray-200 dark:text-gray-200"
          onClick={getFailedPosts}
        >
          <span className="size-6 rounded-full bg-error pt-1 text-gray-200">{failedNum}</span>
          <span>内定・参加確定</span>
        </button>
      </div>
    </div>
  )
}

export default Filter
