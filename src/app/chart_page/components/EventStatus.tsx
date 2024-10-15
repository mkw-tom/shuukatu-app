'use client'
import { usePost } from '@/app/state/context/usePost'

const EventStatus = () => {
  const { postsState } = usePost()
  const honnsenn = postsState.filter((post) => post.event === '本選考')
  const miniIntern = postsState.filter((post) => post.event === '短期インターン')
  const longIntern = postsState.filter((post) => post.event === '長期インターン')
  const hackathon = postsState.filter((post) => post.event === 'ハッカソン')

  return (
    <section className="flex w-full  flex-col items-start overflow-x-auto lg:flex-1">
      <div className="stats bg-base-300 shadow ">
        <div className="stat">
          {/* <Cancel className='stat-figure text-error'/> */}
          <div className="stat-title text-xs md:text-base">本選考</div>
          <div className="stat-value text-center text-lg md:text-xl">{honnsenn.length}社</div>
          {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
        </div>

        <div className="stat">
          {/* <CheckCircle className="stat-figure text-info" /> */}
          <div className="stat-title text-xs md:text-base">長期インターン</div>
          <div className="stat-value text-center text-lg md:text-xl">{longIntern.length}社</div>
          {/* <div className="stat-desc">↗︎ 400 (22%)</div> */}
        </div>

        <div className="stat">
          {/* <Verified className="stat-figure text-orange-500" /> */}
          <div className="stat-title text-xs md:text-base">短期インターン</div>
          <div className="stat-value text-center text-lg md:text-xl">{miniIntern.length}社</div>
          {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
        </div>

        <div className="stat">
          {/* <Cancel className="stat-figure text-error" /> */}
          <div className="stat-title text-xs md:text-base">ハッカソン</div>
          <div className="stat-value text-center text-lg md:text-xl">{hackathon.length}社</div>
          {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
        </div>
      </div>
    </section>
  )
}

export default EventStatus
