'use client'
import { usePost } from '@/app/company_page/context/usePost'
import { useEffect } from 'react'
import useTaskJudger from '../../hooks/useTaskJudger'
import AddFormButton from './AddFormButton'
import BottomDrawer from './BottomDrawer'
import Filter from './Filter'
import SearchArea from './SearchArea'
import SideDrawer from './SideDrawer'

const CardList = ({ postsData }: { postsData: PostType[] }) => {
  const { posts, setPosts, selectPost, setSelectPost, setSelectTask, postsState, postsDispatch } =
    usePost()

  const { taskIconJudger, taksStatusJudger } = useTaskJudger()

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

  const currentTaskJudge = (post: PostType) => {
    if (!post?.taskFlow) return 'なし'
    const current = post?.taskFlow.filter((task) => task.finished === false)[0]
    const prev = post?.taskFlow.filter((task) => task.finished === true).slice(-1)[0]

    if (!current && !post?.completed) {
      return prev?.task
    } else if (!current) {
      return '内定・参加確定'
    } else if (current?.current) {
      return current?.task
    } else if (!current.current && prev) {
      return prev?.task
    } else {
      return 'なし'
    }
  }
  const TaskLimitDate = (post: PostType) => {
    const current = post?.taskFlow.filter((task) => task.finished === false)[0]
    if (!current || !current.limitDate) {
      return null
    }
    return new Date(current.limitDate).toLocaleDateString()
  }

  const TaskDate = (post: PostType) => {
    const current = post?.taskFlow.filter((task) => task.finished === false)[0]
    if (!current || !current.date) {
      return null
    }
    return new Date(current.date).toLocaleDateString()
  }

  const TaskTestFormat = (post: PostType) => {
    const current = post?.taskFlow.filter((task) => task.finished === false)[0]
    if (!current || !current.testFormat) {
      return null
    }
    return current.testFormat
  }

  return (
    <div className="drawer drawer-end flex size-full flex-col">
      <div className="mb-3 flex w-full items-center justify-between gap-3 md:w-3/5">
        <AddFormButton />
        <SearchArea />
        <Filter />
      </div>
      <div className="max-h-[500px] w-full overflow-y-scroll">
        <table className="table table-pin-rows">
          <thead className="w-full">
            <tr className="z-10 bg-sky-200 text-info shadow-lg dark:bg-sky-950">
              <th className="text-center">status</th>
              <th>企業名</th>
              <td className="hidden md:block ">イベント</td>
              <td>タスク</td>
              <th className="hidden md:block"></th>
            </tr>
          </thead>
          <tbody>
            {postsState && postsState.length > 0 ? (
              postsState.map((post, index) => (
                <tr
                  key={index}
                  className={`${selectPost?.customId === post.customId ? 'bg-sky-100 dark:bg-sky-800' : ''} cursor-pointer hover:bg-sky-100 dark:hover:bg-sky-800`}
                  onClick={() => handleSelect(post)}
                >
                  <th className="">{taksStatusJudger(post, currentTaskJudge(post))}</th>
                  <th className="w-36 min-w-36">
                    <div className="font-bold">{post.name}</div>
                    <div className="badge badge-ghost badge-sm block opacity-80 md:badge-md md:hidden">
                      {post.event}
                    </div>
                  </th>
                  <th className="hidden w-40 md:block">
                    <div className="badge badge-ghost badge-md opacity-80">{post.event}</div>
                  </th>
                  <td className="min-w-[150px] ">
                    <p className={`${post.completed ? 'text-orange-500' : ''} text-xs sm:text-sm`}>
                      {taskIconJudger(currentTaskJudge(post))}
                      {currentTaskJudge(post)}
                    </p>
                    <div className="flex flex-wrap sm:gap-2">
                      {TaskDate(post) ? (
                        <div className="badge badge-info badge-sm mt-1 opacity-80 sm:badge-md ">
                          {TaskDate(post)} 開始
                        </div>
                      ) : null}
                      {TaskLimitDate(post) ? (
                        <div className="badge badge-error badge-sm mt-1  opacity-80 sm:badge-md ">
                          {TaskLimitDate(post)} まで
                        </div>
                      ) : null}
                      {TaskTestFormat(post) ? (
                        <div className="badge badge-warning badge-sm mt-1  opacity-80 sm:badge-md ">
                          {TaskTestFormat(post)}
                        </div>
                      ) : null}
                    </div>
                  </td>
                  <th className="hidden sm:block">
                    <label
                      htmlFor="my-drawer-4"
                      className="btn btn-outline btn-info drawer-button btn-xs"
                    >
                      open
                    </label>
                  </th>
                </tr>
              ))
            ) : (
              // データがない場合の行
              <tr className="mt-36 text-center text-lg">
                <th className="w-5 sm:w-24"></th>
                <td className="w-36 text-xs">データがありません</td>
                <td className="hidden md:block"></td>
                <td className="md:text-md text-xs"></td>
                <th className="hidden md:block"></th>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      <BottomDrawer selectPost={selectPost} />
      <SideDrawer selectPost={selectPost} />
    </div>
  )
}

export default CardList
