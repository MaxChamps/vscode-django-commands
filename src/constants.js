exports.NOT_DJANGO_PROJECT_MSG = "Django commands must be executed within a Django project workspace.";
exports.ERROR_MSG = "An error occured, please try again.";
exports.NO_COMMANDS_WARNING_MSG =
    "No Django command found. Please use the 'Django Commands: Run' to execute your first command.";
exports.SUCCESS_MSG = "Django command launched. Log is available in the 'Django Commands' integrated terminal.";

exports.CONFIGURATION_NAMESPACE = "djangoCommands";
exports.SHOW_TERMINAL_PROPERTY = "showTerminalOnCommand";
exports.HISTORY_MAX_LENGTH_PROPERTY = "historyMaxLength";

exports.STATE_COMMANDS_KEY = "commands";

exports.TERMINAL_TITLE = "Django Commands";

exports.SHELL_HISTORY_FILE_MAP = {
    zsh: ".zsh_history",
    sh: ".bash_history"
};

exports.MANAGE_FILE = "manage.py";
