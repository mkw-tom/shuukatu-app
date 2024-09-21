'use client'
import { Check, NextPlanOutlined } from '@mui/icons-material'
import { usePost } from '../../context/usePost'
import useTaskSwitch from '../../hooks/taskButtonsHooks/useTaskSwitch'

const TaskButtons = () => {
  const {
    currentTask,
    finishedTasks,
    postsState,
    postsDispatch,
    selectPost,
    setSelectPost,
    prevTask,
  } = usePost()
  const { handleFinished, handleNext, handleBack, handleCompleted } = useTaskSwitch()

  return (
    <div className="mt-5 flex items-center justify-between gap-2 ">
      <button
        className="btn w-3/12 bg-gray-400 text-gray-200 dark:btn-outline hover:border-gray-400 hover:bg-gray-400 dark:text-gray-400 dark:hover:bg-gray-400"
        onClick={handleBack}
        disabled={prevTask === undefined || selectPost?.completed ? true : false}
      >
        戻る
      </button>
      {/* 次のタスクがない時だけ表示 */}
      {!currentTask?.current ? (
        <>
          <button
            className={`btn w-auto flex-1 ${selectPost?.completed ? 'bg-gray-400 hover:border-gray-400 hover:bg-gray-500' : 'bg-orange-500 hover:border-orange-500 hover:bg-orange-500'} text-gray-200 dark:btn-outline  dark:text-orange-500 dark:hover:bg-orange-500 ${currentTask ? 'hidden' : 'block'} `}
            onClick={() => handleCompleted()}
          >
            {selectPost?.completed ? '内定・参加取り消し' : '内定・参加確定'}
          </button>
          <button
            className={`btn w-auto flex-1 items-center bg-info text-gray-200 dark:btn-outline hover:border-info hover:bg-info dark:text-info dark:hover:bg-info ${!currentTask && prevTask?.finished ? 'hidden' : 'flex'}`}
            onClick={handleNext}
            disabled={selectPost?.completed || !currentTask ? true : false}
          >
            <NextPlanOutlined />
            <span>次へ</span>
          </button>
        </>
      ) : (
        <button
          className="btn w-auto flex-1 bg-info text-gray-200 dark:btn-outline hover:border-info hover:bg-info dark:text-info dark:hover:bg-info"
          onClick={handleFinished}
        >
          <Check />
          完了
        </button>
      )}
    </div>
  )
}

export default TaskButtons
