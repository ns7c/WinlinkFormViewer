class DialogBase {

    constructor(title) {

        this.dialog = document.createElement("dialog");

        this.dialog.className = "wfv-dialog";

        this.title = document.createElement("h2");
        this.title.textContent = title;

        this.body = document.createElement("div");
        this.body.className = "dialog-body";

        this.buttons = document.createElement("div");
        this.buttons.className = "dialog-buttons";

        this.dialog.appendChild(this.title);
        this.dialog.appendChild(this.body);
        this.dialog.appendChild(this.buttons);

    }

    addParagraph(text) {

        const p = document.createElement("p");
        p.textContent = text;

        this.body.appendChild(p);

    }

    addButton(caption, handler) {

        const button =
            document.createElement("button");

        button.textContent = caption;

        button.onclick = handler;

        this.buttons.appendChild(button);

    }

    show() {

        document.body.appendChild(
            this.dialog
        );

        this.dialog.showModal();

    }

    close() {

        this.dialog.close();

        this.dialog.remove();

    }

}