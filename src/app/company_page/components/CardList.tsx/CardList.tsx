'use client'
import { usePost } from '@/app/context/usePost'
import { Verified } from '@mui/icons-material'
import { useEffect } from 'react'
import AddFormButton from './AddFormButton'
import BottomDrawer from './BottomDrawer'
import Filter from './Filter'
import SearchArea from './SearchArea'

const CardList = ({ postsData }: { postsData: PostType[] }) => {
  const { posts, setPosts, selectPost, setSelectPost } = usePost()
  useEffect(() => {
    setPosts(postsData)

    setSelectPost(posts[0])
  }, [posts, postsData, setPosts, setSelectPost])

  const handleSelect = (post: PostType) => {
    setSelectPost(post)
  }

  const currentTask = (taskFlow: TaskStateType[]) => {
    const current = taskFlow.filter((task) => task.finished === false)[0]

    if (!current) {
      return 'なし'
    }

    return current.task
  }

  return (
    <div className="flex w-full flex-col lg:w-5/12">
      <div className="mb-3 flex items-center justify-between gap-3">
        <AddFormButton />
        <SearchArea />
        <Filter />
      </div>
      <ul className="flex h-[580px] flex-col gap-5 overflow-y-scroll">
        {posts.map((post, index) => (
          <button key={index} className="w-full" onClick={() => handleSelect(post)}>
            <div
              className={`card card-side relative flex items-center justify-between border-2 border-l-8 p-4 shadow-md hover:border-info  dark:border-gray-500 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-info ${selectPost === post ? 'border-info dark:border-info' : ''}`}
            >
              <div className="flex flex-col gap-1">
                {/* <input type="radio" className="w-3 h-3" /> */}
                <h1 className="pl-4 text-start text-xl tracking-wider ">{post.name}</h1>
                <p className="ml-6 mt-1 text-gray-400">{post.event}</p>
              </div>

              <div className="ml-auto flex items-center">
                <Verified className="mr-1 size-4 text-orange-500" />
                <span className="font-bold">{currentTask(post?.taskFlow)}</span>
              </div>
            </div>
          </button>
        ))}
      </ul>
      <BottomDrawer selectPost={selectPost} />
    </div>
  )
}

export default CardList
