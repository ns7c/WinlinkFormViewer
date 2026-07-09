class ViewerSelectorDialog {

    constructor(logger) {

        this.logger = logger;

    }

    /**
     * Displays a dialog allowing the user to select
     * one viewer from a list of matching viewer forms.
     *
     * Returns:
     *   Promise<ViewerObject|null>
     */
    async select(matches) {

        return new Promise((resolve) => {

            // Create dialog
            const dialog =
                document.createElement("dialog");

            dialog.style.minWidth = "600px";

            // Title
            const title =
                document.createElement("h2");

            title.textContent =
                "Multiple Viewer Forms Found";

            dialog.appendChild(title);

            // Description
            const text =
                document.createElement("p");

            text.textContent =
                "More than one viewer matches this XML message. Please select the viewer to use.";

            dialog.appendChild(text);

            // Viewer list
            const form =
                document.createElement("form");

            form.method = "dialog";

            matches.forEach((viewer, index) => {

                const label =
                    document.createElement("label");

                label.style.display = "block";
                label.style.marginBottom = "8px";

                const radio =
                    document.createElement("input");

                radio.type = "radio";
                radio.name = "viewer";
                radio.value = index;

                if (index === 0)
                    radio.checked = true;

                label.appendChild(radio);

                label.append(
                    ` ${viewer.folder}  (${viewer.filename})`
                );

                form.appendChild(label);

            });

            dialog.appendChild(form);

            // Buttons
            const buttonBar =
                document.createElement("div");

            buttonBar.style.marginTop = "20px";
            buttonBar.style.textAlign = "right";

            const cancel =
                document.createElement("button");

            cancel.textContent = "Cancel";
            cancel.type = "button";

            cancel.onclick = () => {

                dialog.close();

                dialog.remove();

                resolve(null);

            };

            const open =
                document.createElement("button");

            open.textContent = "Open";
            open.type = "button";

            open.style.marginLeft = "10px";

            open.onclick = () => {

                const selected =
                    form.querySelector(
                        "input[name='viewer']:checked"
                    );

                const viewer =
                    matches[
                        parseInt(selected.value)
                    ];

                dialog.close();

                dialog.remove();

                resolve(viewer);

            };

            buttonBar.appendChild(cancel);
            buttonBar.appendChild(open);

            dialog.appendChild(buttonBar);

            document.body.appendChild(dialog);

            dialog.showModal();

        });

    }

}