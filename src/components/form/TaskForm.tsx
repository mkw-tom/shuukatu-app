import { usePostReducer } from '@/app/context/usePostReducer'
import { AddCircle } from '@mui/icons-material'
import type { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const TaskForm = ({
  setOpen,
  title,
  setFormSlide,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  title: string
  setFormSlide: Dispatch<SetStateAction<string>>
}) => {
  const [date, setDate] = useState<string>('')
  const [limitDate, setLimitDate] = useState<string>('')
  const { state, dispatch } = usePostReducer()

  const handleStateChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const customId = uuidv4()
    const { name, value } = e.target
    dispatch({ type: 'SET_TASK', payload: { customId, name, value, date, limitDate } })
  }

  const handleCancel = () => {
    setFormSlide('-translate-x-none')
    // dispatch({ type: 'CLEAR' })
    setOpen(false)
  }

  const handleAdd = async () => {
    const res = await fetch('http://localhost:3000/api/posts/task', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', // JSONデータを送ることを明示
      },
      body: JSON.stringify({
        customId: state.customId,
        taskFlow: state.taskFlow,
      }),
    })

    if (!res.ok) {
      console.log('failed to fetch')
    }
    console.log(state)
    setFormSlide('-translate-x-none')
    setOpen(false)
    // dispatch({ type: 'CLEAR' })
  }

  return (
    <div className="card mx-auto h-auto w-[500px] bg-white dark:bg-gray-700">
      <h2 className="mx-auto mb-10 flex w-full items-center justify-center gap-1 rounded-t-lg border-b-2 border-info py-2 text-xl  text-info dark:bg-info dark:text-gray-900 ">
        <AddCircle />
        <span>タスクの{title}</span>
      </h2>
      <form method="post" className="flex w-full flex-col items-start gap-8 px-5">
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
            value={date}
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
            value={limitDate}
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
            onClick={() => handleAdd()}
          >
            <span>{title}</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default TaskForm
