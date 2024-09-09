const TaskButtons = () => {
  return (
    <div className="mt-5 flex items-center justify-between gap-2 ">
      <button className="btn btn-outline w-2/12 dark:btn-active">戻る</button>
      {/* 次のタスクがない時だけ表示 */}
      <button className="btn btn-outline w-4/12 text-orange-500   dark:btn-active hover:bg-orange-500">
        内定・参加確定
      </button>
      <button className="btn btn-outline btn-primary  w-4/12 dark:btn-active">次へ</button>
    </div>
  )
}

export default TaskButtons
