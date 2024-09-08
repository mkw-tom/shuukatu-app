'use client'
import { AddCircle, ArrowDropDown, ArrowRight } from '@mui/icons-material'
import { useState } from 'react'
import Task from './Task'

const selectPostTasks = [
  { task: 'グループ面接' },
  { task: 'グループ面接' },
  { task: 'グループ面接' },
]

const TaskFLow = () => {
  const [open, setOpen] = useState<boolean>(false)

  const toggle = () => {
    setOpen(!open)
  }

  return (
    <div className="mt-5 flex w-full flex-col">
      <button
        className="flex h-auto w-full border-y-2 py-2 dark:border-gray-400 dark:text-gray-400"
        onClick={toggle}
      >
        {open ? <ArrowDropDown /> : <ArrowRight />}
        選考フロー
      </button>

      <ul className="h-auto max-h-96 overflow-y-auto" style={{ display: open ? 'block' : 'none' }}>
        {selectPostTasks?.map((task, index) => <Task key={index} task={task} />)}
      </ul>

      <div
        className=" flex h-12 flex-col gap-1 border-b-2 p-1 hover:bg-green-100 md:ml-1"
        style={{ display: open ? 'block' : 'none' }}
      >
        <button className="flex size-full items-center justify-center  gap-2 border-2 border-dashed  font-bold ">
          タスクの追加
          <AddCircle />
        </button>
      </div>
    </div>
  )
}

export default TaskFLow
