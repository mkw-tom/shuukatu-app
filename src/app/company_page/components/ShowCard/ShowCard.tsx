import CardHeader from './CardHeader'
import Mypage from './MyPage'
import Region from './Region'
import TaskButtons from './TaskButtons'
import TaskFlow from './TaskFlow'
import Tasks from './Tasks'

const ShowCard = () => {
  return (
    <div className="card h-auto w-5/12 border-2 shadow-md dark:border-gray-500 dark:bg-gray-900">
      <div className="p-5">
        <CardHeader />
        <Region />
        <Mypage />
        <Tasks />
        <TaskFlow />
        <TaskButtons />
      </div>
    </div>
  )
}

export default ShowCard
