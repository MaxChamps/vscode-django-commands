const vscode = require("vscode");
const cp = require("child_process");

const util = require("../util");

const { runCommand } = require("./common");

const {
    NOT_DJANGO_PROJECT_MSG,
    CONFIGURATION_NAMESPACE,
    HISTORY_MAX_LENGTH_PROPERTY,
    HISTORY_FILE_PATH_PROPERTY,
    NO_COMMANDS_WARNING_MSG
} = require("../constants");

const HISTORY_FILE_PATH = vscode.workspace.getConfiguration(CONFIGURATION_NAMESPACE).get(HISTORY_FILE_PATH_PROPERTY);

/**
 * Entry point of the command. Validates that the project is a Django app then
 * starts the command.
 */
function execute() {
    util.isDjangoProject().then(isDjangoProject => {
        if (!isDjangoProject) {
            vscode.window.showErrorMessage(NOT_DJANGO_PROJECT_MSG);
        } else {
            showCommandHistory();
        }
    });
}

/**
 * Queries all the previously executed Django commands (not only the active project)
 * and displays them in a quick pick.
 */
function showCommandHistory() {
    const conf = vscode.workspace.getConfiguration(CONFIGURATION_NAMESPACE);
    let historyMaxLength = conf.get(HISTORY_MAX_LENGTH_PROPERTY);
    if (historyMaxLength < 1) historyMaxLength = 100;

    // Retrieving the commands this way to get every command executed in all terminals
    // across the machine if more than one terminal used
    const command = `cat ${HISTORY_FILE_PATH} | grep -e 'python manage.py' -e './manage.py' | head -n ${historyMaxLength}`;

    cp.exec(command, (err, stdout) => {
        if (err) {
            vscode.window.showErrorMessage(err.message);
            return;
        }

        // Each command is listed on its own line
        const fullDjangoCommands = stdout.split("\n");

        // If there is no command found or the only one is empty, stop processing
        if (fullDjangoCommands.lastIndexOf === 0 || fullDjangoCommands[0].trim() === "") {
            vscode.window.showWarningMessage(NO_COMMANDS_WARNING_MSG);
            return;
        }

        // Making sure that the only characters shown in the quick pick are the command name and arguments
        let cleanedDjangoCommands = [];
        fullDjangoCommands.forEach(command => {
            if (command === "") return;
            command = command.split("manage.py")[1].trim();
            cleanedDjangoCommands.push(command);
        });

        vscode.window.showQuickPick(cleanedDjangoCommands).then(fullCommand => {
            runCommand(fullCommand);
        });
    });
}

module.exports = {
    execute
};
