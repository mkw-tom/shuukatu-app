import { Delete, Edit } from '@mui/icons-material'
const Task = ({ task }: { task: { task: string } }) => {
  return (
    <div className="flex border-b-2">
      <div className="flex flex-1 flex-col gap-1 p-3 md:ml-1">
        <h3 className="flex items-center">
          <p className="ml-1 font-bold">{task.task}</p>
          <span className="ml-5 text-sm">未完了</span>
        </h3>
        <p className="border-l-2 border-gray-500 pl-2">
          テスト形式：
          <span>SPI</span>
        </p>
        <p className="border-l-2 border-gray-500 pl-2">
          実践日時：
          <span>11:00</span>
        </p>
        <p className="border-l-2 border-gray-500 pl-2 ">
          期限：
          <span>11:00</span>
        </p>
      </div>
      <div className="mr-5 flex h-auto w-4/12 items-center gap-2">
        <span className="ml-auto mr-3 text-center text-red-500">current</span>
        <button className="ml-auto size-8 text-blue-800">
          <Edit />
        </button>
        <button className="text-red-800">
          <Delete />
        </button>
      </div>
    </div>
  )
}

export default Task
