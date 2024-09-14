import { AssignmentInd, CheckCircle, Group, Verified } from '@mui/icons-material'
import Image from 'next/image'

const WindowMock = () => {
  return (
    <div className="mockup-window mx-auto w-11/12 border-2 bg-base-300 shadow-lg dark:border-gray-500 dark:bg-gray-600">
      <div className="mt-2 bg-base-100  dark:bg-gray-900">
        <div className="flex h-8 items-center justify-between border-y-2 border-t-info dark:border-b-gray-500">
          <h1 className="ml-2 flex items-center">
            <Image src="/file.png" width={30} height={30} alt="ユーザー画像" className="mr-2 " />
            <p className="text-xm mr-1 bg-gradient-to-r from-info to-orange-400 bg-clip-text  font-bold tracking-widest text-transparent">
              Entrix
            </p>
          </h1>
          <ul className="flex list-none items-center gap-2">
            <li className="h-1 w-8 rounded-full bg-gray-300 "></li>
            <li className="h-1 w-8 rounded-full bg-gray-300 "></li>
            <li className="h-1 w-8 rounded-full bg-gray-300 "></li>
            <li className="ml-5 size-4 rounded-full bg-gray-300"></li>
            <li className="mr-2 size-4 rounded-full bg-gray-300"></li>
          </ul>
        </div>
        <div className="my-5 flex h-auto justify-between px-3 ">
          <div className="h-58 card  w-5/12 border-2 p-2 dark:border-gray-500 dark:bg-gray-800">
            <p className="border-l-2 border-l-info pl-1 text-sm">株式会社×××</p>
            <p className="ml-1 mt-1 h-2 w-24  rounded-full bg-gray-300 dark:bg-gray-500"></p>
            <div className="mr-auto flex items-center">
              <Group className="mr-1 size-4 text-info " style={{ fontSize: '15px ' }} />
              <p className="h-2 w-10 rounded-md bg-info "></p>
            </div>
            <ul className="mt-1 h-6 w-full rounded-sm bg-gray-100 dark:bg-gray-700">
              <li className="ml-1 mt-1 h-1 w-28  rounded-full bg-gray-300 dark:bg-gray-500"></li>
              <li className="ml-1 mt-1 h-1 w-32  rounded-full bg-gray-300 dark:bg-gray-500"></li>
            </ul>
            <ul className="mt-1 h-6 w-full rounded-sm bg-gray-100 dark:bg-gray-700">
              <li className="ml-1 mt-1 h-1 w-20  rounded-full bg-gray-300 dark:bg-gray-500"></li>
              <li className="ml-1 mt-1 h-1 w-20  rounded-full bg-gray-300 dark:bg-gray-500"></li>
            </ul>
            <p className="ml-1 mt-1 border-l-2 border-l-info pl-1 text-xs">選考フロー</p>
            <ul className="timeline timeline-horizontal mb-5 flex lg:ml-0">
              <li>
                <div className="timeline-middle">
                  <CheckCircle className="text-info" style={{ fontSize: '15px ' }} />
                </div>
                <p className="timeline-end ml-1 mt-1 h-2 w-10 rounded-full bg-gray-300"></p>
                <hr className="bg-info" />
              </li>
              <li>
                <hr className="bg-info" />
                <div className="timeline-middle">
                  <CheckCircle className="text-info" style={{ fontSize: '15px ' }} />
                </div>
                <p className="timeline-end ml-1 mt-1 h-2 w-10 rounded-full bg-gray-300"></p>
                <hr className="bg-info" />
              </li>
              <li>
                <hr className="" />
                <div className="timeline-middle">
                  <CheckCircle className="text-gray-400" style={{ fontSize: '15px ' }} />
                </div>
                <p className="timeline-end ml-1 mt-1 h-2 w-10 rounded-full bg-gray-300"></p>
                <hr className="" />
              </li>
              <hr className="" />

              <li>
                <hr className="" />
                <div className="timeline-middle">
                  <Verified className="text-orange-500" style={{ fontSize: '15px ' }} />
                </div>
                <p className="timeline-end ml-1 mt-1 h-2 w-10 rounded-full bg-gray-300"></p>
              </li>
            </ul>
            <ul className="flex h-10 w-full flex-col items-start rounded-md border-2 dark:border-gray-500">
              <p className="ml-1 mt-1 h-1 w-16 rounded-full bg-info"></p>
              <p className="ml-1 mt-1 h-1 w-32  rounded-full bg-gray-300 dark:bg-gray-500"></p>
              <p className="ml-1 mt-1 h-1 w-24  rounded-full bg-gray-300 dark:bg-gray-500"></p>
              <p className="ml-1 mt-1 h-1 w-20  rounded-full bg-gray-300 dark:bg-gray-500"></p>
            </ul>
            <div className="mt-2 flex items-center gap-2">
              <p className="h-4 w-1/4 rounded-md bg-gray-400 dark:border-2 dark:border-gray-500  dark:bg-gray-800"></p>
              <p className="h-4 w-3/4 rounded-md bg-info dark:border-2 dark:border-info  dark:bg-gray-800"></p>
            </div>
          </div>

          <div className="card h-auto w-5/12">
            <div className="mb-2 flex gap-1">
              <p className="mr-1 h-4 w-16 rounded-md bg-info dark:border-2 dark:border-info dark:bg-gray-800"></p>
              <p className="h-4 flex-1 rounded-md bg-gray-200 dark:bg-gray-500"></p>
              <p className="size-4 rounded-md bg-gray-400"></p>
            </div>
            <ul className="flex flex-col gap-2">
              <li className="w-full ">
                <div className="shadow-md: card card-side relative flex items-center justify-between border-2 border-l-4 border-info p-2 dark:border-info dark:bg-gray-900 dark:text-gray-200">
                  <div className="flex flex-col gap-1">
                    {/* <input type="radio" className="w-3 h-3" /> */}
                    <h1 className="border-l-2 border-l-info pl-2 text-start text-sm tracking-wider ">
                      株式会社×××
                    </h1>
                    <p className="ml-5 h-2 w-20 rounded-md bg-gray-200 dark:bg-gray-500"></p>
                  </div>

                  <div className="ml-auto flex items-center">
                    <Group className="mr-1 size-4 text-info " style={{ fontSize: '15px ' }} />
                    <p className="h-2 w-10 rounded-md bg-gray-200  dark:bg-gray-500 "></p>
                  </div>
                </div>
              </li>

              <li className="w-full ">
                <div className="shadow-md: card card-side relative flex items-center justify-between border-2 border-l-4 p-2 dark:border-gray-500 dark:bg-gray-900 dark:text-gray-200 ">
                  <div className="flex flex-col gap-1">
                    {/* <input type="radio" className="w-3 h-3" /> */}
                    <h1 className="border-l-2 border-l-info pl-2 text-start text-sm tracking-wider ">
                      株式会社×××××
                    </h1>
                    <p className="ml-5 h-2 w-20 rounded-md  bg-gray-200 dark:bg-gray-500"></p>
                  </div>

                  <div className="ml-auto flex items-center">
                    <AssignmentInd
                      className="mr-1 size-4 text-info "
                      style={{ fontSize: '15px ' }}
                    />
                    <p className="h-2 w-10 rounded-md bg-gray-200  dark:bg-gray-500 "></p>
                  </div>
                </div>
              </li>

              <li className="w-full ">
                <div className="shadow-md: card card-side relative flex items-center justify-between border-2 border-l-4 p-2 dark:border-gray-500 dark:bg-gray-900 dark:text-gray-200">
                  <div className="flex flex-col gap-1">
                    {/* <input type="radio" className="w-3 h-3" /> */}
                    <h1 className="border-l-2 border-l-info pl-2 text-start text-sm tracking-wider ">
                      株式会社××××
                    </h1>
                    <p className="ml-3 h-2 w-20 rounded-md  bg-gray-200 dark:bg-gray-500"></p>
                  </div>

                  <div className="ml-auto flex items-center">
                    <Verified
                      className="mr-1 size-4 text-orange-500 "
                      style={{ fontSize: '15px ' }}
                    />
                    <p className="h-2 w-10 rounded-md bg-gray-200  dark:bg-gray-500 "></p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WindowMock
