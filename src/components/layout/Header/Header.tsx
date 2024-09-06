import { Addchart, Business, MenuBook } from '@mui/icons-material'
import Button from '@mui/material/Button'
import Image from 'next/image'
import Link from 'next/link'
import DarkModeButton from './DarkModeButton'
import ProfileButton from './ProfileButton'

const Header = () => {
  return (
    <div className="h-16 w-full border-b-2 border-t-4 border-t-blue-600">
      <div className="mx-5 flex h-16 items-center justify-between">
        <h1 className="flex items-center">
          <Image src="/file.png" width={55} height={55} alt="ユーザー画像" />
          <p className="bg-gradient-to-r from-sky-500 to-orange-500 bg-clip-text text-lg font-bold text-transparent ">
            ENTRIX
          </p>
        </h1>
        <div className="flex items-center gap-16">
          <nav className="flex gap-5">
            <Link href="/">
              <Button className="font-bold dark:text-white" startIcon={<Business />}>
                企業管理
              </Button>
            </Link>
            <Link href="/">
              <Button className="font-bold dark:text-white" startIcon={<MenuBook />}>
                ES管理
              </Button>
            </Link>
            <Link href="/">
              <Button className="font-bold dark:text-white" startIcon={<Addchart />}>
                チャート
              </Button>
            </Link>
          </nav>
          <div className="flex items-center gap-5 border-l-2 pl-5">
            <DarkModeButton />
            <ProfileButton />
          </div>
          {/* <Button
            variant='outlined'
            className='text-blue-600 font-bold border-2 border-blue-500 dark:text-white  dark:bg-blue-500 '
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
