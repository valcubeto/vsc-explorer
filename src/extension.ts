import { readFileSync } from 'fs'
import {
  commands, window,
  ViewColumn,
  type ExtensionContext
} from 'vscode'
import { openServer, SERVER_PORT } from './server'

let server = openServer()

export function activate(context: ExtensionContext) {
  let disposable = commands.registerCommand('simpleexplorer.view', () => {
    const panel = window.createWebviewPanel(
      'myWebview', 'Simple Explorer',
      ViewColumn.One,
      { enableScripts: true }
    )

    panel.webview.html = readFileSync('./webview/main/index.html', 'utf8')
  })

  server.listen('localhost', SERVER_PORT)

  context.subscriptions.push(disposable)
}

export function deactivate() {
  server.close()
  server.unref()
}
