import contextBridge = Electron.contextBridge;

if(!process.contextIsolated) {
  throw new Error('preload is not context isolated')
}

try {
  contextBridge.exposeInMainWorld('context', {
    //TODO
  })
} catch (error) {
  console.error(error)
}
