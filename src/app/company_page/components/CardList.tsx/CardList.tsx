'use client'
import { usePost } from '@/app/company_page/context/usePost'
import { useEffect } from 'react'
import AddFormButton from './AddFormButton'
import BottomDrawer from './BottomDrawer'
import Filter from './Filter'
import SearchArea from './SearchArea'

const CardList = ({ postsData }: { postsData: PostType[] }) => {
  const { posts, setPosts, selectPost, setSelectPost, setSelectTask, postsState, postsDispatch } =
    usePost()

  useEffect(() => {
    if (postsData) {
      setPosts(postsData)
      setSelectPost(postsData[0]) // postsData[0]が存在することを確認
      postsDispatch({ type: 'INITIALIZE', posts: postsData })
    }
  }, [postsData, postsDispatch, setPosts, setSelectPost])

  const handleSelect = (post: PostType) => {
    if (post) {
      setSelectPost(post)
    }
  }

  const currentTaskJudge = (taskFlow: TaskType[]) => {
    if (!taskFlow) return 'なし'
    const current = taskFlow.filter((task) => task.finished === false)[0]
    const prev = taskFlow.filter((task) => task.finished === true).slice(-1)[0]

    if (!current && !selectPost?.completed) {
      return prev.task
    } else if (!current) {
      return '内定・参加確定'
    } else if (current?.current) {
      return current.task
    } else if (!current.current && prev) {
      return prev.task
    } else {
      return 'なし'
    }
  }

  return (
    <div className="flex w-full flex-col lg:w-5/12">
      <div className="mb-3 flex items-center justify-between gap-3">
        <AddFormButton />
        <SearchArea />
        <Filter />
      </div>
      <ul className="flex h-[580px] flex-col gap-5 overflow-y-scroll">
        {postsState?.map((post, index) => (
          <button key={index} className="w-full" onClick={() => handleSelect(post)}>
            <div
              className={`card card-side relative flex items-center justify-between border-2 border-l-8 p-4 shadow-md hover:border-info  dark:border-gray-500 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-info ${selectPost?.customId === post.customId ? 'border-info dark:border-info' : ''}`}
            >
              <div className="flex flex-col gap-1">
                {/* <input type="radio" className="w-3 h-3" /> */}
                <h1 className="pl-4 text-start text-xl tracking-wider ">{post.name}</h1>
                <p className="ml-6 mt-1 text-gray-400">{post.event}</p>
              </div>

              <div className="ml-auto flex items-center">
                {/* { ここにアイコンを埋め込む関数を作る } */}
                <span className="font-bold">{currentTaskJudge(post?.taskFlow)}</span>
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
