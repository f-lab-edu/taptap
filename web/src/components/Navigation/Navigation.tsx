import { List, ListItem } from '@chakra-ui/react'
import {
  ClockIcon,
  ChartBarIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline'
import { routes } from '@redwoodjs/router'
import React from 'react'
import { NavItem } from './NavItem'
import type { NavItemProps } from './NavItem'

const items: NavItemProps[] = [
  {
    title: 'Timer',
    icon: ClockIcon,
    to: 'home',
  },
  {
    title: 'Time Table',
    icon: CalendarIcon,
    to: 'records',
  },
  {
    title: 'Dashboard',
    icon: ChartBarIcon,
    to: 'categories',
  },
]

const Navigation = () => {
  return (
    <nav>
      <List spacing="1">
        {items.map((item) => (
          <ListItem key={item.title}>
            <NavItem
              icon={item.icon}
              title={item.title}
              to={routes[item.to]()}
            />
          </ListItem>
        ))}
      </List>
    </nav>
  )
}

export default Navigation
