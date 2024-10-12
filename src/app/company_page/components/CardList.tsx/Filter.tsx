// 'use client'
import { useRouter } from 'next/navigation'
import { usePost } from '../../context/usePost'
import { useUser } from '../../context/useUser'

const Filter = () => {
  const { postsState, postsDispatch, setSelectPost, allPosts } = usePost()
  const router = useRouter()
  const { user } = useUser()
  // const completedNum = allPosts.filter((post) => post.completed === true).length
  // const failedNum = allPosts.filter((post) => post.failed === true).length
  // const allNum = allPosts.length
  const url = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_DEV_API_URL
  // const { getAllFunc, getCompletedFunc, getFailedFunc} = useFIlter()

  const getCompletedPosts = async () => {
    // const completedDatas = await PostModel.find({ userId: user?.customId, completed: true })
    // postsDispatch({ type: 'INITIALIZE', posts: completedDatas })
    // const completedData = await getCompletedFunc(user?.customId as string)
    const res = await fetch(`${url}/api/posts/filter?userId=${user?.customId}&type=completed`)
    const completedData = await res.json()
    // postsDispatch({ type: 'ONLY_COMPLETED' })
    postsDispatch({ type: 'INITIALIZE', posts: completedData })

    setSelectPost(postsState[0])
  }

  const getFailedPosts = async () => {
    //  const failedData = await getFailedFunc(user?.customId as string)
    // postsDispatch({ type: 'INITIALIZE', posts: allPosts })
    const res = await fetch(`${url}/api/posts/filter?userId=${user?.customId}&type=failed`)
    const failedData = await res.json()
    postsDispatch({ type: 'INITIALIZE', posts: failedData })

    // postsDispatch({ type: 'ONLY_FAILED' })
    setSelectPost(postsState[0])
  }

  const getAllPosts = async () => {
    // const alldata = await getFailedFunc(user?.customId as string)
    const res = await fetch(`${url}/api/posts/filter?userId=${user?.customId}&type=all`)
    const allData = await res.json()
    postsDispatch({ type: 'INITIALIZE', posts: allData })
  }

  const progressPosts = async () => {
    // const alldata = await getFailedFunc(user?.customId as string)
    const res = await fetch(`${url}/api/posts/filter?userId=${user?.customId}&type=progress`)
    const progressData = await res.json()
    postsDispatch({ type: 'INITIALIZE', posts: progressData })
  }

  const handleFilter = (type: string) => {
    switch (type) {
      case 'all':
        return getAllPosts()
      case 'progress':
        return progressPosts()
      case 'completed':
        return getCompletedPosts()
      case 'failed':
        return getFailedPosts()
      default:
        return
    }
  }

  return (
    // <div className="group btn btn-square btn-sm relative z-20 dark:border-gray-500 dark:bg-gray-500">
    //   <FilterAlt />
    //   <div className="absolute -top-1 right-1 z-30 hidden w-[200px] items-center rounded-xl bg-gray-200 shadow-md group-hover:flex group-hover:flex-col dark:border-gray-500 dark:bg-gray-500 ">
    //     <button
    //       className="pointer-events-auto flex w-full items-center justify-center gap-2 rounded-t-xl py-2 text-info duration-200 hover:bg-info hover:text-gray-200 dark:text-gray-200"
    //       onClick={getAllPosts}
    //     >
    //       {/* <span className="size-6 rounded-full bg-info pt-1 text-gray-200">{allPosts.length}</span> */}
    //       <span>全ての企業</span>
    //     </button>
    //     <button
    //       className="text-orange pointer-events-auto flex w-full items-center justify-center gap-2 py-2 duration-200 hover:bg-orange-500 hover:text-gray-200 dark:text-gray-200"
    //       onClick={getCompletedPosts}
    //     >
    //       {/* <span className="size-6 rounded-full bg-orange-500 pt-1 text-gray-200">
    //         {completedNum}
    //       </span> */}
    //       <span>内定・参加確定</span>
    //     </button>
    //     <button
    //       className="text-orange pointer-events-auto flex w-full items-center justify-center gap-2 rounded-b-xl py-2 duration-200 hover:bg-error hover:text-gray-200 dark:text-gray-200"
    //       onClick={getFailedPosts}
    //     >
    //       {/* <span className="size-6 rounded-full bg-error pt-1 text-gray-200">{failedNum}</span> */}
    //       <span>内定・参加確定</span>
    //     </button>
    //   </div>
    // </div>
    <select
      className="select select-info select-sm w-20 max-w-xs text-xs sm:select-md dark:bg-gray-500 sm:w-28"
      onChange={(e) => handleFilter(e.target.value)}
    >
      <option disabled value="select">
        filter
      </option>
      <option value="all">全て</option>
      <option value="progress">進行中</option>
      <option value="completed">合格</option>
      <option value="failed">不合格</option>
    </select>
  )
}

export default Filter
