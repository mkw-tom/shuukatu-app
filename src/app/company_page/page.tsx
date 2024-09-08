import CardList from './components/CardList.tsx/CardList'
import ShowCard from './components/ShowCard/ShowCard'

const page = () => {
  return (
    <main className="h-screen">
      <div className="mx-10 mt-20  flex items-start justify-between">
        <ShowCard />
        <CardList />
      </div>
    </main>
  )
}

export default page
