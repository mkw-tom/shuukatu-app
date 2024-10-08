import ShowCard from '../ShowCard/ShowCard'

const SideDrawer = ({ selectPost }: { selectPost: { name: string; event: string } | null }) => {
  return (
    <div className="drawer-side ">
      <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
      <div className="w-6/12  bg-white">
        <ShowCard />
      </div>
    </div>
  )
}

export default SideDrawer
