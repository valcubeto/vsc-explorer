import { createServer, type ServerResponse, type IncomingMessage, type Server } from 'http'
import { workspace } from 'vscode'

export const SERVER_PORT = 2222
const STATUS_OK = 200

export function openServer(): Server {
  let server = createServer(listener)
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
      init(res)
      break
    case 'dispose':
      dispose(res)
      break
    case 'read':
      read(req, res)
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

function init(res: ServerResponse) {
  try {
    // get workspace folder
    let workspaceFolders = workspace.workspaceFolders ?? []
    let workspaceFolder = workspaceFolders[0]
    if (workspaceFolder === undefined) {
      res.write('{"error":"cannot get workspace folder"}')
      return
    }
    let response = {
      workspaceFolder: workspaceFolder.uri.fsPath,
    }
    res.write(JSON.stringify(response))
  } catch (err) {
    res.write(`{"error":"${err}"}`)
  }
}

function dispose(res: ServerResponse) {
  //
}

function read(req: IncomingMessage, res: ServerResponse) {
  req.read()
  try {
    //
  } catch (err) {
    res.write(`{"error":"${err}"}`)
  }
}

interface WriteRequest {
  action: 'create' | 'delete' | 'rename' | 'move' | 'copy'
}

function write(req: IncomingMessage, res: ServerResponse) {
  try {
    //
  } catch (err) {
    res.write(`{"error":"${err}"}`)
  }
}

function parseRequest(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, _reject) => {
    let data = ''
    req.on('readable', () => {
      let chunk
      while (true && (chunk = req.read())) {
        data += chunk
      }
    })
    req.on('end', () => {
      resolve(JSON.parse(data))
    })
  })
}
