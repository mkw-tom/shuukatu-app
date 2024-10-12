import ShowCard from '../ShowCard/ShowCard'

const SideDrawer = ({ selectPost }: { selectPost: { name: string; event: string } | null }) => {
  return (
    <div className="drawer-side z-50 hidden sm:inline-grid">
      <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay "></label>
      <div className="w-6/12 min-w-[500px] bg-base-200 dark:bg-gray-700">
        <ShowCard />
      </div>
    </div>
  )
}

export default SideDrawer
