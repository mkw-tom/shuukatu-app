'use client'

import { usePost } from '@/app/company_page/context/usePost'
import useConvertDateTime from '../../hooks/useConvertDateTime'

const Region = () => {
  const { selectPost } = usePost()
  const conversionDateTime = useConvertDateTime()

  return (
    <div
      className={`${selectPost?.startDate ? 'block' : 'hidden'}mt-5 rounded-sm bg-gray-100 p-2 dark:bg-gray-700`}
    >
      <ul className="flex flex-col gap-1">
        <li className="border-l-2 border-l-info pl-2 text-gray-900 dark:text-gray-400">
          場所： {selectPost?.region}
        </li>
        <li className="flex items-start border-l-2 border-l-info pl-2 text-gray-900 dark:text-gray-400">
          <span className="w-16">日時：</span>
          <span className="">{conversionDateTime(selectPost?.startDate as string)}</span>
          <span className="mx-2"> 〜 </span>
          <span className="">{conversionDateTime(selectPost?.endDate as string)}</span>
        </li>
      </ul>
    </div>
  )
}

export default Region
