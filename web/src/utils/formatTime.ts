import { format } from 'date-fns';

// ----------------------------------------------------------------------

export function fDate(date: Date | string | number) {
  return format(new Date(date), 'dd MMMM yyyy');
}

// export function fDateTime(date) {
//   return format(new Date(date), 'dd MMM yyyy HH:mm');
// }

// export function fDateTimeSuffix(date) {
//   return format(new Date(date), 'dd/MM/yyyy hh:mm p');
// }

// export function fToNow(date) {
//   return formatDistanceToNow(new Date(date), {
//     addSuffix: true
//   });
// }

// https://stackoverflow.com/a/31563586
export function parseDashDateTime(dateAsString: string) {
  return new Date(dateAsString.replace(/-/g, '/'));
}
