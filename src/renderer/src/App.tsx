import { Content, RootLayout, Sidebar, ActionButtonsRow } from '@/components'

function App() {
  return (
    <RootLayout>
      <Sidebar className={'p-2'}>
        <ActionButtonsRow className={'flex gap-2'} />
      </Sidebar>
      <Content className={'border-l bg-neutral-900 border-l-black'}></Content>
    </RootLayout>
  )
}

export default App
