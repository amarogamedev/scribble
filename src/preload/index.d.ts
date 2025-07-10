import { GetNotes, ReadNote } from '@shared/types'

declare global {
  interface Window {
    context: {
      getNotes: GetNotes
      readNote: ReadNote
    }
  }
}
