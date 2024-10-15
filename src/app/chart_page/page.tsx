'use client'
import { MilitaryTech } from '@mui/icons-material'
import EventStatus from './components/EventStatus'
import MonthLineChart from './components/MonthLineChart'
import RadioProgress from './components/RadioProgress'
import Status from './components/Status'

const page = () => {
  return (
    <main className="h-auto dark:bg-gray-800 ">
      <div className="mx-5 h-full py-20 md:mx-10 lg:pb-40 ">
        <h2 className="mx-auto mt-10 flex w-11/12 items-center  gap-1 border-b-2 border-info font-bold tracking-wider">
          <span className="text-xl text-info md:text-2xl ">エントリー状況</span>
        </h2>
        <div className="mx-auto mt-10 flex flex-col items-start md:w-11/12 lg:flex-row">
          <div className="flex-co flex w-full lg:w-2/3">
            <div className="mx-auto w-full  rounded-md py-5 md:p-5">
              <h3 className="flex items-center gap-1 pb-1 text-lg font-bold text-orange-500 md:text-2xl">
                <MilitaryTech style={{ fontSize: '25px' }} />
                <span>選考状況</span>
              </h3>
              <div className="flex w-full flex-col items-center justify-around gap-5 md:px-1 lg:flex-row">
                <div className="flex w-full flex-col items-start gap-3 overflow-x-scroll">
                  <Status />
                  <EventStatus />
                </div>
              </div>
            </div>
          </div>
          <RadioProgress />
        </div>
        <MonthLineChart />
      </div>
    </main>
  )
}

export default page
