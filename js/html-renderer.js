class HtmlRenderer {

    constructor(logger) {

        this.logger = logger;

    }

    render(templateHtml, variables) {

        this.logger.info(
            "Rendering HTML template..."
        );

        return templateHtml.replace(

            /\{var\s+([^}]+)\}/gi,

            function(match, variableName) {

                const key =
                    variableName.trim().toLowerCase();

                if (
                    variables.hasOwnProperty(key)
                ) {

                    return variables[key];

                }

                return "";

            }

        );

    }

}