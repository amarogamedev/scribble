import {
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  quotePlugin
} from '@mdxeditor/editor'
import { useMarkdownEditor } from '@/hooks/useMarkdownEditor'

export const MarkdownEditor = () => {
  const { selectedNote } = useMarkdownEditor()

  if (!selectedNote) return null

  return (
    <MDXEditor
      key={selectedNote.title}
      markdown={selectedNote.content}
      plugins={[headingsPlugin(), listsPlugin(), quotePlugin(), markdownShortcutPlugin()]}
      contentEditableClassName={
        'outline-none min-h-screen max-w-none text-sm px-6 py-4 caret-white prose prose-invert'
      }
    />
  )
}
