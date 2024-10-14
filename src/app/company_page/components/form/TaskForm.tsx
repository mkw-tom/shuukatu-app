import { usePostReducer } from '@/app/state/context/useFormInputReducer'
import { usePost } from '@/app/state/context/usePost'
import { taskFormValidationSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { AddCircle } from '@mui/icons-material'
import { useRouter } from 'next/navigation'
import type { ChangeEvent } from 'react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import useAddEdutTask from '../../hooks/formHooks/useAddEdutTask'

export interface TaskFormValidTYpe {
  task: string
  date: string
  limitDate: string
  testFormat: string
}

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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormValidTYpe>({
    resolver: zodResolver(taskFormValidationSchema),
    defaultValues: {
      task: '',
      date: '',
      limitDate: '',
      testFormat: '',
    },
  })

  const handleStateChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const customId = title == '編集' ? (selectPost?.customId as string) : uuidv4()
    const current = state.customId !== '' || selectPost?.taskFlow.length === 0 ? true : false
    const { name, value } = e.target
    dispatch({ type: 'SET_TASK', payload: { customId, name, value, date, limitDate, current } })
    console.log(state)
  }

  useEffect(() => {
    if (title === '編集') {
      reset({
        task: state.taskFlow.task,
        date: state.taskFlow.date,
        limitDate: state.taskFlow.limitDate,
        testFormat: state.taskFlow.testFormat,
      })
      setDate(state.taskFlow.date)
      setLimitDate(state.taskFlow.limitDate)
    }
  }, [
    reset,
    state.taskFlow.date,
    state.taskFlow.limitDate,
    state.taskFlow.task,
    state.taskFlow.testFormat,
    title,
  ])

  return (
    <div className="card mx-auto h-auto w-80 bg-white dark:bg-gray-700 sm:w-96">
      <h2 className="mx-auto mb-10 flex w-full items-center justify-center gap-1 rounded-t-sm border-b-2 border-info py-2 text-xl  text-info ">
        <AddCircle />
        <span>タスクの{title}</span>
      </h2>
      <form
        method="post"
        className="flex w-full flex-col items-start gap-8 px-5"
        onSubmit={handleSubmit(handleAddEditTask)}
      >
        <label htmlFor="task">
          <span className="sm:text-md inline-block w-[70px] text-center text-sm text-info sm:w-[100px]">
            タスク
          </span>
          <select
            {...register('task')}
            // id="task"
            name="task"
            className="select select-bordered select-sm w-[200px] bg-gray-200 text-gray-700 sm:select-md dark:bg-gray-400 sm:w-[230px]"
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
        {errors.task && <span className="mx-auto text-sm text-red-500">{errors.task.message}</span>}

        <label htmlFor="date">
          <span className="sm:text-md inline-block w-[70px] text-center text-sm text-info sm:w-[100px]">
            実践日時
          </span>
          <input
            {...register('date')}
            name="date"
            type="datetime-local"
            className="input input-sm input-bordered w-[200px] bg-gray-200 text-gray-700   sm:input-md dark:bg-gray-400 sm:w-[230px]"
            value={date || state.taskFlow.date}
            onChange={
              title === '編集' ? (e) => handleStateChange(e) : (e) => setDate(e.target.value)
            }
          />
        </label>
        {errors.date && <span className="mx-auto text-sm text-red-500">{errors.date.message}</span>}

        <label htmlFor="limitDate">
          <span className="sm:text-md inline-block w-[70px] text-center text-sm text-info sm:w-[100px]">
            期限
          </span>
          <input
            {...register('limitDate')}
            name="limitDate"
            // id="limitDate"
            type="datetime-local"
            className="input input-sm input-bordered w-[200px] bg-gray-200 text-gray-700  sm:input-md dark:bg-gray-400 sm:w-[230px]"
            value={limitDate || state.taskFlow.limitDate}
            onChange={
              title === '編集' ? (e) => handleStateChange(e) : (e) => setLimitDate(e.target.value)
            }
          />
        </label>
        {errors.limitDate && (
          <span className="mx-auto text-sm text-red-500">{errors.limitDate.message}</span>
        )}

        <label htmlFor="testFormat">
          <span className="sm:text-md inline-block w-[70px] text-center text-sm text-info sm:w-[100px]">
            テスト形式
          </span>
          <input
            {...register('testFormat')}
            // id="testFormat"
            name="testFormat"
            type="text"
            placeholder="例：SPI3"
            className="input input-sm input-bordered w-[200px] bg-gray-200 text-gray-700 sm:input-md dark:bg-gray-400 sm:w-[230px] "
            value={state.taskFlow.testFormat}
            onChange={(e) => handleStateChange(e)}
          />
        </label>
        {errors.testFormat && (
          <span className="mx-auto text-sm text-red-500">{errors.testFormat.message}</span>
        )}
        <div className="mx-auto my-5 flex w-full gap-3">
          <button
            className="btn w-1/2 bg-gray-400 text-gray-200 dark:btn-outline hover:border-gray-400 hover:bg-gray-400 dark:text-gray-400 dark:hover:bg-gray-400"
            type="button"
            onClick={() => handleCancel()}
          >
            <span>{onlyTaskForm ? 'キャンセル' : 'スキップ'}</span>
          </button>
          <button
            className="btn w-1/2 bg-info text-gray-200 dark:btn-outline hover:border-info hover:bg-info dark:text-info dark:hover:bg-info"
            type="submit"
            // onClick={handleAddEditTask}
          >
            <span>{title}</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default TaskForm
