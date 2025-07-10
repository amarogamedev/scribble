import { ActionButton, ActionButtonProps } from '@/components'
import { LuTrash } from 'react-icons/lu'

export const DeleteNoteButton = ({ ...props }: ActionButtonProps) => {
  return (
    <ActionButton {...props}>
      <LuTrash className={'w-4 h-4 text-neutral-300'} />
    </ActionButton>
  )
}
