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
    <div className="relative h-full">
      {postsState[0] ? (
        <div className="h-auto w-full shadow-md dark:border-gray-500 dark:bg-gray-800 sm:h-screen  lg:border-2 ">
          <div className="p-5">
            <CardHeader />
            <Region />
            <Mypage />
            <TaskFlow />
            <TaskButtons />
          </div>
        </div>
      ) : (
        <div className="itemx-center flex h-[670px] w-auto justify-center rounded-2xl">
          <p className="mx-auto mt-28 text-lg">データがありません💦</p>
        </div>
      )}
    </div>
  )
}

export default ShowCard
