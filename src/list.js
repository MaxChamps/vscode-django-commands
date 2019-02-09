const vscode = require("vscode");

function execute() {
    vscode.window.showInformationMessage("Listing Django commands");
}

module.exports = {
    execute
};
