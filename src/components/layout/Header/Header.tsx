import Image from 'next/image'
import SideBar from '../SIdebar/SideBar'
import DarkModeButton from './DarkModeButton'
import Navigation from './Navigation'
import ProfileButton from './ProfileButton'

const Header = () => {
  return (
    <div className="h-16 w-full border-b-2 border-t-4 border-t-info dark:border-b-gray-500">
      <div className="mx-5 flex h-16 items-center justify-between">
        <SideBar />
        <h1 className="flex items-center">
          <Image
            src="/file.png"
            width={50}
            height={50}
            alt="ユーザー画像"
            className="mr-2 rounded-md"
          />
          <p className="mr-1 bg-gradient-to-r from-info to-orange-400 bg-clip-text text-2xl font-bold  tracking-widest text-transparent">
            Entrily
          </p>
        </h1>
        <div className="flex items-center gap-16">
          <Navigation />
          <div className="flex items-center gap-5 border-l-2 pl-5 dark:border-l-gray-500">
            <DarkModeButton />
            <ProfileButton />
          </div>
          {/* <Button
            variant='outlined'
            className='text-blue-600 font-bold border-2 border-blue-500   dark:bg-blue-500 '
            endIcon={<Login />}
          >
            Login
          </Button> */}
        </div>
      </div>
    </div>
  )
}

export default Header
