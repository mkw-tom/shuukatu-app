const Loading = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 ">
      <div className="mx-auto flex h-full w-28 flex-col items-center justify-center lg:text-xl">
        <span className="font-bold tracking-wider text-base-100 dark:text-info">AIが解析中</span>
        <span className="loading loading-bars loading-md text-base-100 lg:loading-lg dark:text-info"></span>
      </div>
    </div>
  )
}

export default Loading
