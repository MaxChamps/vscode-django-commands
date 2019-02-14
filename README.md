# Django Commands - VS Code Extension

A small VS Code extension for Django projects allowing developers to run commands directly within VS Code.

\* Extension still in development, contributions are welcome :)

## Features

### List available commands

By invoking the VS Code command pallette and executing 'Django Commands: Run', a list of all available commands for the project is displayed, and by selecting one of the choices, you can execute it as is or add arguments if needed.

### Executed commands history

By invoking the VS Code command pallette and executing 'Django Commands: History', a list of all the previously executed Django commands is displayed (with arguments). You can run them again by selecting the right one in the list.

## Roadmap

Features to add:

-   Automatically fetch the Django commands history without the need to specify a history file path
-   Add new setting to allow users to ignore command names when executing 'Django Commands: History'

Bugs to fix:

-   Make the extension work when in a multi-root workspace

## Known issues

-   Extension can't be executed within a multi-root workspace

## Extension Settings

This extension contributes the following settings:

-   `djangoCommands.historyMaxLength`: Number of commands previously executed listed on 'Django Commands: History'
-   `djangoCommands.showTerminalOnCommand`: Open (or don't open) the terminal when a Django command is executed to see its progress.
-   `djangoCommands.historyFilePath`: Shell history file path. Depends on the shell used (ex: bash vs zsh). Required to query the appropriate Django commands history.

## Release Notes

### 0.1.0

Initial release with very basic, but stull useful, functionnalities:

-   Listing all available Django commands and executing the selected one
-   Listing all the previously executed Django commands (with arguments) and re-execute the selected one.
