const vscode = require("vscode");

const { runCommand, findManageFiles } = require("./common");

const { NOT_DJANGO_PROJECT_MSG, NO_COMMANDS_WARNING_MSG, STATE_COMMANDS_KEY } = require("../constants");

/**
 * Entry point of the command. Validates that the project is a Django app then
 * starts the command.
 *
 * @param {vscode.ExtensionContext} context
 */
function execute(context) {
    console.log("history");
    findManageFiles().then(manageFiles => {
        if (manageFiles.length === 0) {
            vscode.window.showErrorMessage(NOT_DJANGO_PROJECT_MSG);
        } else {
            // TODO: handle multiple manage.py files. Assuming there is only one manage.py file for now.
            showCommandHistory(context, manageFiles[0].path);
        }
    });
}

/**
 * Queries all the previously executed Django commands only for this workspace
 * and lists them in a selectable quick pick.
 *
 * @param {vscode.ExtensionContext} context
 * @param {string} manageFile the path of the manage.py file that will be used to execute the command
 */
function showCommandHistory(context, manageFile) {
    // Getting the workspace state of the extension and needed configurations
    const extensionState = context.workspaceState;
    let executedCommands = extensionState.get(STATE_COMMANDS_KEY);

    if (executedCommands === undefined || executedCommands.length === 0) {
        vscode.window.showInformationMessage(NO_COMMANDS_WARNING_MSG);
        return;
    }

    vscode.window.showQuickPick(executedCommands).then(fullCommand => {
        runCommand(context, manageFile, fullCommand);
    });
}

module.exports = {
    execute
};
