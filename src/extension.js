const vscode = require("vscode");

const runCommand = require("./commands/run");

// This method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    console.log('Congratulations, your extension "django-commands" is now active!');

    let runCommandDisposable = vscode.commands.registerCommand("djangoCommands.run", () => {
        runCommand.execute();
    });

    context.subscriptions.push(runCommandDisposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
    activate,
    deactivate
};
