import CardList from './components/CardList.tsx/CardList'
import ShowCard from './components/ShowCard/ShowCard'

const page = () => {
  return (
    <main className="h-screen ">
      <div className="mx-10 mt-10 items-start justify-between lg:flex">
        <div className="hidden  w-5/12 lg:block">
          <ShowCard />
        </div>
        <CardList />
      </div>
    </main>
  )
}

export default page
