class Logger {

    constructor(id) {

        this.log = document.getElementById(id);

    }

    write(level, message) {

        const now = new Date().toLocaleTimeString();

        this.log.textContent +=
            `[${now}] ${level} ${message}\n`;

        this.log.scrollTop =
            this.log.scrollHeight;

    }

    info(message) {

        this.write("INFO ", message);

    }

    warning(message) {

        this.write("WARN ", message);

    }

    error(message) {

        this.write("ERROR", message);

    }

}