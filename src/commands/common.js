const vscode = require("vscode");

const { CONFIGURATION_NAMESPACE, SHOW_TERMINAL_PROPERTY, TERMINAL_TITLE } = require("../constants");

const WORKSPACE_PATH = vscode.workspace.rootPath;
const PYTHON_PATH = vscode.workspace.getConfiguration("python").get("pythonPath");

/**
 * Runs the command in the integrated terminal of VS Code.
 *
 * Running inside integrated to make the output of the command available to debugging
 * or simply get the output if needed.
 *
 * @param {*} fullCommand The Django command (with arguments)
 */
function runCommand(fullCommand) {
    const command = `cd ${WORKSPACE_PATH} && ${PYTHON_PATH} manage.py ${fullCommand}`;

    const terminal = vscode.window.createTerminal(TERMINAL_TITLE);
    terminal.sendText(command);

    const conf = vscode.workspace.getConfiguration(CONFIGURATION_NAMESPACE);
    if (conf.get(SHOW_TERMINAL_PROPERTY)) terminal.show();
}

module.exports = {
    runCommand
};
