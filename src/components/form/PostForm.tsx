import { AddCircle } from '@mui/icons-material'
import React from 'react'

const PostForm = ({
  open,
  setOpen,
  title,
}: {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  title: string
}) => {
  const handleCancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setOpen(false)
  }

  return (
    <div className={`${open ? 'fixed' : 'hidden'} inset-0 z-50 bg-black bg-opacity-90 `}>
      <div className="card mx-auto mt-20 h-auto w-[500px] bg-white dark:bg-gray-700 ">
        <h2 className="mx-auto mb-10 flex w-full items-center justify-center gap-1 rounded-t-lg border-b-2 border-primary py-2 text-xl  text-primary dark:bg-primary dark:text-gray-900 ">
          <AddCircle />
          <span>{title}</span>
        </h2>
        <form className="flex w-full flex-col items-start gap-8 px-5">
          <label htmlFor="name" className="">
            <span className="inline-block w-[120px] text-center">企業名</span>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="企業名："
              className="input input-bordered w-[300px] bg-gray-200 text-gray-700 dark:bg-gray-400"
            />
          </label>
          <label htmlFor="event">
            <span className="inline-block w-[120px] text-center">イベント</span>
            <select
              id="event"
              name="event"
              className="select select-bordered w-[250px] bg-gray-200 text-gray-700 dark:bg-gray-400"
            >
              <option disabled selected>
                イベント
              </option>
              <option>短期インターン</option>
              <option>長期インターン</option>
            </select>
          </label>
          <div className="flex w-full items-center">
            <span className="inline-block w-[120px] text-center">開催日時</span>
            <div className="flex w-[250px] flex-col items-center gap-2">
              <input
                type="datetime-local"
                className="input  input-bordered w-full bg-gray-200 text-gray-700 dark:bg-gray-400"
              />
              <p>から</p>
              <input
                type="datetime-local"
                className="input input-bordered w-full  bg-gray-200 text-gray-700 dark:bg-gray-400"
              />
            </div>
          </div>

          <label htmlFor="region">
            <span className="inline-block w-[120px] text-center">開催地</span>
            <input
              id="region"
              name="region"
              type="text"
              placeholder="開催地："
              className="input input-bordered w-[300px] bg-gray-200 text-gray-700 dark:bg-gray-400 "
            />
          </label>
          <div className="mx-auto my-5 flex gap-3">
            <button
              className="btn btn-outline w-40 dark:btn-active"
              onClick={(e) => handleCancel(e)}
            >
              <span>キャンセル</span>
            </button>
            <button className="btn btn-outline btn-primary w-48 dark:btn-active">
              <span>次へ</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PostForm
