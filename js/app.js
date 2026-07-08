class WinlinkFormViewer {

    constructor() {

        this.logger = new Logger("log");

        this.formsLibrary = new FormsLibrary(this.logger);

        this.zipReader = new ZipReader(this.logger);

        this.xmlMessage = new XmlMessage(this.logger);

        this.renderer = new HtmlRenderer(this.logger);

    }

    initialize() {

        this.logger.info("Application started.");

        this.initializeFormsButton();

        this.initializeXmlButton();

    }

    initializeFormsButton() {

        const btnForms =
            document.getElementById("btnForms");

        const formsFile =
            document.getElementById("formsFile");

        btnForms.addEventListener(
            "click",
            () => formsFile.click()
        );

        formsFile.addEventListener(
            "change",
            async (event) => {

                if (event.target.files.length === 0)
                    return;

                try {

                    const file =
                        event.target.files[0];

                    document.getElementById(
                        "formsName"
                    ).textContent = file.name;

                    await this.zipReader.open(file);

                    await this.formsLibrary.load(
                        this.zipReader
                    );

                    document.getElementById(
                        "formsVersion"
                    ).textContent =
                        this.formsLibrary.version;

                    document.getElementById(
                        "viewerCount"
                    ).textContent =
                        this.formsLibrary.viewerCount;

                    document.getElementById(
                        "duplicateCount"
                    ).textContent =
                        this.formsLibrary.duplicates.length;

                    document.getElementById(
                        "btnXML"
                    ).disabled = false;

                    this.logger.info(
                        "Forms library ready."
                    );

                }

                catch (error) {

                    this.logger.error(
                        error.message
                    );

                }

            });

    }

    initializeXmlButton() {

        const btnXML =
            document.getElementById("btnXML");

        const xmlFile =
            document.getElementById("xmlFile");

        btnXML.addEventListener(
            "click",
            () => xmlFile.click()
        );

        xmlFile.addEventListener(
            "change",
            async (event) => {

                if (event.target.files.length === 0)
                    return;

                try {

                    const file =
                        event.target.files[0];

                    document.getElementById(
                        "xmlName"
                    ).textContent =
                        file.name;

                    await this.xmlMessage.load(file);

                    const matches =
                        this.formsLibrary.findViewer(
                            this.xmlMessage.displayForm
                        );

                    if (matches.length === 0) {

                        this.logger.error(
                            "Viewer not found."
                        );

                        return;

                    }

                    if (matches.length === 1) {

    this.logger.info(
        `Viewer found: ${matches[0].path}`
    );

    const viewerHtml =
        await this.zipReader.readHtml(
            matches[0].path
        );

    const renderedHtml =
        this.renderer.render(
            viewerHtml,
            this.xmlMessage.variables
        );

    const newWindow =
        window.open();

    newWindow.document.open();
    newWindow.document.write(renderedHtml);
    newWindow.document.close();

    return;

}

                    

                    this.logger.warning(
                        `${matches.length} matching viewers found.`
                    );

                    for (const match of matches) {

                        this.logger.info(
                            match.path
                        );

                    }

                }

                catch (error) {

                    this.logger.error(
                        error.message
                    );

                }

            });

    }

}

window.onload = function () {

    const app =
        new WinlinkFormViewer();

    app.initialize();

};