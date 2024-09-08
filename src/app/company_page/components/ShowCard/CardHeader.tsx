const CardHeader = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="border-l-4 border-l-primary pl-3 text-2xl font-bold text-gray-600 dark:text-gray-200">
          株式会社テスト
        </h2>
        <div className="flex items-center gap-1">
          <p className="my-2 size-5 animate-pulse rounded-full bg-green-500" />
          <p className="text-gray-700 dark:text-gray-200">結果待ち</p>
        </div>
      </div>
      <h3 className="ml-5 text-gray-500 dark:text-gray-400">インターンシップ短期</h3>
    </div>
  )
}

export default CardHeader
