const vscode = require("vscode");

const {
    CONFIGURATION_NAMESPACE,
    SHOW_TERMINAL_PROPERTY,
    TERMINAL_TITLE,
    HISTORY_MAX_LENGTH_PROPERTY,
    STATE_COMMANDS_KEY,
    MANAGE_FILE,
    SUCCESS_MSG
} = require("../constants");

/**
 * Runs the command in the integrated terminal of VS Code.
 *
 * Running inside integrated to make the output of the command available to debugging
 * or simply get the output if needed.
 *
 * @param {vscode.ExtensionContext} context
 * @param {string} manageFile the path of the manage.py file that will be used to execute the command
 * @param {string} fullCommand The Django command (with arguments)
 */
function runCommand(context, manageFile, fullCommand) {
    if (fullCommand === undefined || fullCommand === null || fullCommand === "") return;

    const pythonPath = vscode.workspace.getConfiguration("python").get("pythonPath");
    const command = `${pythonPath} ${manageFile} ${fullCommand}`.trim();

    let terminal = vscode.window.activeTerminal;
    if (terminal === undefined) terminal = vscode.window.createTerminal(TERMINAL_TITLE);
    terminal.sendText(command);

    saveCommand(context, fullCommand);

    const conf = vscode.workspace.getConfiguration(CONFIGURATION_NAMESPACE);
    if (conf.get(SHOW_TERMINAL_PROPERTY)) terminal.show();
}

/**
 * Saves the Django command executed in the workspace state of the extension.
 * Because we are using the workspace state, every workspace will have its own command
 * history.
 *
 * @param {vscode.ExtensionContext} context
 * @param {string} fullCommand
 */
function saveCommand(context, fullCommand) {
    // Getting the workspace state of the extension and needed configurations
    const extensionState = context.workspaceState;
    let executedCommands = extensionState.get(STATE_COMMANDS_KEY);

    const conf = vscode.workspace.getConfiguration(CONFIGURATION_NAMESPACE);
    const historyMaxLength = conf.get(HISTORY_MAX_LENGTH_PROPERTY);
    console.log(historyMaxLength);

    // Initializing the array of history on first command executed
    if (executedCommands === undefined) {
        executedCommands = [];
    }

    // Not saving the command if the previously executed command is the exact same
    if (executedCommands.length > 0 && executedCommands[0] === fullCommand) return;

    // Inserting the command at first index
    executedCommands.splice(0, 0, fullCommand);

    // If the number of commands exceed the history length configuration, delete
    // all commands that exceed that limit by keeping only the first X ones
    if (executedCommands.length > historyMaxLength) {
        executedCommands = executedCommands.slice(0, historyMaxLength);
    }

    extensionState.update(STATE_COMMANDS_KEY, executedCommands).then(() => {
        vscode.window.showInformationMessage(SUCCESS_MSG);
    });
}

/**
 * Validates that the current project is a Django app.
 */
function findManageFiles() {
    return vscode.workspace.findFiles(`**/${MANAGE_FILE}`).then(files => {
        return files;
    });
}

module.exports = {
    runCommand,
    findManageFiles
};
