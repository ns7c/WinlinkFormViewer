class WinlinkFormViewer {

    constructor() {

    this.logger = new Logger("log");

    this.formsLibrary = new FormsLibrary(
        this.logger
    );

    this.zipReader = new ZipReader(
        this.logger
    );

    this.viewerLoader = new ViewerLoader(
        this.logger,
        this.zipReader
    );

    this.xmlMessage = new XmlMessage(
        this.logger
    );

    this.renderer = new HtmlRenderer(
        this.logger
    );

    this.viewerSelectorDialog =
        new ViewerSelectorDialog(
            this.logger
        );

    this.missingViewerDialog =
        new MissingViewerDialog(
            this.logger
        );

    this.ui = {

        btnForms:
            document.getElementById("btnForms"),

        btnXML:
            document.getElementById("btnXML"),

        formsFile:
            document.getElementById("formsFile"),

        xmlFile:
            document.getElementById("xmlFile"),

        formsName:
            document.getElementById("formsName"),

        xmlName:
            document.getElementById("xmlName"),

        formsVersion:
            document.getElementById("formsVersion"),

        viewerCount:
            document.getElementById("viewerCount"),

        duplicateCount:
            document.getElementById("duplicateCount")

    };

}

    initialize() {

        this.logger.info(
            `${AppInfo.NAME} ${AppInfo.VERSION}`
        );

        this.wireEvents();

    }

    wireEvents() {

        this.ui.btnForms.addEventListener(
            "click",
            () => this.ui.formsFile.click()
        );

        this.ui.formsFile.addEventListener(
            "change",
            async (event) => {

                if (event.target.files.length === 0)
                    return;

                await this.loadFormsLibrary(
                    event.target.files[0]
                );

            }
        );

        this.ui.btnXML.addEventListener(
            "click",
            () => this.ui.xmlFile.click()
        );

        this.ui.xmlFile.addEventListener(
            "change",
            async (event) => {

                if (event.target.files.length === 0)
                    return;

                await this.openXml(
                    event.target.files[0]
                );

            }
        );

    }

    async loadFormsLibrary(file) {

    try {

        this.ui.formsName.textContent =
            file.name;

        this.logger.info(
            `Loading ${file.name}...`
        );

        await this.zipReader.open(file);

        await this.formsLibrary.load(
            this.zipReader,
            file.name
        );

        this.ui.formsVersion.textContent =
            this.formsLibrary.version;

        this.ui.viewerCount.textContent =
            this.formsLibrary.viewerCount;

        this.ui.duplicateCount.textContent =
            this.formsLibrary.duplicates.length;

        this.ui.btnXML.disabled = false;

        this.logger.info(
            "Forms library ready."
        );

    }

    catch (error) {

        this.logger.error(
            error.message
        );

    }

}

async browseForViewerOrLibrary() {

    return new Promise((resolve) => {

        const input =
            document.createElement("input");

        input.type = "file";
        input.accept = ".zip,.html";

        input.addEventListener(
            "change",
            () => {

                if (input.files.length === 0) {

                    resolve(null);
                    return;

                }

                resolve(input.files[0]);

            },
            { once: true }
        );

        input.click();

    });

}

    async openXml(file) {

        try {

            this.ui.xmlName.textContent =
                file.name;

            this.logger.info(
                `Opening ${file.name}...`
            );

            await this.xmlMessage.load(file);

            await this.renderCurrentMessage();

        }

        catch (error) {

            this.logger.error(
                error.message
            );

        }

    }

    async renderCurrentMessage() {

    const result =
        this.formsLibrary.resolveViewer(
            this.xmlMessage.displayForm
        );

    switch (result.status) {

        case "not-found":

            await this.handleMissingViewer();
            return;

        case "unique":

            await this.renderViewer(
                result.viewer
            );
            return;

        case "duplicate":

            await this.resolveDuplicateViewers(
                result.viewers
            );
            return;

        default:

            this.logger.error(
                `Unknown status: ${result.status}`
            );

    }

}

    async handleMissingViewer() {

    const action =
        await this.missingViewerDialog.show(

            this.xmlMessage.displayForm,

            this.formsLibrary.libraryName,

            this.formsLibrary.version

        );

    if (action !== "browse") {

        this.logger.info(
            "Viewer selection cancelled."
        );

        return;

    }

    const file =
        await this.browseForViewerOrLibrary();

    if (!file) {

        this.logger.info(
            "Browse cancelled."
        );

        return;

    }

    const extension =
        file.name
            .split(".")
            .pop()
            .toLowerCase();

    switch (extension) {

        case "zip":

            await this.loadFormsLibrary(
                file
            );

            await this.renderCurrentMessage();

            return;

        case "html":

            await this.renderStandaloneViewer(
                file
            );

            return;

        default:

            this.logger.error(
                "Unsupported file type."
            );

    }

}

    async resolveDuplicateViewers(viewers) {

        this.logger.warning(
            `${viewers.length} matching viewers found.`
        );

        const viewer =
            await this.viewerSelectorDialog.select(
                viewers
            );

        if (!viewer) {

            this.logger.info(
                "Viewer selection cancelled."
            );

            return;

        }

        await this.renderViewer(
            viewer
        );

    }

    async renderStandaloneViewer(file) {

    this.logger.info(
        `Rendering standalone viewer ${file.name}`
    );

    const templateHtml =
        await this.viewerLoader.load(
            file
        );

    const renderedHtml =
        this.renderer.render(
            templateHtml,
            this.xmlMessage.variables
        );

    const popup =
        window.open(
            "",
            "_blank"
        );

    popup.document.open();
    popup.document.write(renderedHtml);
    popup.document.close();

    this.logger.info(
        "Standalone viewer rendered."
    );

}

    async renderViewer(viewer) {

    this.logger.info(
        `Rendering ${viewer.path}`
    );

    const templateHtml =
        await this.viewerLoader.load(
            viewer
        );

    const renderedHtml =
        this.renderer.render(
            templateHtml,
            this.xmlMessage.variables
        );

    const popup =
        window.open(
            "",
            "_blank"
        );

    popup.document.open();
    popup.document.write(renderedHtml);
    popup.document.close();

    this.logger.info(
        "Viewer opened."
    );

}

}

window.addEventListener(
    "load",
    () => {

        const app =
            new WinlinkFormViewer();

        app.initialize();

    }
);