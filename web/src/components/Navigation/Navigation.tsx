import React, { memo } from 'react'

import { List, ListItem } from '@chakra-ui/react'
import {
  ClockIcon,
  ChartBarIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline'

import { routes } from '@redwoodjs/router'

import NavItem from './NavItem'
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
    to: 'home',
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

export default memo(Navigation)
