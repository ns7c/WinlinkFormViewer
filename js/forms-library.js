class FormsLibrary {

    constructor(logger) {

        this.logger = logger;

        this.version = "";
        this.viewerCount = 0;
        this.duplicates = [];

        // Lookup table:
        // key = lowercase viewer filename
        // value = array of viewer objects
        this.index = {};

    }

    reset() {

        this.version = "";
        this.viewerCount = 0;
        this.duplicates = [];
        this.index = {};

    }

    async load(zipReader) {

        this.logger.info(
            "Reading Standard Forms version..."
        );

        const version =
            await zipReader.readText(
                "Standard_Forms_Version.dat"
            );

        if (!version) {

            throw new Error(
                "Standard_Forms_Version.dat not found."
            );

        }

        this.version = version.trim();

        this.logger.info(
            `Version ${this.version}`
        );

        this.buildIndex(
            zipReader.listFiles()
        );

    }

    buildIndex(files) {

        this.viewerCount = 0;
        this.index = {};
        this.duplicates = [];

        for (const path of files) {

            const filename =
                path.split("/").pop();

            if (
                !filename.toLowerCase().includes("viewer") ||
                !filename.toLowerCase().endsWith(".html")
            ) {
                continue;
            }

            const folder =
                path.substring(
                    0,
                    path.lastIndexOf("/")
                );

            const key =
                filename.toLowerCase();

            if (!this.index[key]) {

                this.index[key] = [];

            }

            this.index[key].push({

                filename: filename,
                folder: folder,
                path: path

            });

            this.viewerCount++;

        }

        for (const key in this.index) {

            if (
                this.index[key].length > 1
            ) {

                this.duplicates.push({

                    filename: key,
                    matches: this.index[key]

                });

            }

        }

        this.logger.info(
            `${this.viewerCount} viewer forms indexed.`
        );

        this.logger.info(
            `${this.duplicates.length} duplicate viewer names.`
        );

    }

    findViewer(displayForm) {

        if (!displayForm)
            return [];

        const key =
            displayForm.toLowerCase();

        if (!this.index[key])
            return [];

        return this.index[key];

    }

}