var functions = require("./students/student")
module.exports = function (app) {
    app.post("/registerUser",functions.register)
    app.post("/userLogin",functions.userLogin)
    app.get("/allStudents", functions.allStudents);
    app.post("/enrollStudent", functions.enrollStudent);
    app.get("/getStudent/:studentId",functions.studentDetails)
}