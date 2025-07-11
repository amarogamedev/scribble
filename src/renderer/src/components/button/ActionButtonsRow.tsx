import { ActionButton } from '@/components'
import { ComponentProps } from 'react'
import { createEmptyNoteAtom, deleteNoteAtom } from '@/store'
import { useSetAtom } from 'jotai'
import { PiGithubLogo, PiLinkedinLogo, PiNotePencil, PiTrash } from 'react-icons/pi'

export const ActionButtonsRow = ({ ...props }: ComponentProps<'div'>) => {
  const createEmptyNote = useSetAtom(createEmptyNoteAtom)
  const deleteNote = useSetAtom(deleteNoteAtom)

  return (
    <div {...props}>
      <ActionButton className={'w-full'} onClick={createEmptyNote}>
        <PiNotePencil />
      </ActionButton>
      <ActionButton className={'w-full'} onClick={deleteNote}>
        <PiTrash />
      </ActionButton>
      <ActionButton
        className={'w-full'}
        onClick={() => window.open('https://github.com/amarogamedev/scribble', '_blank')}
      >
        <PiGithubLogo />
      </ActionButton>
      <ActionButton
        className="w-full"
        onClick={() => window.open('https://www.linkedin.com/in/luisfellipeamaro/', '_blank')}
      >
        <PiLinkedinLogo />
      </ActionButton>
    </div>
  )
}
