const vscode = require("vscode");

const listCommand = require("./list");
const runCommand = require("./run");

// This method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    console.log('Congratulations, your extension "django-commands" is now active!');

    let runCommandDisposable = vscode.commands.registerCommand("djangoCommands.run", () => {
        runCommand.execute();
    });

    let listCommandsDisposable = vscode.commands.registerCommand("djangoCommands.list", () => {
        listCommand.execute();
    });

    context.subscriptions.push(runCommandDisposable);
    context.subscriptions.push(listCommandsDisposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
    activate,
    deactivate
};
