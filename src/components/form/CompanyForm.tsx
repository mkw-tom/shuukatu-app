import { usePostReducer } from '@/app/context/useFormInputReducer'
import { usePost } from '@/app/context/usePost'
import { AddCircle } from '@mui/icons-material'
import type { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const CompanyForm = ({
  setOpen,
  title,
  setFormSlide,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  title: string
  setFormSlide: Dispatch<SetStateAction<string>>
}) => {
  // const [state, dispatch] = useReducer(PostReducer, PostState)
  const { selectPost } = usePost()
  const { state, dispatch } = usePostReducer()
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')

  useEffect(() => {
    if (title === '編集') {
      setStartDate(state.startDate)
      setEndDate(state.endDate)
    }
  }, [state.startDate, state.endDate, title])

  const handleStateChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const customId = uuidv4()
    const userId = 'aiueo'

    const { name, value } = e.target
    dispatch({
      type: 'SET_COMPANY',
      payload: { customId, userId, startDate, endDate, name, value },
    })
  }

  const handleCancel = () => {
    const customId = title == '編集' ? (selectPost?.customId as string) : uuidv4()
    // e.preventDefault()
    dispatch({ type: 'CLEAR' })
    setFormSlide('-translate-x-none')
    setOpen(false)
  }

  const handleAdd = async () => {
    const userId = '66b80f4baa71df7091ecaaa3'
    const url = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_DEV_API_URL
    const res = await fetch(`${url}/api/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // JSONデータを送ることを明示
      },
      body: JSON.stringify({
        customId: state.customId,
        userId,
        name: state.name,
        event: state.event,
        startDate: state.startDate,
        endDate: state.endDate,
        region: state.region,
      }),
    })

    console.log(state)
    setFormSlide('-translate-x-[500px]')
  }

  return (
    <div className="card mx-auto h-auto w-[500px] bg-white dark:bg-gray-700">
      <h2 className="mx-auto mb-10 flex w-full items-center justify-center gap-1 rounded-t-lg border-b-2 border-info py-2 text-xl  text-info dark:bg-info dark:text-gray-900 ">
        <AddCircle />
        <span>企業の{title}</span>
      </h2>
      <form method="post" className="flex w-full flex-col items-start gap-8 px-5">
        <label htmlFor="name" className="">
          <span className="inline-block w-[100px] text-center text-info">企業名</span>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="企業名："
            className="input input-bordered w-[300px] bg-gray-200 text-gray-700 dark:bg-gray-400"
            value={state.name}
            onChange={(e) => handleStateChange(e)}
          />
        </label>
        <label htmlFor="event">
          <span className="inline-block w-[100px] text-center text-info">イベント</span>
          <select
            id="event"
            name="event"
            className="select select-bordered w-[250px] bg-gray-200 text-gray-700 dark:bg-gray-400"
            value={state.event}
            onChange={(e) => handleStateChange(e)}
          >
            <option>短期インターン</option>
            <option>長期インターン</option>
          </select>
        </label>
        <div className="flex w-full items-center">
          <span className="inline-block w-[100px] text-center text-info">開催日時</span>
          <div className="flex w-[250px] flex-col items-center gap-2">
            <input
              type="datetime-local"
              className="input  input-bordered w-full bg-gray-200 text-gray-700 dark:bg-gray-400"
              onChange={(e) => setStartDate(e.target.value)}
            />
            <p>から</p>
            <input
              type="datetime-local"
              className="input input-bordered w-full  bg-gray-200 text-gray-700 dark:bg-gray-400"
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <label htmlFor="region">
          <span className="inline-block w-[100px] text-center text-info">開催地</span>
          <input
            id="region"
            name="region"
            type="text"
            placeholder="開催地："
            className="input input-bordered w-[250px] bg-gray-200 text-gray-700 dark:bg-gray-400 "
            value={state.region}
            onChange={(e) => handleStateChange(e)}
          />
        </label>
        <div className="mx-auto my-5 flex gap-3">
          <button
            className="btn w-40 bg-gray-400 text-gray-200 dark:btn-outline hover:border-gray-400 hover:bg-gray-400 dark:text-gray-400 dark:hover:bg-gray-400"
            type="button"
            onClick={() => handleCancel()}
          >
            <span>キャンセル</span>
          </button>
          <button
            className="btn w-40 bg-info text-gray-200 dark:btn-outline hover:border-info hover:bg-info dark:text-info dark:hover:bg-info"
            type="button"
            onClick={handleAdd}
          >
            <span>{title}</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default CompanyForm
