'use client'
import { PostReducer, PostState } from '@/app/reducer/PostReducer'
import { AddCircle } from '@mui/icons-material'
import type { ChangeEvent } from 'react'
import React, { useReducer } from 'react'

const PostForm = ({
  open,
  setOpen,
  title,
}: {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  title: string
}) => {
  const [state, dispatch] = useReducer(PostReducer, PostState)

  const handleStateChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const userId = 'aiueo'
    const { name, value } = e.target
    dispatch({ type: 'SET_COMPANY', payload: { userId, name, value } })
    console.log(state)
  }

  const handleAdd = async (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.preventDefault()
    const res = await fetch('http://localhost:3000/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // JSONデータを送ることを明示
      },
      body: JSON.stringify({
        customId: state.customId,
        userId: state.userId,
        name: state.name,
        event: state.event,
        startDate: state.startDate,
        endDate: state.endDate,
        region: state.region,
      }),
    })

    const data = await res.json() // サーバーからのレスポンスを取得
    console.log(data) // レスポンスデータを確認
    dispatch({ type: 'CLEAR' })
    console.log(state)
  }

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setOpen(false)
  }

  return (
    <div className={`${open ? 'fixed' : 'hidden'} inset-0 z-50 bg-black bg-opacity-90 `}>
      <div className="card mx-auto mt-20 h-auto w-[500px] bg-white dark:bg-gray-700 ">
        <h2 className="mx-auto mb-10 flex w-full items-center justify-center gap-1 rounded-t-lg border-b-2 border-info py-2 text-xl  text-info dark:bg-info dark:text-gray-900 ">
          <AddCircle />
          <span>{title}</span>
        </h2>
        <form className="flex w-full flex-col items-start gap-8 px-5">
          <label htmlFor="name" className="">
            <span className="inline-block w-[120px] text-center text-info">企業名</span>
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
            <span className="inline-block w-[120px] text-center text-info">イベント</span>
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
            <span className="inline-block w-[120px] text-center text-info">開催日時</span>
            <div className="flex w-[250px] flex-col items-center gap-2">
              <input
                type="datetime-local"
                className="input  input-bordered w-full bg-gray-200 text-gray-700 dark:bg-gray-400"
                value={state.startDate}
                onChange={(e) => handleStateChange(e)}
              />
              <p>から</p>
              <input
                type="datetime-local"
                className="input input-bordered w-full  bg-gray-200 text-gray-700 dark:bg-gray-400"
                value={state.endDate}
                onChange={(e) => handleStateChange(e)}
              />
            </div>
          </div>

          <label htmlFor="region">
            <span className="inline-block w-[120px] text-center text-info">開催地</span>
            <input
              id="region"
              name="region"
              type="text"
              placeholder="開催地："
              className="input input-bordered w-[300px] bg-gray-200 text-gray-700 dark:bg-gray-400 "
              value={state.region}
              onChange={(e) => handleStateChange(e)}
            />
          </label>
          <div className="mx-auto my-5 flex gap-3">
            <button
              className="btn w-40 bg-gray-400 text-gray-200 dark:btn-outline hover:border-gray-400 hover:bg-gray-400 dark:text-gray-400 dark:hover:bg-gray-400"
              onClick={(e) => handleCancel(e)}
            >
              <span>キャンセル</span>
            </button>
            <button className="btn w-40 bg-info text-gray-200 dark:btn-outline hover:border-info hover:bg-info dark:text-info dark:hover:bg-info">
              <span onClick={(e) => handleAdd(e)}>次へ</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PostForm
