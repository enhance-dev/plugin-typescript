const { copyFileSync, mkdirSync, statSync } = require('fs')
const { join, normalize, sep } = require('path')
const { globSync } = require('glob')

const SRC_DIR = 'ts'
const DEST_DIR = 'app'

function copyAllFiles () {
  const files = [ 'ts', ...globSync('ts/**/*', { 'ignore': [ 'ts/**/*.mts', 'ts/**/*.ts', 'ts/**/*.tsx' ] }) ]
  files.forEach((srcPath) => {
    copyOneFile(srcPath)
  })
}

function copyOneFile (srcPath) {
  const cwd = process.cwd()
  const src = srcPath.startsWith(sep) ? normalize(srcPath) : join(cwd, srcPath)
  const destPath = src.replace(join(cwd, SRC_DIR), join(cwd, DEST_DIR))
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
