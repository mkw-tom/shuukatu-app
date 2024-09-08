import { Verified } from '@mui/icons-material'
import AddFormButton from './AddFormButton'
import SearchArea from './SearchArea'

const dummy = [
  { name: 'test', event: 'インターン' },
  { name: 'test', event: 'インターン' },
  { name: 'test', event: 'インターン' },
]
const CardList = () => {
  return (
    <div className="flex w-5/12 flex-col">
      <div className="mb-3 flex items-center justify-between gap-5">
        <AddFormButton />
        <SearchArea />
      </div>
      <ul className="flex flex-col gap-3">
        {dummy.map((d, index) => (
          <button key={index} className="w-full ">
            <div className="card card-side relative flex items-center justify-between border-2 border-l-8 p-4 shadow-md hover:border-primary  dark:border-gray-500 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-primary">
              <div className="flex flex-col gap-1">
                {/* <input type="radio" className="w-3 h-3" /> */}
                <h1 className="pl-4 text-start text-xl tracking-wider ">株式会社test</h1>
                <p className="ml-6 mt-1 text-gray-400">インターンシンプ</p>
              </div>

              <div className="ml-auto flex items-center">
                <Verified className="mr-1 size-4 text-orange-500" />
                <span className="font-bold">内定・参加確定</span>
              </div>
            </div>
          </button>
        ))}
      </ul>
    </div>
  )
}

export default CardList
