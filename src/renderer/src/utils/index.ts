import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(args))
}

const dateFormatter = new Intl.DateTimeFormat(navigator.language, {
  dateStyle: 'short',
  timeStyle: 'short',
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
})

export const formatDate = (date: number) => dateFormatter.format(date)
