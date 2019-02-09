const vscode = require("vscode");

function execute() {
    vscode.window.showInformationMessage("Running Django command");
}

module.exports = {
    execute
};
