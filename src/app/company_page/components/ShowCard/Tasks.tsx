import { ArrowRight, Group } from '@mui/icons-material'

const Tasks = () => {
  return (
    <div className="mt-5 flex items-center">
      <div className="flex w-5/12 flex-col items-center gap-2">
        <p className="text-red-600">current</p>
        <p className="mt-1 size-5 animate-pulse rounded-full bg-primary"></p>
        <p className="flex items-center gap-1 font-bold dark:text-gray-200">
          <Group />
          グループ面接
        </p>
      </div>
      <ArrowRight className="flex-1" />
      <div className="flex w-5/12 flex-col items-center gap-2">
        <p className="text-blue-600">next</p>
        <p className="mt-1 size-5 rounded-full bg-gray-400"></p>
        <p className="flex items-center gap-1 font-bold dark:text-gray-200">
          <Group />
          グループ面接
        </p>
      </div>
    </div>
  )
}

export default Tasks
