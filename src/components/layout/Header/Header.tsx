import SideBar from '../SIdebar/SideBar'
import DarkModeButton from './DarkModeButton'
import HeaderStartButton from './HeaderStartButton'
import Logo from './Logo'
import Navigation from './Navigation'
import ProfileButton from './ProfileButton'

const Header = () => {
  return (
    <div className="absolute inset-x-0 top-0 h-16 w-full border-b-2 border-t-4 border-t-info bg-white dark:border-b-gray-500 dark:bg-gray-800">
      <div className="mx-5 flex h-16 items-center justify-between">
        <SideBar />
        <Logo />
        {/* <h1 className="flex items-center">
          <Image
            src="/file.png"
            width={50}
            height={50}
            alt="ユーザー画像"
            className="mr-2 rounded-md"
          />
          <p className="mr-1 bg-gradient-to-r from-info to-orange-400 bg-clip-text text-2xl font-bold  tracking-widest text-transparent">
            Entrix
          </p>
        </h1> */}
        <div className="flex items-center gap-16">
          <Navigation />
          <div className="flex items-center gap-5 border-l-2 pl-5 dark:border-l-gray-500">
            <DarkModeButton />
            <ProfileButton />
            <HeaderStartButton />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
