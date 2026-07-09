class MissingViewerDialog extends DialogBase {

    constructor(logger) {

        super("Viewer Not Found");

        this.logger = logger;

    }

    async show(displayForm, formsVersion) {

        return new Promise((resolve) => {

            this.body.innerHTML = "";
            this.buttons.innerHTML = "";

            this.addParagraph(
                "The requested viewer was not found."
            );

            const requested =
                document.createElement("p");

            requested.innerHTML =
                `<b>Requested Viewer:</b><br>${displayForm}`;

            this.body.appendChild(requested);

            const version =
                document.createElement("p");

            version.innerHTML =
                `<b>Current Forms Library:</b><br>${formsVersion}`;

            this.body.appendChild(version);

            this.addParagraph(
                "Possible causes:"
            );

            const ul =
                document.createElement("ul");

            [
                "The forms library is out of date.",
                "The message uses a custom organization form.",
                "The viewer has been renamed or removed."
            ].forEach(text => {

                const li =
                    document.createElement("li");

                li.textContent = text;

                ul.appendChild(li);

            });

            this.body.appendChild(ul);

            this.addButton(
                "Select Forms ZIP...",
                () => {

                    this.close();

                    resolve("forms");

                });

            this.addButton(
                "Locate Viewer...",
                () => {

                    this.close();

                    resolve("viewer");

                });

            this.addButton(
                "Download Latest...",
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