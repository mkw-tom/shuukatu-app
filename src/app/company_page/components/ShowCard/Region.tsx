const Region = () => {
  return (
    <div className="mt-5 rounded-sm bg-gray-100 p-2 dark:bg-gray-700">
      <ul className="flex flex-col gap-1">
        <li className="border-l-2 border-l-primary pl-2 text-gray-900 dark:text-gray-400">
          開催地： 沖縄
        </li>
        <li className="flex items-center border-l-2 border-l-primary pl-2 text-gray-900 dark:text-gray-400">
          開催日時：
          <span className="mx-2">11:00</span>
          <span> 〜 </span>
          <span className="mx-2">21:00</span>
        </li>
      </ul>
    </div>
  )
}

export default Region
