'use client'

import { usePost } from '@/app/company_page/context/usePost'

const Region = () => {
  const { selectPost } = usePost()

  return (
    <div
      className={`${selectPost?.startDate ? 'block' : 'hidden'}mt-5 rounded-sm bg-gray-100 p-2 dark:bg-gray-700`}
    >
      <ul className="flex flex-col gap-1">
        <li className="border-l-2 border-l-info pl-2 text-gray-900 dark:text-gray-400">
          開催地： {selectPost?.region}
        </li>
        <li className="flex items-center border-l-2 border-l-info pl-2 text-gray-900 dark:text-gray-400">
          開催日時：
          <span className="mx-2">{new Date(selectPost?.startDate as string).toLocaleString()}</span>
          <span> 〜 </span>
          <span className="mx-2">{new Date(selectPost?.endDate as string).toLocaleString()}</span>
        </li>
      </ul>
    </div>
  )
}

export default Region
