import { atom } from 'jotai'
import { NoteContent, NoteInfo } from '@shared/models'
import { unwrap } from 'jotai/utils'

const loadNotes = async () => {
  const notes = await window.context.getNotes()
  return notes.sort((a, b) => b.lastEditTime - a.lastEditTime)
}

//region notes atom
const notesAtomAsync = atom<NoteInfo[] | Promise<NoteInfo[]>>(loadNotes())
export const notesAtom = unwrap(notesAtomAsync, (prev) => prev)
//endregion

//region selected notes atom
const selectedNoteAtomAsync = atom(async (get) => {
  const notes = get(notesAtom)
  const selectedNoteIndex = get(selectedNoteIndexAtom)

  if (selectedNoteIndex == null || !notes) {
    return null
  }

  const selectedNote = notes[selectedNoteIndex]
  const noteContent = await window.context.readNote(selectedNote.title)
  return {
    ...selectedNote,
    content: noteContent
  }
})

export const selectedNoteAtom = unwrap(
  selectedNoteAtomAsync,
  (prev) =>
    prev ?? {
      title: '',
      content: '',
      lastEditTime: Date.now()
    }
)
//endregion

//region selected note index atom
export const selectedNoteIndexAtom = atom<number | null>(null)
//endregion

//region create note atom
export const createEmptyNoteAtom = atom(null, async (get, set) => {
  const notes = get(notesAtom)
  if (!notes) return

  const title = await window.context.createNote()
  if (!title) return

  const newNote: NoteInfo = {
    title,
    lastEditTime: Date.now()
  }

  set(selectedNoteIndexAtom, 0)
  set(notesAtom, [newNote, ...notes.filter((note) => note.title !== newNote.title)])
})
//endregion

//region delete note atom
export const deleteNoteAtom = atom(null, async (get, set) => {
  const notes = get(notesAtom)
  const selectedNote = get(selectedNoteAtom)

  if (selectedNote == null || !notes) return

  const success = await window.context.deleteNote(selectedNote.title)

  if (!success) return

  set(selectedNoteIndexAtom, null)
  set(
    notesAtom,
    notes.filter((note) => note.title !== selectedNote.title)
  )
})
//endregion

//region save note atom
export const saveNoteAtom = atom(null, async (get, set, newContent: NoteContent) => {
  const notes = get(notesAtom)
  const selectedNote = get(selectedNoteAtom)

  if (!selectedNote || !notes) return

  await window.context.writeNote(selectedNote.title, newContent)
  set(
    notesAtom,
    notes.map((note) => {
      if (note.title === selectedNote.title) {
        return {
          ...note,
          lastEditTime: Date.now()
        }
      }
      return note
    })
  )
})
//endregion
