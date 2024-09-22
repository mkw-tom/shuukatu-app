'use client'
import { usePost } from '../../context/usePost'
import CardHeader from './CardHeader'
import Mypage from './MyPage'
import Region from './Region'
import TaskButtons from './TaskButtons'
import TaskFlow from './TaskFlow'

const ShowCard = () => {
  const { postsState } = usePost()
  return (
    <>
      {postsState[0] ? (
        <div className="card h-auto w-full shadow-md dark:border-gray-500 dark:bg-gray-800 lg:border-2">
          <div className="p-5">
            <CardHeader />
            <Region />
            <Mypage />
            <TaskFlow />
            <TaskButtons />
          </div>
        </div>
      ) : (
        <div className="h-[670px] w-auto animate-pulse rounded-2xl bg-gray-100">
          <div className="mx-auto flex flex-col gap-1 p-5">
            <div className="h-7 w-2/3 animate-pulse rounded-full bg-gray-200"></div>
            <div className="ml-3 h-5 w-1/2 animate-pulse rounded-full bg-gray-200"></div>
            <div className="ml-3 h-5 w-1/2 animate-pulse rounded-full bg-gray-200"></div>
            <div className="mt-2 h-16 w-full animate-pulse bg-gray-200"></div>
            <div className="mt-1 h-16 w-full animate-pulse bg-gray-200"></div>
            <div className="mt-3 h-64 w-full animate-pulse rounded-md bg-gray-200"></div>
            <div className="mt-1 h-16 w-full animate-pulse rounded-md bg-gray-200"></div>
            <div className="mt-2 flex items-center gap-2">
              <div className="mt-1 h-[50px] w-1/4 animate-pulse rounded-md bg-gray-200"></div>
              <div className="mt-1 h-[50px] w-3/4 animate-pulse rounded-md bg-gray-200"></div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ShowCard
