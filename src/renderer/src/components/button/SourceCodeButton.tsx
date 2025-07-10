import { ActionButton, ActionButtonProps } from '@/components'
import { LuGithub, LuPencil } from 'react-icons/lu'

export const SourceCodeButton = ({ ...props }: ActionButtonProps) => {
  return (
    <ActionButton {...props}>
      <LuGithub className={'w-4 h-4 text-neutral-300'} />
    </ActionButton>
  )
}
