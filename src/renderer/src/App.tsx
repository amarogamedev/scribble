import {
  ActionButtonsRow,
  Content,
  FloatingNoteTitle,
  MarkdownEditor,
  NotePreviewList,
  RootLayout,
  Sidebar
} from '@/components'
import { useRef } from 'react'

function App() {
  const contentContainerRef = useRef<HTMLDivElement>(null)

  const resetScroll = () => {
    contentContainerRef.current?.scrollTo(0, 0)
  }

  return (
    <RootLayout>
      <Sidebar className={'p-2'}>
        <ActionButtonsRow className={'flex gap-2'} />
        <NotePreviewList className={'space-y-2 mt-2'} onSelect={resetScroll} />
      </Sidebar>
      <Content ref={contentContainerRef} className={'border-l bg-neutral-900 border-l-black'}>
        <FloatingNoteTitle className={'pt-2'} />
        <MarkdownEditor />
      </Content>
    </RootLayout>
  )
}

export default App
