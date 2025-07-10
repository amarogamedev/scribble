import { ActionButton, ActionButtonProps } from '@/components'
import { LuPencil } from 'react-icons/lu'

export const NewNoteButton = ({ ...props }: ActionButtonProps) => {
  return (
    <ActionButton {...props}>
      <LuPencil className={'w-4 h-4 text-neutral-300'} />
    </ActionButton>
  )
}
