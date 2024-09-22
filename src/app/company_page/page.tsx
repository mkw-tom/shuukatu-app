import CardList from './components/CardList.tsx/CardList'
import ShowCard from './components/ShowCard/ShowCard'
import { FormInputReducerContextProvider } from './context/useFormInputReducer'
import { PostContextProvider } from './context/usePost'

const page = async () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks

  const getDatas = async () => {
    const userId = '66b894e2aa71df7091ecc261'
    const url = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_DEV_API_URL
    const res = await fetch(`${url}/api/posts?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    })

    if (!res.ok) {
      return 'failed fetch'
    }

    const response = await res.json() // JSONとしてレスポンスを処理
    return response
  }

  const postsData = (await getDatas()) as PostType[]

  return (
    <main className="h-screen ">
      <div className="mx-10 mt-10 items-start justify-between lg:flex">
        <FormInputReducerContextProvider>
          <PostContextProvider>
            <div className="hidden  w-5/12 lg:block">
              <ShowCard />
            </div>
            <CardList postsData={postsData} />
          </PostContextProvider>
        </FormInputReducerContextProvider>
      </div>
    </main>
  )
}

export default page
