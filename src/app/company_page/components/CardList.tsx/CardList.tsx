'use client'
import { usePost } from '@/app/company_page/context/usePost'
import { Group } from '@mui/icons-material'
import { useEffect } from 'react'
import AddFormButton from './AddFormButton'
import BottomDrawer from './BottomDrawer'
import Filter from './Filter'
import SearchArea from './SearchArea'
import SideDrawer from './SideDrawer'

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

  return (
    <div className="drawer drawer-end flex w-full flex-col">
      <div className="mb-3 flex items-center justify-between gap-3 md:w-3/5">
        <AddFormButton />
        <SearchArea />
        <Filter />
      </div>
      <table className="table w-full">
        <thead className="">
          <tr className="text-info">
            <th></th>
            <th>企業名</th>
            <td className="hidden md:block ">イベント</td>
            <td>タスク</td>
            <th className="hidden md:block"></th>
          </tr>
        </thead>
        <tbody className="overflow-y-scroll">
          {postsState && postsState.length > 0 ? (
            postsState.map((post, index) => (
              <tr
                key={index}
                className={`${selectPost?.customId === post.customId ? 'bg-sky-100 dark:bg-sky-950' : ''} cursor-pointer hover:bg-sky-100 dark:hover:bg-sky-950`}
                onClick={() => handleSelect(post)}
              >
                <th className="">
                  <p className="mx-auto size-5 animate-pulse rounded-full bg-info"></p>
                </th>
                <th className="w-36">
                  <div className="font-bold">{post.name}</div>
                  <div className="badge badge-ghost badge-sm block opacity-80 md:badge-md md:hidden">
                    {post.event}
                  </div>
                </th>
                <td className="hidden md:block">
                  <div className="badge badge-ghost badge-md opacity-80">{post.event}</div>
                </td>
                <td className="md:text-md text-xs">
                  <p>
                    <Group style={{ fontSize: '20px' }} className="mr-1" />
                    {currentTaskJudge(post)}
                  </p>
                  {TaskLimitDate(post) ? (
                    <div className="badge badge-error badge-sm mt-1 opacity-80">
                      {TaskLimitDate(post)}まで
                    </div>
                  ) : null}
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
              <th className="w-16 sm:w-24"></th>
              <td className="w-36">データがありません💦</td>
              <td className="hidden md:block"></td>
              <td className="md:text-md text-xs"></td>
              <th className="hidden md:block"></th>
            </tr>
          )}
        </tbody>
      </table>
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      <BottomDrawer selectPost={selectPost} />
      <SideDrawer selectPost={selectPost} />
    </div>
  )
}

export default CardList
