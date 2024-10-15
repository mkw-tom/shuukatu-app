// 'use client'
import { useRouter } from 'next/navigation'
import { usePost } from '../../../state/context/usePost'
import { useUser } from '../../../state/context/useUser'

const Filter = () => {
  const { postsState, postsDispatch, setSelectPost, allPosts } = usePost()
  const router = useRouter()
  const { user } = useUser()

  const url = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_DEV_API_URL

  const getCompletedPosts = async () => {
    const res = await fetch(`${url}/api/posts/filter?userId=${user?.customId}&type=completed`)
    const completedData = await res.json()
    postsDispatch({ type: 'INITIALIZE', posts: completedData })

    setSelectPost(postsState[0])
  }

  const getFailedPosts = async () => {
    const res = await fetch(`${url}/api/posts/filter?userId=${user?.customId}&type=failed`)
    const failedData = await res.json()
    postsDispatch({ type: 'INITIALIZE', posts: failedData })
    setSelectPost(postsState[0])
  }

  const getAllPosts = async () => {
    const res = await fetch(`${url}/api/posts/filter?userId=${user?.customId}&type=all`)
    const allData = await res.json()
    postsDispatch({ type: 'INITIALIZE', posts: allData })
    return allData
  }

  const progressPosts = async () => {
    // const alldata = await getFailedFunc(user?.customId as string)
    const res = await fetch(`${url}/api/posts/filter?userId=${user?.customId}&type=progress`)
    const progressData = await res.json()
    postsDispatch({ type: 'INITIALIZE', posts: progressData })
  }

  const eventDateSort = async (sortType: string) => {
    const allData = (await getAllPosts()) as PostType[]
    if (sortType === 'asc') {
      const sortData = allData.sort(
        (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
      )
      postsDispatch({ type: 'INITIALIZE', posts: sortData })
    } else {
      const sortData = allData.sort(
        (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
      )
      postsDispatch({ type: 'INITIALIZE', posts: sortData })
    }
  }
  const taskDateSort = async (sortType: string) => {
    const allData = (await getAllPosts()) as PostType[]
    const getDate = (post: PostType) => {
      const current = post.taskFlow.find((task) => task?.current)
      return new Date(current?.date as string).getTime()
    }
    const getLimitDate = (post: PostType) => {
      const current = post.taskFlow.find((task) => task?.current)
      return new Date(current?.limitDate as string).getTime()
    }

    if (sortType === 'taskAsc') {
      const sortData = allData.sort((a, b) => getDate(b) - getDate(a))
      postsDispatch({ type: 'INITIALIZE', posts: sortData })
    } else if (sortType === 'taskdesc') {
      const sortData = allData.sort((a, b) => getDate(a) - getDate(b))
      postsDispatch({ type: 'INITIALIZE', posts: sortData })
    } else {
      const sortData = allData.sort((a, b) => getLimitDate(a) - getLimitDate(b))
      postsDispatch({ type: 'INITIALIZE', posts: sortData })
    }
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
      case 'asc':
        return eventDateSort(type)
      case 'desc':
        return eventDateSort(type)
      case 'taskAsc':
        return taskDateSort(type)
      case 'taskdesc':
        return taskDateSort(type)
      case 'limit':
        return taskDateSort(type)

      default:
        return
    }
  }

  return (
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
      <option value="asc">降順（イベント）</option>
      <option value="desc">昇順（イベント）</option>
      <option value="taskAsc">降順（タスク）</option>
      <option value="taskdesc">昇順（タスク）</option>
      <option value="limit">期限が近い順（タスク）</option>
    </select>
  )
}

export default Filter
