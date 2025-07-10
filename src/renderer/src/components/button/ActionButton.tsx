import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export type ActionButtonProps = ComponentProps<'button'>

export const ActionButton = ({ className, children, ...props }: ActionButtonProps) => {
  return (
    <button
      className={twMerge(
        'px-2 py-1 rounded-md border border-black bg-neutral-700 hover:bg-neutral-600 transition-colors duration-100',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
