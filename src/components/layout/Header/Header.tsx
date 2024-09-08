import Image from 'next/image'
import SideBar from '../SIdebar/SideBar'
import DarkModeButton from './DarkModeButton'
import Navigation from './Navigation'
import ProfileButton from './ProfileButton'

const Header = () => {
  return (
    <div className="h-16 w-full border-b-2 border-t-4 border-t-primary dark:border-b-gray-500">
      <div className="mx-5 flex h-16 items-center justify-between">
        <SideBar />
        <h1 className="flex items-center">
          <Image src="/file.png" width={55} height={55} alt="ユーザー画像" />
          <p className="mr-1 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-xl  tracking-widest text-transparent">
            Entrix
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
