/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import fs from 'fs'
import path from 'path'

interface getFilesFromFolderOptions {
  extensions?: string[]
}

const defaultOptions: getFilesFromFolderOptions = {
  extensions: ['.ts', '.js'],
}

interface CustomFile extends path.ParsedPath {
  path: string
}

function getFilesFromFolder(
  folderPath: fs.PathLike,
  options = defaultOptions,
) {
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
  } catch (error: any) {
    console.log(error.message)
  }

  
  return files.map((file) => {
    const fullPath = path.join(folderPath.toString(), file)
    const customFile = path.parse(fullPath) as CustomFile
    customFile.path = path.join(customFile.dir, customFile.base)
    return customFile
  })
}

export default getFilesFromFolder
