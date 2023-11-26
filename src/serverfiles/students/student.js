var data= require("../sampleData");
const initializeServer = require("../expressServer");
let server;
async function startServer() {
  try {
    server = await initializeServer();
    // Now you can access server.app and server.client
  } catch (error) {
    console.error("Error initializing server:", error);
  }
}
startServer();
var functions = {
    getStudentName: function (req,res){
        let studentsList= data.students.map(e=> {return e.name})
        res.json({
            status:1,
            result: studentsList
        })
    },
    enrollStudent: function (req,res){
        let studentDetails= {id:data.students.length + 1, ...req.body}
        data.students.push(studentDetails)
        let obj = { ...studentDetails };
        delete obj.password;
        res.send({
            status:1,
            result:obj
        });
    },
    studentDetails: function (req,res){
        let id = +req.params.studentId;
        let studentDetails = data.students.find(e=> e.id===id);
        res.json({
            status:1,
            result:studentDetails
        })
    },
    userLogin: function (req,res){
        let email= res.body.email;
        let password = req.body.password;
        let user = data.users.find(e=> {
            return e.email === email && e.password === password;
        })
        if(user){
            delete user.userId
            delete user.password
            res.json({
                status:1,
                result: user
            })
        } else {
            res.json({
                status:0,
                error: "user not found"
            })
        }
    },
    register: function  (res,res){
        let user={
            userId: data.users.length + 1,
            name: req.body.name,
            password: req.body.password,
            role: req.body.role,
            email: req.body.email
        }
        data.users.unshift(user)
        if(req.body.role=="student"){
            let maxId=data.students.reduce((acc,curr)=> curr.id>acc? curr.id: acc,0)
            let newStudent = {
                id:maxId,
                name: user.name,
                dob:"",
                gender:"",
                about:"",
                courses:[]
            }
            data.students.unshift(newStudent)
        } else {
            let maxId=faculties.reduce((acc,curr)=> curr.id>acc ?curr.id :acc,0);
            let newFaculty={
                id:maxId+1,
                name:cust.name,
                courses:[],
            }
            faculties.unshift(newFaculty)
        }
        res.json({
            status:1,
            result: `user ${user.name} registered successfully as ${user.role}.`
        })
    },
    getFacultyName: function(req, res) {
        let facultyList=data.faculties.map((s1)=>{ return  s1.name} );
        res.json({
            status:1,
            result: facultyList
        })
    },
    getCourses: function(req,res) {
        res.json({
            status:1,
            result: data.courses
        })
    },
    getStudents: function(req, res) {
        let course=req.query.course;
        if(course){
        let courseArr= course.split(",");
        let students1=data.students.filter((s1)=> s1.courses.find((c1)=> courseArr.find((c2)=> c2===c1 ))
        )
        let result = helper.pagination(students1, parseInt(req.query.page));
            res.json({
            page: parseInt(req.query.page),
            items: result,
            totalItems: result.length,
            totalNum: students1.length
            });
        }
        else{
            let result = helper.pagination(data.students, parseInt(req.query.page));
            res.json({
            page: parseInt(req.query.page),
            items: result,
            totalItems: result.length,
            totalNum: students.length
            });
        }
    },
    getFaculties: function(req, res) {
        let course=req.query.course;
        if(course){
                let courseArr= course.split(",");
                let faculties1=data.faculties.filter((s1)=> s1.courses.find((c1)=> courseArr.find((c2)=> c2===c1 ))
            )
            let result = helper.pagination(faculties1, parseInt(req.query.page));
            res.json({
            page: parseInt(req.query.page),
            items: result,
            totalItems: result.length,
            totalNum: faculties1.length
            });
        }
        else{
            let result = helper.pagination(data.faculties, parseInt(req.query.page));
            res.json({
            page: parseInt(req.query.page),
            items: result,
            totalItems: result.length,
            totalNum: data.faculties.length
            });
        }
    },
    editCourse: function(req, res) {
        const updatedCourseDetails = {
            name: req.body.name,
            courseId: req.body.courseId,
            code: req.body.code,
            description: req.body.description,
            faculty:req.body.faculty,
            students:req.body.students,
          };
          let studentList=req.body.students;
          let facultyList=req.body.faculty;
          
          for(let i=0; i<data.faculties.length; i++){
            if(data.faculties[i].courses.indexOf(req.body.name)!=-1){
              let index=data.faculties[i].courses.indexOf(req.body.name)
              data.faculties[i].courses.splice(index,1)
            }
          }
          for(let i=0; i<data.students.length; i++){
            if(data.students[i].courses.indexOf(req.body.name)!=-1){
              let index=data.students[i].courses.indexOf(req.body.name)
              data.students[i].courses.splice(index,1)
            }
          }
          for(let i=0; i<studentList.length; i++){
            let index= data.students.findIndex((s1)=> s1.name==studentList[i])
            if(data.students[index].courses.indexOf(req.body.name)===-1){
                data.students[index].courses.push(req.body.name)
          }
          }
          for(let i=0; i<facultyList.length; i++){
            let index= data.faculties.findIndex((s1)=> s1.name==facultyList[i])
            if(data.faculties[index].courses.indexOf(req.body.name)===-1){
              data.faculties[index].courses.push(req.body.name)
            }
          }
        
          let index=data.courses.findIndex((c1)=> c1.courseId===updatedCourseDetails.courseId);
          courses[index]=updatedCourseDetails;
        res.send(updatedCourseDetails);
    },
    addStudentDetails: function(req, res) {
        const cust = {
            name: req.body.name,
            dob: req.body.dob,
            gender: req.body.gender,
            about: req.body.about,
          };
        let index=data.students.findIndex(s1=> s1.name===req.body.name);
        let id=data.students[index].id;
        let courses=data.students[index].courses;
        data.students[index]= {id:id,...cust,courses:courses}
        //if null then send error
        res.send({
            status:1,
            result:data.students[index]
        });
    },
    getStudentClass: function(req, res) {
      let id=req.params.id;
      let student=data.students.find(s1=> s1.id===id); 
      let classes1=data.classes.filter(c1=> student.courses.find(c2=> c1.course===c2 ))
       res.send(classes1);
    },
    addClass: function(req, res) {
        const cust = {
            course:req.body.course,
            time:req.body.time,
            endTime:req.body.endTime,
            topic:req.body.topic,
            facultyName:req.body.facultyName
          };
          let maxId= data.classes.reduce((acc,curr)=> curr.classId>acc? curr.classId:acc,0);
          let newClass= {classId:maxId+1,...cust};
          data.classes.push(newClass);
        //if null then send error
        res.send(newClass);
    },
    editClass: function(req, res) {
        let id= +req.params.id;
        const updatedClassDetails = {
          course:req.body.course,
          time:req.body.time,
          endTime:req.body.endTime,
          topic:req.body.topic,
          facultyName:req.body.facultyName
          };
          console.log(updatedClassDetails)
          let index=data.classes.findIndex((c1)=> c1.classId===id);
          data.classes[index]={classId:id,...updatedClassDetails};
          let class1= {classId:id,...updatedClassDetails};
        res.send(class1);
    },
    test: function(req,res){
        let sql = "SELECT * FROM users";
        server.client.query(sql, function (err, result) {
          if (err) {
            console.log(err);
          } else {
            let arr1 = result;
            res.send(arr1.rows);
          }
        });
    }

}
var helper = {
    pagination: function (obj, page) {
        let postCount = obj.length;
        let perPage = 3;
        //const pageCount = Math.ceil(postCount / perPage);
        let resArr = obj;
        resArr = resArr.slice(page * perPage - perPage, page * perPage);
        return resArr;
    }
}

module.exports = functions