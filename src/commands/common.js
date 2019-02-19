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

const WORKSPACE_PATH = vscode.workspace.rootPath;
const PYTHON_PATH = vscode.workspace.getConfiguration("python").get("pythonPath");
const CONFIGURATION = vscode.workspace.getConfiguration(CONFIGURATION_NAMESPACE);

/**
 * Runs the command in the integrated terminal of VS Code.
 *
 * Running inside integrated to make the output of the command available to debugging
 * or simply get the output if needed.
 *
 * @param {vscode.ExtensionContext} context
 * @param {string} fullCommand The Django command (with arguments)
 */
function runCommand(context, fullCommand) {
    if (fullCommand === undefined || fullCommand === null || fullCommand === "") return;

    const command = `cd ${WORKSPACE_PATH} && ${PYTHON_PATH} ${MANAGE_FILE} ${fullCommand}`.trim();

    let terminal = vscode.window.activeTerminal;
    if (terminal === undefined) terminal = vscode.window.createTerminal(TERMINAL_TITLE);
    terminal.sendText(command);

    saveCommand(context, fullCommand);

    if (CONFIGURATION.get(SHOW_TERMINAL_PROPERTY)) terminal.show();
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
    const historyMaxLength = CONFIGURATION.get(HISTORY_MAX_LENGTH_PROPERTY);

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
function isDjangoProject() {
    return vscode.workspace.findFiles(MANAGE_FILE).then(files => {
        if (files.length === 0) return false;
        return true;
    });
}

module.exports = {
    runCommand,
    isDjangoProject
};
