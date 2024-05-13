const { copyFileSync, mkdirSync, statSync } = require('fs')
const { globSync } = require('glob')

const SRC_DIR = 'ts'
const DEST_DIR = 'app'

function copyAllFiles () {
  const files = globSync('ts/**/*', { 'ignore': [ 'ts/**/*.mts', 'ts/**/*.ts', 'ts/**/*.tsx' ] })
  files.forEach((srcPath) => {
    copyOneFile(srcPath)
  })
}

function copyOneFile (srcPath) {
  const destPath = srcPath.replace(SRC_DIR, DEST_DIR)
  const stats = statSync(srcPath)
  if (stats.isDirectory()) {
    mkdirSync(destPath, { recursive: true })
  }
  else {
    copyFileSync(srcPath, destPath)
  }
}

exports.copyProject = copyAllFiles
exports.copyFile = copyOneFile
