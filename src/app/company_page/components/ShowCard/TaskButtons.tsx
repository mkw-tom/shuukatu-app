'use client'
import { Check } from '@mui/icons-material'
import { useState } from 'react'

const TaskButtons = () => {
  const [finished, setFinished] = useState<boolean>(false)
  return (
    <div className="mt-5 flex items-center justify-between gap-2 ">
      <button className="btn w-3/12 bg-gray-400 text-gray-200 dark:btn-outline hover:border-gray-400 hover:bg-gray-400 dark:text-gray-400 dark:hover:bg-gray-400">
        戻る
      </button>
      {/* 次のタスクがない時だけ表示 */}
      {finished ? (
        <>
          <button className="btn w-4/12 bg-orange-500 text-gray-200 dark:btn-outline hover:border-orange-500 hover:bg-orange-500 dark:text-orange-500 dark:hover:bg-orange-500">
            内定・参加確定
          </button>
          <button
            className="btn w-4/12 bg-info text-gray-200 dark:btn-outline hover:border-info hover:bg-info dark:text-info dark:hover:bg-info"
            onClick={() => setFinished(false)}
          >
            次へ
          </button>
        </>
      ) : (
        <button
          className="btn w-8/12 bg-info text-gray-200 dark:btn-outline hover:border-info hover:bg-info dark:text-info dark:hover:bg-info"
          onClick={() => setFinished(true)}
        >
          <Check />
          完了
        </button>
      )}
    </div>
  )
}

export default TaskButtons
