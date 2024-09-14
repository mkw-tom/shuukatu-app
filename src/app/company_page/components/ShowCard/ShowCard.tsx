import CardHeader from './CardHeader'
import Mypage from './MyPage'
import Region from './Region'
import TaskButtons from './TaskButtons'
import TaskFlow from './TaskFlow'

const ShowCard = () => {
  return (
    <div className="card h-auto w-full shadow-md dark:border-gray-500 dark:bg-gray-800 lg:border-2">
      <div className="p-5">
        <CardHeader />
        <Region />
        <Mypage />
        <TaskFlow />
        <TaskButtons />
      </div>
    </div>
  )
}

export default ShowCard
