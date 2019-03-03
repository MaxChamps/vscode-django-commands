const vscode = require("vscode");
const cp = require("child_process");

const { runCommand, findManageFiles } = require("./common");

const {
    NOT_DJANGO_PROJECT_MSG,
    ERROR_MSG,
    PYTHON,
    CONFIGURATION_PYTHON_PATH,
    LOAD_COMMANDS_MSG
} = require("../constants");

/**
 * Entry point of the command. Validates that the project is a Django app then
 * starts the command.
 *
 * @param {vscode.ExtensionContext} context
 */
function execute(context) {
    findManageFiles().then(manageFiles => {
        if (manageFiles.length === 0) {
            vscode.window.showErrorMessage(NOT_DJANGO_PROJECT_MSG);
        } else {
            // TODO: handle multiple manage.py files. Assuming there is only one manage.py file for now.
            showAvailableCommands(context, manageFiles[0].path);
        }
    });
}

/**
 * Queries all the available Django commands of the project and displays them
 * in a quick pick.
 *
 * @param {vscode.ExtensionContext} context
 * @param {string} manageFile the path of the manage.py file that will be used to execute the command
 */
function showAvailableCommands(context, manageFile) {
    vscode.window.showInformationMessage(LOAD_COMMANDS_MSG);

    // Retrieving the commands this way to not only include the commands created
    // inside the project, but also the ones included with Django.
    const pythonPath = vscode.workspace.getConfiguration(PYTHON).get(CONFIGURATION_PYTHON_PATH);

    const command = `${pythonPath} ${manageFile} help --commands`;

    cp.exec(command, (err, stdout) => {
        if (err) {
            vscode.window.showErrorMessage(ERROR_MSG);
            return;
        }
        // Commands are listed in the shell, each on their own line, and removing the last item
        // because it is always an empty line.
        let commands = stdout.split("\n");
        commands.splice(-1);

        vscode.window.showQuickPick(commands).then(selectedCommand => {
            selectCommand(context, manageFile, selectedCommand);
        });
    });
}

/**
 * Executed once the user clicks on a command in the quick pick.
 * Opens a user input box with the selected command prefilled.
 *
 * @param {vscode.ExtensionContext} context
 * @param {string} manageFile the path of the manage.py file that will be used to execute the command
 * @param {string} selectedDjangoCommand
 */
function selectCommand(context, manageFile, selectedDjangoCommand) {
    // Happens usually when a user clicks outside the quick pick or press
    // escape.
    if (selectedDjangoCommand === undefined) return;

    // Initial value in the inpux box
    const value = `${selectedDjangoCommand} `;

    // When both values are the same, the cursor is set at the given character.
    const valueSelection = [value.length, value.length];
    vscode.window.showInputBox({ value, valueSelection }).then(fullCommand => {
        runCommand(context, manageFile, fullCommand);
    });
}

module.exports = {
    execute
};
