const vscode = require("vscode");

const runCommand = require("./commands/run");
const historyCommand = require("./commands/history");

// This method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    console.log('Congratulations, your extension "django-commands" is now active!');

    let runCommandDisposable = vscode.commands.registerCommand("djangoCommands.run", () => {
        runCommand.execute(context);
    });

    let historyCommandDisposable = vscode.commands.registerCommand("djangoCommands.history", () => {
        historyCommand.execute(context);
    });

    context.subscriptions.push(runCommandDisposable);
    context.subscriptions.push(historyCommandDisposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
    activate,
    deactivate
};
