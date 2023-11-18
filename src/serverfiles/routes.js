var functions = require("./students/student")
module.exports = function (app) {
    app.post("/registerUser",functions.register);
    app.post("/userLogin",functions.userLogin);
    app.get("/allStudents", functions.getStudentName);
    app.get("/getFacultyNames",functions.getFacultyName);
    app.get("/getStudents",functions.getStudents);
    app.get("/getFaculties",functions.getFaculties);
    app.post("/enrollStudent", functions.enrollStudent);
    app.get("/getStudent/:studentId",functions.studentDetails);
    app.put("/editCourse",functions.editCourse);
    app.get("/getStudentClass/:id",functions.getStudentClass);
    app.post("/postStudentDetails",functions.addStudentDetails);
    app.post("/addClass",functions.addClass);
    app.put("/editClass/:id", functions.editClass);
}