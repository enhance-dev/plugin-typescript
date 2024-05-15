import { updater } from '@architect/utils'
import { join } from 'path'
import { startWatcher } from './cli.js'
import { copyProject, copyFile } from './utils.js'

let watcherProcess
const update = updater('TypeScriptCompiler')

const deploy = {
  start: async () => {
    // copy initial project files
    copyProject()
  },
}

const sandbox = {
  start: async () => {
    // copy initial project files
    copyProject()
    // start tsc watcher
    update.start('Starting watcher...')
    watcherProcess = await startWatcher()
    update.done('Started watcher')
  },
  end: () => {
    update.start('Stopping watcher...')
    watcherProcess.kill()
    update.done('Stopped watcher')
  },
  watcher: async function (params) {
    let { filename, /* event, */ inventory } = params
    let tsDir = join(inventory.inv._project.cwd, 'ts')
    if (filename.startsWith(tsDir) && !filename.endsWith('.ts') && !filename.endsWith('.tsx') && !filename.endsWith('.mts')) {
      copyFile(filename)
      update.done(`${filename} updated`)
    }
  },
}

export { deploy, sandbox }
