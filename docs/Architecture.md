# Winlink Portable Form Viewer Architecture

## Design Goals

- No installation required
- No Winlink client required
- No Internet connection required
- No local web server required
- Runs directly from a USB drive
- Uses the official Standard_Forms.zip library

## Components

Logger

Provides application logging.

ZipReader

Reads files from Standard_Forms.zip.

FormsLibrary

Indexes viewer forms and resolves viewer filenames.

XmlMessage

Parses Winlink XML messages and stores variables.

HtmlRenderer

Substitutes XML variables into HTML viewer templates.

WinlinkFormViewer

Application controller.

Viewer Resolution
Resolve the viewer from the current Forms Library.
If found, render it.
If not found, prompt the user.
Allow browsing to either a Forms Library (.zip) or a standalone viewer (.html).
Keep the current Forms Library active when a standalone viewer is used.