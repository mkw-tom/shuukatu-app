'use client'
import { usePost } from '@/app/state/context/usePost'
import useConvertDateTime from '../../hooks/useConvertDateTime'
import useTaskJudger from '../../hooks/useTaskJudger'
import AddFormButton from './AddFormButton'
import BottomDrawer from './BottomDrawer'
import Filter from './Filter'
import SearchArea from './SearchArea'
import SideDrawer from './SideDrawer'

const CardList = () => {
  const { posts, setPosts, selectPost, setSelectPost, setSelectTask, postsState, postsDispatch } =
    usePost()

  const { taskIconJudger, taksStatusJudger, currentTaskName, currentTaskId } = useTaskJudger()
  const { MonthDay, MonthDayTime } = useConvertDateTime()
  // useEffect(() => {
  //   if (postsData) {
  //     setPosts(postsData)
  //     setSelectPost(postsData[0]) // postsData[0]が存在することを確認
  //     postsDispatch({ type: 'INITIALIZE', posts: postsData })
  //   }
  // }, [postsData, postsDispatch, setPosts, setSelectPost])

  const handleSelect = (post: PostType) => {
    if (post) {
      setSelectPost(post)
    }
  }

  const TaskLimitDate = (post: PostType) => {
    const current = post?.taskFlow.filter((task) => task.finished === false)[0]
    if (!current || !current.limitDate) {
      return null
    }
    return MonthDayTime(current.limitDate)
  }

  const TaskDate = (post: PostType) => {
    const current = post?.taskFlow.filter((task) => task.finished === false)[0]
    if (!current || !current.date) {
      return null
    }
    return MonthDayTime(current.date)
  }

  const TaskTestFormat = (post: PostType) => {
    const current = post?.taskFlow.filter((task) => task.finished === false)[0]
    if (!current || !current.testFormat) {
      return null
    }
    return current.testFormat
  }

  return (
    <div className="drawer drawer-end flex size-full flex-col ">
      <div className="mb-3 flex w-full items-center justify-between gap-3 md:w-4/5">
        <AddFormButton />
        <SearchArea />
        <Filter />
      </div>
      <div className="max-h-[600px] w-full overflow-y-scroll pb-96  shadow-inner md:max-h-[650px]">
        <table className="table table-pin-rows">
          <thead className="w-full">
            <tr className="z-10 bg-sky-200 bg-opacity-80 text-info shadow-lg dark:bg-sky-900 dark:bg-opacity-80">
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
                  className={`${selectPost?.customId === post.customId ? 'bg-sky-100 dark:bg-sky-800' : ''} cursor-pointer border-b-2 border-b-gray-100 hover:bg-sky-100 dark:hover:bg-sky-800`}
                  onClick={() => handleSelect(post)}
                >
                  <th className="">{taksStatusJudger(post, currentTaskId(post))}</th>
                  <th className="w-36 min-w-36">
                    <div className="font-bold">{post.name}</div>
                    <div className="badge badge-sm mt-1 block bg-gray-300 font-normal text-gray-900 opacity-80 md:badge-md md:hidden">
                      {post.event}
                    </div>
                    <div className="badge badge-outline badge-sm mt-1  block font-normal text-gray-900 opacity-80 md:badge-md dark:text-base-300 md:hidden">
                      {MonthDay(post.startDate, post.endDate)}
                    </div>
                  </th>
                  <th className="hidden w-40 md:block">
                    <div className="badge badge-md mt-3 bg-gray-300 font-normal text-gray-900 opacity-80">
                      {post.event}
                    </div>
                    <div className="badge badge-outline badge-sm mt-1  block font-normal text-gray-900 opacity-80 md:badge-sm dark:text-base-300">
                      {MonthDay(post.startDate, post.endDate)}
                    </div>
                  </th>
                  <td className="min-w-[150px] ">
                    <p
                      className={`${post.failed ? 'text-error' : ''}  ${post.completed ? 'text-orange-500' : ''} text-xs sm:text-sm`}
                    >
                      {taskIconJudger(currentTaskName(post))}
                      {currentTaskName(post)}
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
