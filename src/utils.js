import { copyFileSync, mkdirSync, statSync } from 'fs'
import { globSync } from 'glob'

const SRC_DIR = 'ts'
const DEST_DIR = 'app'

function copyProject () {
  const files = globSync('ts/**/*', { 'ignore': [ 'ts/**/*.mts', 'ts/**/*.ts', 'ts/**/*.tsx' ] })
  files.forEach((srcPath) => {
    copyFile(srcPath)
  })
}

function copyFile (srcPath) {
  const destPath = srcPath.replace(SRC_DIR, DEST_DIR)
  const stats = statSync(srcPath)
  if (stats.isDirectory()) {
    mkdirSync(destPath, { recursive: true })
  }
  else {
    copyFileSync(srcPath, destPath)
  }
}

export { copyProject, copyFile }
