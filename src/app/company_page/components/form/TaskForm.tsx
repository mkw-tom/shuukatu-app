import { usePostReducer } from '@/app/company_page/context/useFormInputReducer'
import { usePost } from '@/app/company_page/context/usePost'
import { AddCircle } from '@mui/icons-material'
import { useRouter } from 'next/navigation'
import type { ChangeEvent } from 'react'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import useAddEdutTask from '../../hooks/formHooks/useAddEdutTask'

const TaskForm = ({
  setOpen,
  title,
  // setFormSlide,
  onlyTaskForm,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  title: string
  // setFormSlide: Dispatch<SetStateAction<string>>
  onlyTaskForm: boolean
}) => {
  const { state, dispatch, formSlide, setFormSlide } = usePostReducer()
  const { setPosts, posts, selectPost, setSelectPost, selectTask, postsDispatch } = usePost()
  const [date, setDate] = useState<string>('')
  const [limitDate, setLimitDate] = useState<string>('')
  const router = useRouter()
  const { handleAddEditTask, handleCancel } = useAddEdutTask(
    title,
    setOpen,
    onlyTaskForm,
    date,
    limitDate,
  )

  const handleStateChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const customId = title == '編集' ? (selectPost?.customId as string) : uuidv4()
    const { name, value } = e.target
    dispatch({ type: 'SET_TASK', payload: { customId, name, value, date, limitDate } })
    console.log(state)
  }

  useEffect(() => {
    if (title === '編集') {
      setDate(state.taskFlow.date)
      setLimitDate(state.taskFlow.limitDate)
    }
  }, [state.taskFlow.date, state.taskFlow.limitDate, title])

  return (
    <div className="card mx-auto h-auto w-[500px] bg-white dark:bg-gray-700">
      <h2 className="mx-auto mb-10 flex w-full items-center justify-center gap-1 rounded-t-lg border-b-2 border-info py-2 text-xl  text-info dark:bg-info dark:text-gray-900 ">
        <AddCircle />
        <span>タスクの{title}</span>
      </h2>
      <form className="flex w-full flex-col items-start gap-8 px-5">
        <label htmlFor="task">
          <span className="inline-block w-[100px] text-center text-info">タスク</span>
          <select
            id="task"
            name="task"
            className="select select-bordered w-[250px] bg-gray-200 text-gray-700 dark:bg-gray-400"
            value={state.taskFlow.task}
            onChange={(e) => handleStateChange(e)}
          >
            <option>説明会</option>
            <option>ES・履歴書提出</option>
            <option>適性検査</option>
            <option>コーディングテスト</option>
            <option>カジュアル面談</option>
            <option>グループ面接</option>
            <option>グループディスカッション</option>
            <option>一次面接</option>
            <option>二次面接</option>
            <option>三次面接</option>
            <option>最終面接</option>
          </select>
        </label>

        <label htmlFor="date">
          <span className="inline-block w-[100px] text-center text-info">実践日時</span>
          <input
            name="date"
            id="date"
            type="datetime-local"
            className="input  input-bordered w-[250px]   bg-gray-200 text-gray-700 dark:bg-gray-400"
            value={date || state.taskFlow.date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>

        <label htmlFor="limitDate">
          <span className="inline-block w-[100px] text-center text-info">期限</span>
          <input
            name="limitDate"
            id="limitDate"
            type="datetime-local"
            className="input input-bordered w-[250px]  bg-gray-200 text-gray-700 dark:bg-gray-400"
            value={limitDate || state.taskFlow.limitDate}
            onChange={(e) => setLimitDate(e.target.value)}
          />
        </label>

        <label htmlFor="testFormat">
          <span className="inline-block w-[100px] text-center text-info">テスト形式</span>
          <input
            id="testFormat"
            name="testFormat"
            type="text"
            placeholder="例：SPI3"
            className="input input-bordered w-[300px] bg-gray-200 text-gray-700 dark:bg-gray-400 "
            value={state.taskFlow.testFormat}
            onChange={(e) => handleStateChange(e)}
          />
        </label>
        <div className="mx-auto my-5 flex gap-3">
          <button
            className="btn w-40 bg-gray-400 text-gray-200 dark:btn-outline hover:border-gray-400 hover:bg-gray-400 dark:text-gray-400 dark:hover:bg-gray-400"
            type="button"
            onClick={() => handleCancel()}
          >
            <span>スキップ</span>
          </button>
          <button
            className="btn w-40 bg-info text-gray-200 dark:btn-outline hover:border-info hover:bg-info dark:text-info dark:hover:bg-info"
            type="button"
            onClick={handleAddEditTask}
          >
            <span>{title}</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default TaskForm
