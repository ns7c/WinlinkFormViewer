class XmlMessage {

    constructor(logger) {

        this.logger = logger;

        this.displayForm = "";

        this.templateVersion = "";

        this.variables = {};

    }

    async load(file) {

        this.logger.info(`Opening ${file.name}`);

        const xmlText = await file.text();

        const parser = new DOMParser();

        const xml = parser.parseFromString(
            xmlText,
            "text/xml"
        );

        // Look for XML parser errors
        const parserError = xml.querySelector("parsererror");

        if (parserError) {

            throw new Error("Invalid XML file.");

        }

        // -------- form_parameters --------

        const formParameters =
            xml.querySelector("form_parameters");

        if (!formParameters) {

            throw new Error(
                "Missing form_parameters."
            );

        }

        const display =
            formParameters.querySelector("display_form");

        if (!display) {

            throw new Error(
                "display_form not found."
            );

        }

        this.displayForm =
            display.textContent.trim();

        // -------- variables --------

        const vars =
            xml.querySelector("variables");

        if (vars) {

            for (const node of vars.children) {

                this.variables[
                  node.tagName.toLowerCase()
                ] = node.textContent;

            }

            if (this.variables.templateversion) {

                this.templateVersion =
                    this.variables.templateversion;

            }

        }

        this.logger.info(
            `Display Form: ${this.displayForm}`
        );

    }

}