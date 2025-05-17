"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode_1 = require("vscode");
const fs_1 = require("fs");
function activate(context) {
    let disposable = vscode_1.commands.registerCommand('simpleexplorer.view', () => {
        const panel = vscode_1.window.createWebviewPanel('myWebview', 'Simple Explorer', vscode_1.ViewColumn.One, { enableScripts: true });
        panel.webview.html = (0, fs_1.readFileSync)('./webview/index.html', 'utf8');
    });
    context.subscriptions.push(disposable);
}
function deactivate() {
    // deactivate server
}
//# sourceMappingURL=extension.js.map