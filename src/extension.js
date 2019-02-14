const vscode = require("vscode");
const cp = require("child_process");

const runCommand = require("./commands/run");
const historyCommand = require("./commands/history");

const { CONFIGURATION_NAMESPACE, HISTORY_FILE_PATH_PROPERTY, SHELL_HISTORY_FILE_MAP } = require("./constants");

// This method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    console.log('Congratulations, your extension "django-commands" is now active!');

    setHistoryFilePath();

    let runCommandDisposable = vscode.commands.registerCommand("djangoCommands.run", () => {
        runCommand.execute();
    });

    let historyCommandDisposable = vscode.commands.registerCommand("djangoCommands.history", () => {
        historyCommand.execute();
    });

    context.subscriptions.push(runCommandDisposable);
    context.subscriptions.push(historyCommandDisposable);
}

/**
 * Retrieves the default shell of the system and the home directory of the current user
 * to be able to generate the shell history file path. The history file is used to list
 * all previously executed Django commands, also outside VS Code.
 *
 * TODO: find a way to retrieve the history using a more dynamic strategy. Ex:
 * dynamically getting the default shell and run 'history' command. This strategy was
 * considered, but not working on ZSH, only on Bash. Other shells were not tested yet.
 *
 */
function setHistoryFilePath() {
    cp.exec("echo $SHELL", (err, stdout) => {
        const systemShell = stdout.replace("\n", "").trim();

        cp.exec("cd ~ && pwd", (err, stdout) => {
            const homeDirectory = stdout.replace("\n", "").trim();

            let historyFileName = null;
            for (let shell in SHELL_HISTORY_FILE_MAP) {
                if (systemShell.includes(shell)) {
                    historyFileName = SHELL_HISTORY_FILE_MAP[shell];
                    break;
                }
            }
            if (historyFileName === null) historyFileName = ".bash_history";

            const historyFilePath = `${homeDirectory}/${historyFileName}`;

            vscode.workspace
                .getConfiguration(CONFIGURATION_NAMESPACE)
                .update(HISTORY_FILE_PATH_PROPERTY, historyFilePath);
        });
    });
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
    activate,
    deactivate
};
