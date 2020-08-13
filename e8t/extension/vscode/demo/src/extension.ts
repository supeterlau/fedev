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
		// epandDate()
	})

	context.subscriptions.push(menuCallDisposable)

	// context.subscriptions.push(vscode.languages.registerCompletionItemProvider('*', {
	//   provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken) {
	//       return [new vscode.CompletionItem("Hello World")];
	//   }
	// 	},'.'));

	const datetimeProvider = vscode.languages.registerCompletionItemProvider(
		{
			// scheme: 'file',
			// language: '*',
			pattern: '**'
		},
		// '*',
		{
			provideCompletionItems(
				document: vscode.TextDocument,
				position: vscode.Position,
				token: vscode.CancellationToken
			) {
				const completionItem = new vscode.CompletionItem('title date', vscode.CompletionItemKind.Text);
				let insertText = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[0];
				completionItem.insertText = `### ${insertText}`
				return [completionItem];
			}
		}
	);
	context.subscriptions.push(datetimeProvider)

	const provider1 = vscode.languages.registerCompletionItemProvider(
		'cpp',
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {

				let linePrefix = document.lineAt(position).text.substr(0, position.character);
				if (!linePrefix.endsWith('a')) {
					return undefined;
				}

				return [
					new vscode.CompletionItem('add', vscode.CompletionItemKind.Function),
				];
			}
		},
		'.' // triggered whenever a 'a' is being typed
	);
	context.subscriptions.push(provider1)

}

const epandDate = async () => {

	let currentEditor = vscode.window.activeTextEditor
	let currentDoc = currentEditor?.document
	let cursorPos
	if (currentEditor?.selection.isEmpty) {
		// the Position object gives you the line and character where the cursor is
		cursorPos = currentEditor.selection.active;
		console.log(cursorPos)
	}
	cursorPos = currentEditor?.selection.active;


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
export function deactivate() { }
