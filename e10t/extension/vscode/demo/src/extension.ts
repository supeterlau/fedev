// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "demo" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('demo.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from Demo!');
	});

	context.subscriptions.push(disposable);

	// vscode.commands.registerTextEditorCommand
	let cmdCallDisposable = vscode.commands.registerCommand('demo.cmdCall', () => {
		rename()
	})

	context.subscriptions.push(cmdCallDisposable)

	let menuCallDisposable = vscode.commands.registerCommand('demo.menuCall', () => {
		rename()
	})

	context.subscriptions.push(menuCallDisposable)
}

const rename = async () => {
	let fileName = vscode.window.activeTextEditor?.document.fileName
	console.log(fileName)
	let oldUri = vscode.window.activeTextEditor?.document.uri
	console.log(oldUri)
	try {
		// prompt
		let newFileName = await vscode.window.showInputBox({
			prompt: 'New File Name',
			// placeHolder: 'Anything Good?',
			// value: 'hahaha',
			// valueSelection: [0, 3]
		})
		if (newFileName !== undefined) {
			let dirName = path.dirname(fileName as string)
			let newUri = vscode.Uri.file(path.join(dirName, newFileName as string))
			// console.log(newUri)
			// rename
			let wse = new vscode.WorkspaceEdit()
			wse.renameFile(
				oldUri as vscode.Uri,
				newUri,
				{
					overwrite: false,
					ignoreIfExists: false
				}
			)
			await vscode.workspace.applyEdit(
				wse
			)
			// console.log('new uri')
			// oldUri = vscode.window.activeTextEditor?.document.uri
			// console.log(oldUri)
		}
	} catch (error) {
		showError(error)
	}
}

const showError = (error: Error) => {
	console.dir(error)
	vscode.window.showInformationMessage(error.message);
}

// this method is called when your extension is deactivated
export function deactivate() {}
