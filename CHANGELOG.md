# Changelog

All notable changes to the Winlink Portable Form Viewer are documented here.

This project follows Semantic Versioning while in development.

---

## [0.4.0-alpha] - 2026-07-08

### Added

- Portable HTML application that runs directly from a local file or USB drive.
- Support for loading the Winlink Standard_Forms.zip library.
- Automatic detection and display of the Standard Forms version.
- Indexing of all viewer forms within the forms library.
- Detection of duplicate viewer filenames.
- Support for opening Winlink XML message files.
- XML parser for Winlink standard forms.
- Automatic viewer selection using the XML `<display_form>` element.
- HTML template renderer for Winlink viewer forms.
- Variable substitution using XML message data.
- Display of rendered forms in a new browser tab.
- Activity log for application status and diagnostics.

### Changed

- Simplified application architecture to eliminate the need for a local web server.
- Replaced ES6 module architecture with classic JavaScript loading to support execution directly from `file://` URLs.
- Separated ZIP handling, forms indexing, XML parsing, and HTML rendering into independent classes.

### Known Limitations

- Duplicate viewer filenames are reported but not yet resolved through a user selection dialog.
- Viewer rendering performs template substitution only; advanced viewer scripting has not yet been evaluated.
- Drag-and-drop is not yet implemented.
- Manual selection is not yet available when a viewer cannot be found.