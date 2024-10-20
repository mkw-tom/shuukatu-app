import WindowMock from '@/app/components/mock_design/WindowMock'
import { TaskAlt } from '@mui/icons-material'
import Image from 'next/image'
import StartButton from './components/StartButton/StartButton'

export default function Home() {
  return (
    <main className="flex h-auto flex-col bg-gradient-to-tr from-info to-orange-500">
      <div className="items-cetner flex flex-col lg:flex-row">
        <div className="flex h-screen w-full flex-col items-center justify-center lg:w-1/2  ">
          <h1 className="flex items-center ">
            <Image
              src="/file.png"
              width={200}
              height={200}
              alt="ユーザー画像"
              className="w-32 md:w-44"
            />
            <p className="mr-1 font-mono text-5xl font-bold tracking-wider  text-white dark:text-gray-800 md:text-8xl  ">
              Entrix
            </p>
          </h1>
          <ul className="flex flex-col gap-3 ">
            <li className="flex items-center">
              <TaskAlt className="mr-2 text-orange-500" />
              <span className="text-md font-bold tracking-wide text-gray-100 dark:text-gray-800 md:text-xl">
                複雑なエントリー管理をラクに
              </span>
            </li>
            <li className="flex items-center">
              <TaskAlt className="mr-2 text-orange-500 " />
              <span className="text-md font-bold tracking-wide text-gray-100 dark:text-gray-800 md:text-xl">
                エントリー状況を可視化
              </span>
            </li>
            <li className="flex items-center">
              <TaskAlt className="mr-2 text-orange-500 " />
              <span className="text-md font-bold tracking-wide text-gray-100 dark:text-gray-800 md:text-xl">
                AIによる適職検査
              </span>
            </li>
          </ul>
          <StartButton />
        </div>

        <div className=" hidden h-screen w-full flex-col justify-center sm:flex lg:w-1/2 ">
          <WindowMock />
          <nav className="mx-auto mt-5 flex gap-2">
            <button>
              <p className="size-3 rounded-full bg-gray-500"></p>
            </button>
            <button>
              <p className="size-3 rounded-full bg-gray-500"></p>
            </button>
            <button>
              <p className="size-3 rounded-full bg-gray-500"></p>
            </button>
          </nav>
        </div>
      </div>
    </main>
  )
}
