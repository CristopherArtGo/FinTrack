const path = require("path");
const enableProfiler = require(path.join(__dirname, "libraries", "enableProfiler"));
const enabledProfiler = true;
const db = '';

module.exports = { db, enableProfiler, enabledProfiler };
