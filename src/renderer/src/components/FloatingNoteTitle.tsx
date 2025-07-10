import { twMerge } from 'tailwind-merge'
import { ComponentProps } from 'react'
import { useAtomValue } from 'jotai'
import { selectedNoteAtom } from '@/store'

export const FloatingNoteTitle = ({ className, ...props }: ComponentProps<'div'>) => {
  const selectedNote = useAtomValue(selectedNoteAtom)

  if (!selectedNote) return null

  return (
    <div className={twMerge('flex justify-center', className)} {...props}>
      <span className={'text-sm text-neutral-400'}>{selectedNote.title}</span>
    </div>
  )
}
