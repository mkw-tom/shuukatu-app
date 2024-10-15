'use client'
import { usePost } from '../../../state/context/usePost'
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
        <div className="h-screen w-full shadow-md dark:border-gray-500 dark:bg-gray-700 sm:h-screen  lg:border-2 ">
          <div className="bg-base-200 px-5 pb-5  dark:bg-gray-700">
            <CardHeader />
            <Region />
            <Mypage />
            <TaskFlow />
            <TaskButtons />
          </div>
        </div>
      ) : (
        <div className="itemx-center flex h-screen w-auto justify-center rounded-2xl">
          <p className="mx-auto mt-28 text-lg">データがありません💦</p>
        </div>
      )}
    </div>
  )
}

export default ShowCard
