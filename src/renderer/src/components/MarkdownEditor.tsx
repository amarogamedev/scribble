import {
  MDXEditor,
  SandpackConfig,
  codeBlockPlugin,
  codeMirrorPlugin,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  sandpackPlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  ConditionalContents,
  ChangeCodeMirrorLanguage,
  ShowSandpackInfo,
  InsertCodeBlock,
  InsertSandpack
} from '@mdxeditor/editor'
import { useMarkdownEditor } from '@/hooks/useMarkdownEditor'

const simpleSandpackConfig: SandpackConfig = {
  defaultPreset: 'react',
  presets: [
    {
      label: 'React',
      name: 'react',
      meta: 'live react',
      sandpackTemplate: 'react',
      sandpackTheme: 'light',
      snippetFileName: '/App.js',
      snippetLanguage: 'jsx'
    }
  ]
}

export const MarkdownEditor = () => {
  const { selectedNote, editorRef, handleAutoSaving, handleBlur } = useMarkdownEditor()

  if (!selectedNote) return null

  return (
    <MDXEditor
      ref={editorRef}
      key={selectedNote.title}
      markdown={selectedNote.content}
      onChange={handleAutoSaving}
      onBlur={handleBlur}
      contentEditableClassName={
        'outline-none min-h-screen max-w-none text-sm px-6 py-4 caret-white prose prose-invert'
      }
      plugins={[
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        headingsPlugin(),
        markdownShortcutPlugin()
      ]}
    />
  )
}
