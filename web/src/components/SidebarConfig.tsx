import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import micFill from '@iconify/icons-eva/mic-fill';
import messageSquareFill from '@iconify/icons-eva/message-square-fill';
import bookOpenFill from '@iconify/icons-eva/book-open-fill';
import calendarFill from '@iconify/icons-eva/calendar-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'events',
    path: '/events',
    icon: getIcon(calendarFill)
  },
  {
    title: 'Blog',
    path: '/blog',
    icon: getIcon(messageSquareFill)
  },
  {
    title: 'projects',
    path: '/projects',
    icon: getIcon(peopleFill)
  },
  {
    title: 'courses',
    path: '/courses',
    icon: getIcon(bookOpenFill)
  },
  {
    title: 'talks',
    path: '/talks',
    icon: getIcon(micFill)
  },
  {
    title: 'login',
    path: '/login',
    icon: getIcon(micFill)
  }
];

export default sidebarConfig;
