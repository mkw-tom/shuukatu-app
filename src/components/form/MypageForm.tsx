// import { PostReducer, PostState } from '@/app/reducer/PostReducer'
import { usePostReducer } from '@/app/context/usePostReducer'
import { AddCircle } from '@mui/icons-material'
import type { ChangeEvent, Dispatch, SetStateAction } from 'react'

const MypageForm = ({
  setOpen,
  title,
  setFormSlide,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  title: string
  setFormSlide: Dispatch<SetStateAction<string>>
}) => {
  // const [state, dispatch] = useReducer(PostReducer, PostState)
  const { state, dispatch } = usePostReducer()
  const handleStateChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    dispatch({ type: 'SET_MYPAGE', payload: { name, value } })
  }

  const handleCancel = () => {
    setOpen(false)
    dispatch({ type: 'CLEAR' })
    setFormSlide('-translate-x-none')
  }

  const handleAdd = async () => {
    const res = await fetch('http://localhost:3000/api/posts', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', // JSONデータを送ることを明示
      },
      body: JSON.stringify({
        customId: state.customId,
        mypage: state.mypage,
      }),
    })

    const data = await res.json() // サーバーからのレスポンスを取得
    console.log(state)
    if (title === '編集') {
      setFormSlide('-translate-x-none ')
      setOpen(false)
      dispatch({ type: 'CLEAR' })
    } else {
      setFormSlide('-translate-x-[1000px] ')
    }
  }

  return (
    <div className="card mx-auto h-auto w-[500px] bg-white dark:bg-gray-700">
      <h2 className="mx-auto mb-10 flex w-full items-center justify-center gap-1 rounded-t-lg border-b-2 border-info py-2 text-xl  text-info dark:bg-info dark:text-gray-900 ">
        <AddCircle />
        <span>マイページの{title}</span>
      </h2>
      <form method="post" className="flex w-full flex-col items-start gap-8 px-5">
        <label htmlFor="url" className="">
          <span className="inline-block w-[100px] text-center text-info">マイページURL</span>
          <input
            type="text"
            id="url"
            name="url"
            placeholder="URL："
            className="input input-bordered w-[300px] bg-gray-200 text-gray-700 dark:bg-gray-400"
            value={state.mypage.url}
            onChange={(e) => handleStateChange(e)}
          />
        </label>

        <label htmlFor="id">
          <span className="inline-block w-[100px] text-center text-info">ID</span>
          <input
            id="id"
            name="id"
            type="text"
            placeholder="ID："
            className="input input-bordered w-[300px] bg-gray-200 text-gray-700 dark:bg-gray-400 "
            value={state.mypage.id}
            onChange={(e) => handleStateChange(e)}
          />
        </label>

        <label htmlFor="password">
          <span className="w-[100px]text-center inline-block text-info">Password</span>
          <input
            id="password"
            name="password"
            type="text"
            placeholder="開催地："
            className="input input-bordered w-[300px] bg-gray-200 text-gray-700 dark:bg-gray-400 "
            value={state.mypage.password}
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

export default MypageForm
