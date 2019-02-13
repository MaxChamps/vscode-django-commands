const vscode = require("vscode");

const MANAGE_FILE = "manage.py";

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
    isDjangoProject
};
