'use client'
import { usePost } from '@/app/state/context/usePost'
import { Cancel, CheckCircle, Verified } from '@mui/icons-material'

const Status = () => {
  const { postsState } = usePost()
  const progress = postsState.filter((post) => !post.failed && !post.completed)
  const compeleted = postsState.filter((post) => post.completed)
  const failed = postsState.filter((post) => post.failed)

  return (
    <section className="flex w-full  flex-col items-start overflow-x-auto lg:flex-1 ">
      <div className="stats bg-base-300 shadow ">
        <div className="stat">
          {/* <Cancel className='stat-figure text-error'/> */}
          <div className="stat-title text-xs md:text-base">すべて</div>
          <div className="stat-value text-lg md:text-2xl">{postsState.length}社</div>
          {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
        </div>

        <div className="stat">
          <CheckCircle className="stat-figure text-info" />
          <div className="stat-title text-xs md:text-base">進行中</div>
          <div className="stat-value text-lg md:text-2xl">{progress.length}社</div>
          {/* <div className="stat-desc">↗︎ 400 (22%)</div> */}
        </div>

        <div className="stat">
          <Verified className="stat-figure text-orange-500" />
          <div className="stat-title text-xs md:text-base">合格</div>
          <div className="stat-value text-lg md:text-2xl">{compeleted.length}社</div>
          {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
        </div>

        <div className="stat">
          <Cancel className="stat-figure text-error" />
          <div className="stat-title text-xs md:text-base">不合格</div>
          <div className="stat-value text-lg md:text-2xl">{failed.length}社</div>
          {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
        </div>
      </div>
    </section>
  )
}

export default Status
