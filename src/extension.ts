import { commands, window, ViewColumn, type ExtensionContext } from 'vscode'
import { readFileSync } from 'fs'

export function activate(context: ExtensionContext) {
  let disposable = commands.registerCommand('simpleexplorer.view', () => {
    const panel = window.createWebviewPanel(
      'myWebview', 'Simple Explorer',
      ViewColumn.One,
      { enableScripts: true }
    )

    panel.webview.html = readFileSync('./webview/index.html', 'utf8')
  })

  context.subscriptions.push(disposable)
}

export function deactivate() {
  // deactivate server
}
