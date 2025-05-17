import { createServer, type ServerResponse, type IncomingMessage, type Server } from 'http'
import { workspace } from 'vscode'

const SERVER_PORT = 2222
const STATUS_OK = 200

export function openServer(): Server {
  let server = createServer(listener)
  server.listen('localhost', SERVER_PORT)
  return server
}

function listener(req: IncomingMessage, res: ServerResponse) {
  if (req.url === undefined) {
    return
  }
  let pathname = new URL(req.url).pathname
  res.writeHead(STATUS_OK, { 'Content-Type': 'application/json' })
  switch (pathname.split('/')[1] ?? '') {
    case 'init':
      try {
        // get workspace folder
        let workspaceFolders = workspace.workspaceFolders ?? []
        let workspaceFolder = workspaceFolders[0]
        if (workspaceFolder === undefined) {
          res.write('{"error":"cannot get workspace folder"}')
          break
        }
        let response = {
          workspaceFolder: workspaceFolder.uri.fsPath,
        }
        res.write(JSON.stringify(response))
      } catch (err) {
        res.write(`{"error":"${err}"}`)
      }
      break
    case 'read':
      try {
        //
      } catch (err) {
        res.write(`{"error":"${err}"}`)
      }
      break
    case 'write':
      try {
        //
      } catch (err) {
        res.write(`{"error":"${err}"}`)
      }
      break
    default:
      console.error(`Invalid request: ${req.method} ${pathname}`)
      res.write('{"error":"invalid request"}')
      break
  }
  res.end()
}
