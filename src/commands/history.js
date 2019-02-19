const vscode = require("vscode");

const util = require("../util");

const { runCommand } = require("./common");

const { NOT_DJANGO_PROJECT_MSG, NO_COMMANDS_WARNING_MSG, STATE_COMMANDS_KEY } = require("../constants");

/**
 * Entry point of the command. Validates that the project is a Django app then
 * starts the command.
 *
 * @param {vscode.ExtensionContext} context
 */
function execute(context) {
    util.isDjangoProject().then(isDjangoProject => {
        if (!isDjangoProject) {
            vscode.window.showErrorMessage(NOT_DJANGO_PROJECT_MSG);
        } else {
            showCommandHistory(context);
        }
    });
}

/**
 * Queries all the previously executed Django commands only for this workspace
 * and lists them in a selectable quick pick.
 *
 * @param {vscode.ExtensionContext} context
 */
function showCommandHistory(context) {
    // Getting the workspace state of the extension and needed configurations
    const extensionState = context.workspaceState;
    let executedCommands = extensionState.get(STATE_COMMANDS_KEY);

    if (executedCommands === undefined || executedCommands.length == 0) {
        vscode.window.showInformationMessage(NO_COMMANDS_WARNING_MSG);
        return;
    }

    vscode.window.showQuickPick(executedCommands).then(fullCommand => {
        runCommand(context, fullCommand);
    });
}

module.exports = {
    execute
};
