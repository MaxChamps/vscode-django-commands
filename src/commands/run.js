const vscode = require("vscode");
const cp = require("child_process");

const util = require("../util");

const { runCommand } = require("./common");

const { NOT_DJANGO_PROJECT_MSG, ERROR_MSG } = require("../constants");

const WORKSPACE_PATH = vscode.workspace.rootPath;
const PYTHON_PATH = vscode.workspace.getConfiguration("python").get("pythonPath");

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
            showAvailableCommands(context);
        }
    });
}

/**
 * Queries all the available Django commands of the project and displays them
 * in a quick pick.
 *
 * @param {vscode.ExtensionContext} context
 */
function showAvailableCommands(context) {
    // Retrieving the commands this way to not only include the commands created
    // inside the project, but also the ones included with Django.
    const command = `cd ${WORKSPACE_PATH} && ${PYTHON_PATH} manage.py help --commands`;

    cp.exec(command, (err, stdout) => {
        if (err) {
            vscode.window.showErrorMessage(ERROR_MSG);
            return;
        }
        // Commands are listed in the shell, each on their own line.
        const commands = stdout.split("\n");

        vscode.window.showQuickPick(commands).then(selectedCommand => {
            selectCommand(context, selectedCommand);
        });
    });
}

/**
 * Executed once the user clicks on a command in the quick pick.
 * Opens a user input box with the selected command prefilled.
 *
 * @param {vscode.ExtensionContext} context
 * @param {string} selectedDjangoCommand
 */
function selectCommand(context, selectedDjangoCommand) {
    // Happens usually when a user clicks outside the quick pick or press
    // escape.
    if (selectedDjangoCommand === undefined) return;

    // Initial value in the inpux box
    const value = `${selectedDjangoCommand} `;

    // When both values are the same, the cursor is set at the given character.
    const valueSelection = [value.length, value.length];
    vscode.window.showInputBox({ value, valueSelection }).then(fullCommand => {
        runCommand(context, fullCommand);
    });
}

module.exports = {
    execute
};
