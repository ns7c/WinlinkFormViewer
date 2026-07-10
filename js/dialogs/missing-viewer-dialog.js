/******************************************************************************
 *
 * Winlink Form Viewer
 *
 * Missing Viewer Dialog
 *
 ******************************************************************************/

class MissingViewerDialog extends DialogBase {

    constructor(logger) {

        super("Viewer Form Not Found");

        this.logger = logger;

    }

    async show(displayForm, libraryName, formsVersion) {

        return new Promise((resolve) => {

            this.body.innerHTML = "";
            this.buttons.innerHTML = "";

            this.addParagraph(
                "The requested viewer was not found in the current Forms Library."
            );

            const requested =
                document.createElement("p");

            requested.innerHTML =
                `<b>Requested Viewer</b><br>${displayForm}`;

            this.body.appendChild(requested);

            const library =
                document.createElement("p");

            library.innerHTML =
                `<b>Current Forms Library</b><br>${libraryName}<br>Version ${formsVersion}`;

            this.body.appendChild(library);

            this.addParagraph(
                "Possible reasons:"
            );

            const ul =
                document.createElement("ul");

            [
                "The Forms Library is out of date.",
                "The message references a custom viewer.",
                "The viewer has been renamed or removed."
            ].forEach(text => {

                const li =
                    document.createElement("li");

                li.textContent = text;

                ul.appendChild(li);

            });

            this.body.appendChild(ul);

            this.addButton(
                "Browse for Viewer or Forms Library...",
                () => {

                    this.close();

                    resolve("browse");

                });

            this.addButton(
                "Download Latest Standard Forms...",
                () => {

                    window.open(
                        AppInfo.WINLINK_DOWNLOADS,
                        "_blank"
                    );

                });

            this.addButton(
                "Cancel",
                () => {

                    this.close();

                    resolve("cancel");

                });

            super.show();

        });

    }

}