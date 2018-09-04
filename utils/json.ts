import * as fs from "fs";
import * as mkdirp from "mkdirp";
const jsonReports = process.cwd() + "/reports/json";

function createDirectory(dir: string) {
    if (!fs.existsSync(dir)) {
        mkdirp.sync(dir);
    }
}
createDirectory(jsonReports);
