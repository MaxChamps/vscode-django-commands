exports.NOT_DJANGO_PROJECT_MSG = "Django commands must be executed within a Django project workspace.";
exports.ERROR_MSG = "An error occured, please try again.";
exports.NO_COMMANDS_WARNING_MSG =
    "No Django command found. If it should not be empty, please validate that the 'djangoCommands.historyFilePath' setting points to the appropriate file.";

exports.CONFIGURATION_NAMESPACE = "djangoCommands";
exports.SHOW_TERMINAL_PROPERTY = "showTerminalOnCommand";
exports.HISTORY_MAX_LENGTH_PROPERTY = "historyMaxLength";
exports.HISTORY_FILE_PATH_PROPERTY = "historyFilePath";

exports.TERMINAL_TITLE = "Django Commands";

exports.SHELL_HISTORY_FILE_MAP = {
    zsh: ".zsh_history",
    sh: ".bash_history"
};
