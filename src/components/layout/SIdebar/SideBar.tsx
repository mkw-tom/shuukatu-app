'use client'
import useDarkMode from '@/lib/darkmode/useDarkMode'
import { Addchart, Business, Logout, Menu, MenuBook } from '@mui/icons-material'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Link from 'next/link'
import { useState } from 'react'

const SideBar = () => {
  const [open, setOpne] = useState<boolean>(false)
  const [theme] = useDarkMode()

  const sideList = [
    { icon: <Business />, text: '企業管理', link: '/' },
    { icon: <MenuBook />, text: 'ES管理', link: '/' },
    { icon: <Addchart />, text: 'チャート', link: '/' },
  ]

  return (
    <div className="block  md:hidden">
      <button onClick={() => setOpne(true)}>
        <Menu className="text-blue-600" />
      </button>
      <Drawer open={open === true} onClose={() => setOpne(false)}>
        <Box
          role="presentation"
          className="border-t-4 border-t-blue-600  dark:bg-gray-900"
          sx={{
            width: 250,
            backgroundColor: `${theme === 'dark' ? '#111827' : 'white'}`,
            height: '100%',
          }}
        >
          <List>
            {sideList.map((li, index) => (
              <Link href={li.link} key={index}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon className="text-blue-600 dark:text-blue-400">
                      {li.icon}
                    </ListItemIcon>
                    <ListItemText
                      className="font-bold text-blue-600 dark:text-blue-400"
                      primary={li.text}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
          <List className=" dark:bg-gray-900">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon className="text-blue-600 dark:text-blue-400">
                  <Logout />
                </ListItemIcon>
                <ListItemText
                  className="font-bold text-blue-600 dark:text-blue-400"
                  primary="ログアウト"
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </div>
  )
}

export default SideBar
