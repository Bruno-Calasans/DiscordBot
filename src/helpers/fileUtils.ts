import fs from 'fs'
import path from 'path'
import log from './log'

type GetFilesFromFolderOptions = {
  extensions?: string[]
}

export type CustomFile = path.ParsedPath & {
  path: string
}

const defaultOptions: GetFilesFromFolderOptions = {
  extensions: ['.ts', '.js'],
}

export default {
  getFolders(path: fs.PathLike) {
    const files = fs.readdirSync(path)
    const folders: string[] = []

    for (const file of files) {
      if (!file.match(/.\.+/gi)) folders.push(file)
    }
    return folders
  },

  createCustomFiles(dir: fs.PathLike, filePaths: string[]) {
    const files: CustomFile[] = []

    for (const filePath of filePaths) {
      const customFile = path.parse(filePath) as CustomFile
      customFile.path = path.join(customFile.dir, customFile.base)
      files.push(customFile)
    }

    return files
  },

  getFilesFromFolder(folderPath: fs.PathLike, options = defaultOptions) {
    let files: string[] = []

    try {
      files = fs.readdirSync(folderPath)
      const { extensions } = options

      if (extensions && extensions.length > 0) {
        files = files.filter((file) => {
          const fileExtension = path.extname(file)
          return extensions.includes(fileExtension)
        })
      }
    } catch (error: unknown) {
      log.error(error as string)
    }

    return this.createCustomFiles(folderPath, files)
  },

  getFiles(dirPath: string) {
    const filePaths = this.getFilesPath(dirPath)
    return this.createCustomFiles(dirPath, filePaths)
  },

  getFilesPath(dir: string, files: string[] = []) {
    const fileList = fs.readdirSync(dir)

    for (const file of fileList) {
      const name = `${dir}/${file}`
      if (fs.statSync(name).isDirectory()) {
        this.getFilesPath(name, files)
      } else {
        files.push(name as never)
      }
    }
    return files
  },
}
