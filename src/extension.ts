// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { translate, LanguageEnum } from './mirai-translator';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "mirai-translator" is now active!');

	const commandMap = new Map<string, (...args: any[]) => any>();

	commandMap.set('extension.translate', () => {
		const textEditor = vscode.window.activeTextEditor;
		const selectedText = textEditor?.document.getText(textEditor?.selection);
		translate(selectedText, LanguageEnum.ENGLISH, LanguageEnum.JAPANESE);
	});

	commandMap.set('extension.translateJapanese2English', () => {
		const textEditor = vscode.window.activeTextEditor;
		const selectedText = textEditor?.document.getText(textEditor?.selection);
		translate(selectedText, LanguageEnum.JAPANESE, LanguageEnum.ENGLISH);
	});

	commandMap.forEach((commandHandler, commandId) => {
		let disposable = vscode.commands.registerCommand(commandId, commandHandler);
		context.subscriptions.push(disposable);
	});
}

// this method is called when your extension is deactivated
export function deactivate() { }
