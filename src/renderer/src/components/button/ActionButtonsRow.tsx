import { ActionButton } from '@/components'
import { ComponentProps } from 'react'
import { LuGithub, LuGlobe, LuPencil, LuTrash } from 'react-icons/lu'
import { createEmptyNoteAtom, deleteNoteAtom } from '@/store'
import { useSetAtom } from 'jotai'

export const ActionButtonsRow = ({ ...props }: ComponentProps<'div'>) => {
  const createEmptyNote = useSetAtom(createEmptyNoteAtom)
  const deleteNote = useSetAtom(deleteNoteAtom)

  return (
    <div {...props}>
      <ActionButton className={'w-full'} onClick={createEmptyNote}>
        <LuPencil />
      </ActionButton>
      <ActionButton className={'w-full'} onClick={deleteNote}>
        <LuTrash />
      </ActionButton>
      <ActionButton
        className={'w-full'}
        onClick={() => window.open('https://github.com/amarogamedev/scribble', '_blank')}
      >
        <LuGithub />
      </ActionButton>
      <ActionButton
        className="w-full"
        onClick={() => window.open('https://www.linkedin.com/in/luisfellipeamaro/', '_blank')}
      >
        <LuGlobe />
      </ActionButton>
    </div>
  )
}
