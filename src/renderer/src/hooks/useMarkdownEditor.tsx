import { useAtomValue, useSetAtom } from 'jotai'
import { saveNoteAtom, selectedNoteAtom } from '@/store'
import { useRef } from 'react'
import { MDXEditorMethods } from '@mdxeditor/editor'
import { NoteContent } from '@shared/models'
import { throttle } from 'lodash'
import { autosavingTime } from '@shared/constants'

export const useMarkdownEditor = () => {
  const selectedNote = useAtomValue(selectedNoteAtom)
  const saveNote = useSetAtom(saveNoteAtom)
  const editorRef = useRef<MDXEditorMethods>(null)

  const handleAutoSaving = throttle(
    async (content: NoteContent) => {
      if (!selectedNote) return
      await saveNote(content)
    },
    autosavingTime,
    { leading: false, trailing: true }
  )

  return {
    selectedNote,
    editorRef,
    handleAutoSaving
  }
}
