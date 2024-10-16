'use client'
import { usePost } from '@/app/state/context/usePost'
import { Celebration } from '@mui/icons-material'
import React from 'react'

const RadioProgress = () => {
  const { postsState } = usePost()
  const completed = postsState.filter((post) => post.completed)
  const persent = (completed.length / postsState.length) * 100
  const integetPersent = Math.floor(persent)
  return (
    <section className="mx-auto flex  w-full flex-col gap-4 rounded-md  p-5  lg:w-1/2 ">
      <h3 className="flex gap-1 text-lg font-bold text-orange-500 md:text-2xl  ">
        <Celebration />
        <span>合格率</span>
      </h3>
      <div
        className="radial-progress mx-auto border-4 border-orange-500 bg-orange-500 font-bold text-white dark:text-gray-900"
        style={
          {
            '--value': `${persent}`,
            '--size': '12rem',
            '--thickness': '10px',
          } as React.CSSProperties
        }
        role="progressbar"
      >
        {integetPersent}%
      </div>

      {/* <div
                className="radial-progress bg-info text-sky-900 border-info border-4"
                 style={{"--value": 20} as React.CSSProperties} role="progressbar"
              >
                20%
              </div> */}
    </section>
  )
}

export default RadioProgress
