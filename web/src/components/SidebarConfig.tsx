import { Icon, IconifyIcon } from '@iconify/react';
import peopleFill from '@iconify/icons-eva/people-fill';
import bookmarkFill from '@iconify/icons-eva/bookmark-fill';
import micFill from '@iconify/icons-eva/mic-fill';
import messageSquareFill from '@iconify/icons-eva/message-square-fill';
import bookOpenFill from '@iconify/icons-eva/book-open-fill';
import calendarFill from '@iconify/icons-eva/calendar-fill';

// ----------------------------------------------------------------------

const getIcon = (name: IconifyIcon) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
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
    title: 'tutorials',
    path: '/tutorials',
    icon: getIcon(bookmarkFill)
  },
  {
    title: 'talks',
    path: '/talks',
    icon: getIcon(micFill)
  },
];

export default sidebarConfig;
