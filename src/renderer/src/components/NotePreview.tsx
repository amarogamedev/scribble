import { NoteInfo } from '@shared/models'
import { ComponentProps } from 'react'
import { cn, formatDate } from '@/utils'

export type NotePreviewProps = NoteInfo & {
  isActive?: boolean
} & ComponentProps<'div'>

export const NotePreview = ({
  title,
  lastEditTime,
  isActive = false,
  className,
  ...props
}: NotePreviewProps) => {
  return (
    <div
      className={cn(
        'cursor-pointer border border-black px-2 py-2 rounded-md transition-colors duration-75 hover:bg-neutral-600',
        {
          'bg-neutral-700': isActive
        },
        className
      )}
      {...props}
    >
      <span className={'mb-1 font-bold truncate text-xs'}>{title}</span>
      <span className={'inline-block w-full text-xs font-light text-left text-neutral-400'}>
        {formatDate(lastEditTime)}
      </span>
    </div>
  )
}
