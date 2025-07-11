import { homedir } from 'os'
import { ensureDir, readdir, readFile, remove, stat, writeFile } from 'fs-extra'
import { appDirectoryName, fileEncoding } from '@shared/constants'
import { NoteInfo } from '@shared/models'
import { CreateNote, DeleteNote, GetNotes, ReadNote, WriteNote } from '@shared/types'
import { dialog } from 'electron'
import * as path from 'node:path'
import { isEmpty } from 'lodash'
import welcome from '../../../resources/welcome.md?asset'

export const getRootDir = () => {
  return `${homedir()}/${appDirectoryName}`
}

export const getNotes: GetNotes = async () => {
  const rootDir = getRootDir()
  await ensureDir(rootDir)
  const notesFileNames = await readdir(rootDir, { encoding: fileEncoding, withFileTypes: false })
  const notes = notesFileNames.filter((fileName) => fileName.endsWith('.md'))

  if (isEmpty(notes)) {
    const content = await readFile(welcome, fileEncoding)
    await writeFile(`${rootDir}/welcome.md`, content, fileEncoding)
    notes.push('welcome.md')
  }

  return Promise.all(notes.map(getNoteInfoFromFilename))
}

export const getNoteInfoFromFilename = async (fileName: string): Promise<NoteInfo> => {
  const noteInfo = await stat(`${getRootDir()}/${fileName}`)
  return {
    title: fileName.replace(/\.md$/, ''),
    lastEditTime: noteInfo.mtimeMs
  }
}

export const readNote: ReadNote = async (fileName) => {
  const rootDir = getRootDir()
  return readFile(`${rootDir}/${fileName}.md`, fileEncoding)
}

export const writeNote: WriteNote = async (fileName, content) => {
  const rootDir = getRootDir()
  return writeFile(`${rootDir}/${fileName}.md`, content, fileEncoding)
}

export const createNote: CreateNote = async () => {
  const rootDir = getRootDir()
  await ensureDir(rootDir)

  const { filePath, canceled } = await dialog.showSaveDialog({
    title: 'new note',
    defaultPath: `${rootDir}/untitled.md`,
    buttonLabel: 'Create',
    properties: ['showOverwriteConfirmation'],
    showsTagField: false,
    filters: [{ name: 'Markdown', extensions: ['md'] }]
  })

  if (canceled || !filePath) {
    return false
  }

  const { name: filename, dir: parentDir } = path.parse(filePath)

  if (parentDir != rootDir) {
    await dialog.showMessageBox({
      type: 'error',
      title: 'creation failed!',
      message: `all notes must be saved under ${rootDir}`
    })
    return false
  }

  await writeFile(filePath, '', fileEncoding)
  return filename
}

export const deleteNote: DeleteNote = async (filename) => {
  const rootDir = getRootDir()
  const { response } = await dialog.showMessageBox({
    type: 'warning',
    title: 'delete note',
    message: `are you sure you want to delete ${filename}?`,
    buttons: ['delete', 'cancel'],
    defaultId: 1,
    cancelId: 1
  })

  if (response === 1) return false

  await remove(`${rootDir}/${filename}.md`)
  return true
}
