/******************************************************************************
 *
 * Winlink Form Viewer
 *
 * viewer-loader.js
 *
 ******************************************************************************/

class ViewerLoader {

    constructor(logger, zipReader) {

        this.logger = logger;
        this.zipReader = zipReader;

    }

    async load(source) {

        if (source instanceof File) {

            this.logger.info(
                `Loading standalone viewer: ${source.name}`
            );

            return await source.text();

        }

        this.logger.info(
            `Loading viewer from Forms Library: ${source.path}`
        );

        return await this.zipReader.readHtml(
            source.path
        );

    }

}