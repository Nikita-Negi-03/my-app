var functions = require("./students/student")
module.exports = function (app) {
    app.get("/test", functions.test)
}