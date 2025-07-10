import { GetNotes, ReadNote, WriteNote } from '@shared/types'

declare global {
  interface Window {
    context: {
      getNotes: GetNotes
      readNote: ReadNote
      writeNote: WriteNote
    }
  }
}
