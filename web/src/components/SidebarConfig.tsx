import { Icon, IconifyIcon } from "@iconify/react";
import peopleFill from "@iconify/icons-eva/people-fill";
import bookmarkFill from "@iconify/icons-eva/bookmark-fill";
import micFill from "@iconify/icons-eva/mic-fill";
import messageSquareFill from "@iconify/icons-eva/message-square-fill";
import bookOpenFill from "@iconify/icons-eva/book-open-fill";
import calendarFill from "@iconify/icons-eva/calendar-fill";
import shoppingCartFill from "@iconify/icons-eva/shopping-cart-fill";
import awardFill from "@iconify/icons-eva/award-fill";
import heartFill from "@iconify/icons-eva/heart-fill";


// ----------------------------------------------------------------------

export const getIcon = (name: IconifyIcon) => (
  <Icon icon={name} width={22} height={22} />
);

const sidebarConfig = [
  {
    title: "events",
    path: "/events",
    icon: getIcon(calendarFill),
  },
  {
    title: "Blog",
    path: "/blog",
    icon: getIcon(messageSquareFill),
  },
  {
    title: "projects",
    path: "/projects",
    icon: getIcon(peopleFill),
  },
  {
    title: "courses",
    path: "/courses",
    icon: getIcon(bookOpenFill),
  },
  {
    title: "tutorials",
    path: "/tutorials",
    icon: getIcon(bookmarkFill),
  },
  {
    title: "talks",
    path: "/talks",
    icon: getIcon(micFill),
  },
  {
    title: "merch",
    path: "/merch",
    icon: getIcon(shoppingCartFill),
  },
  // {
  //   title: "elections",
  //   path: "/elections",
  //   icon: getIcon(awardFill),
  // },
];

export default sidebarConfig;
