'use client'
import { Check, Clear, NextPlanOutlined } from '@mui/icons-material'
import { usePost } from '../../context/usePost'
import useTaskSwitch from '../../hooks/useTaskSwitch'

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
  const { handleFinished, handleNext, handleBack, handleCompleted, handleFailed } = useTaskSwitch()

  return (
    <div className="mt-5 flex items-center justify-between gap-2 ">
      <button
        className={`btn ${prevTask === undefined ? 'hidden' : 'w-3/12 bg-gray-400 text-gray-200 dark:btn-outline  dark:text-gray-400 dark:hover:border-gray-400 dark:hover:text-gray-400'}  ${currentTask?.failed || selectPost?.completed ? 'hidden' : ''} `}
        onClick={handleBack}
        disabled={prevTask === undefined ? true : false}
      >
        戻る
      </button>
      {/* 次のタスクがない時だけ表示 */}
      {!currentTask?.current ? (
        <>
          <button
            className={`btn w-auto flex-1 ${selectPost?.completed ? 'bg-gray-400 hover:border-gray-400 hover:bg-gray-500 dark:hover:border-gray-400' : 'bg-orange-500 text-gray-200 dark:btn-outline hover:border-orange-500 hover:bg-orange-500 dark:text-orange-500 dark:hover:border-orange-500 dark:hover:bg-orange-500  dark:hover:text-gray-800  '}   ${currentTask ? 'hidden' : 'block'} `}
            disabled={selectPost?.taskFlow[0] ? false : true}
            onClick={() => handleCompleted()}
          >
            {selectPost?.completed ? '合格を取り消す' : '合格'}
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
        <>
          <button
            className={` btn  btn-error  ${prevTask === undefined ? 'flex-1' : ''} ${currentTask.failed ? 'flex-1 border-gray-400 bg-gray-400 hover:border-gray-400 hover:bg-gray-500 dark:border-gray-400 dark:bg-gray-400 dark:hover:border-gray-400 dark:hover:bg-gray-500 ' : ' w-1/3 text-white dark:btn-outline dark:btn-error dark:hover:text-error'}`}
            onClick={handleFailed}
          >
            <Clear />
            {currentTask.failed ? '不合格を取り消す' : '不合格'}
          </button>
          <button
            className={`btn btn-info w-1/3 text-gray-200 dark:btn-outline  dark:btn-info  hover:bg-info ${currentTask.failed ? 'hidden' : 'block'}`}
            onClick={handleFinished}
          >
            <Check />
            完了
          </button>
        </>
      )}
    </div>
  )
}

export default TaskButtons
