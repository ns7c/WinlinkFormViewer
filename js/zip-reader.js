class ZipReader {

    constructor(logger) {

        this.logger = logger;
        this.zip = null;

    }

    async open(file) {

        this.logger.info(`Opening ${file.name}`);

        this.zip = await JSZip.loadAsync(file);

        this.logger.info("ZIP opened.");

    }

    async readText(path) {

        const entry = this.zip.file(path);

        if (!entry)
            return null;

        return await entry.async("text");

    }

    async readHtml(path) {

        return await this.readText(path);

    }

    listFiles() {

        return Object.keys(this.zip.files);

    }

}