import { DeleteNoteButton, NewNoteButton, SourceCodeButton } from '@/components'
import { ComponentProps } from 'react'

export const ActionButtonsRow = ({ ...props}: ComponentProps<'div'>) => {
  return (
    <div {...props}>
      <NewNoteButton/>
      <DeleteNoteButton/>
      <SourceCodeButton/>
    </div>
  )
}
