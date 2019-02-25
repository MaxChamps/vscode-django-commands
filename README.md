# Django Commands - VS Code Extension

A small VS Code extension for Django projects allowing developers to run commands directly within VS Code.

\* Extension still in development, improvements will be incremental. Contributions are welcome :)

## Features

### List and run commands

By invoking the VS Code command palette and executing 'Django Commands: Run', a list of all available commands for the project is displayed, and by selecting one of the choices, you can execute it as is or add arguments if needed.

### Executed commands history

By invoking the VS Code command palette and executing 'Django Commands: History', a list the previously executed Django commands is displayed (including their arguments). You can run them again by selecting the right one in the list.

*The listed commands only include the ones that have been executed inside the current workspace.*

*The history is, for now, always workspace specific, which means that the list of previously executed commands only contains the ones that were executed inside the current workspace.*

## Roadmap

Features to add:

-   Make the extension work with multi-folders workspaces
-   Automatically reload the extension's configurations when the settings are updated in the *Settings.json* file
-   Make the 'Django Commands: Run' faster to query all the possible commands for the current project
-   Add the possibility to list all the Django commands history of the whole system (including the ones executed in external terminals)
-   Add new setting to allow users to ignore some commands when executing 'Django Commands: History'

*Suggestions are welcome!*

## Extension Settings

This extension contributes the following settings:

-   `djangoCommands.historyMaxLength`: Number of commands previously executed listed by 'Django Commands: History'
-   `djangoCommands.showTerminalOnCommand`: Open (or don't open) the terminal when a Django command is executed to see its progress

## Release Notes

### 0.1.0

Initial release with very basic, but still useful, functionnalities.

-   Listing all available Django commands and executing the selected one
-   Listing all the previously executed Django commands (with arguments) and re-executing the selected one
