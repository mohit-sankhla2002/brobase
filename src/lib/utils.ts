import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatAMPM(date: Date) {

  if (!date) {
    return;
  }

  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12;

  const stringMinutes: string = +minutes < 10 ? '0' + minutes.toString() : minutes.toString();

  var timeString = hours.toString() + ':' + stringMinutes + ' ' + ampm;
  return timeString;
}
