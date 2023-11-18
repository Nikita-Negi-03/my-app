var functions = require("./students/student")
module.exports = function (app) {
    app.get("/allStudents", functions.allStudents);
    app.post("/enrollStudent", functions.enrollStudent)
}