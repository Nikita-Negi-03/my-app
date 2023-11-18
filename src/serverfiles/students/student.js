var data= require("../sampleData")
var functions = {
    allStudents: function (req,res){
        res.json({
            status:1,
            result: data.students
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
    }
}

module.exports = functions