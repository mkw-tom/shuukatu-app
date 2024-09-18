import { usePostReducer } from '@/app/company_page/context/useFormInputReducer'
import { usePost } from '@/app/company_page/context/usePost'
import { AddCircle } from '@mui/icons-material'
import type { ChangeEvent } from 'react'
import useAddEditMypage from '../../hooks/useAddEditMypage'

const MypageForm = ({
  setOpen,
  title,
  // setFormSlide,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  title: string
  // setFormSlide: Dispatch<SetStateAction<string>>
}) => {
  const { postsState, postsDispatch, selectPost, setSelectPost } = usePost()
  const { state, dispatch, formSlide, setFormSlide } = usePostReducer()
  const { handleAddEditMypage, handleCancel } = useAddEditMypage(title, setOpen)

  const handleStateChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    dispatch({ type: 'SET_MYPAGE', payload: { name, value } })
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
            onClick={() => handleAddEditMypage()}
          >
            <span>{title}</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default MypageForm
