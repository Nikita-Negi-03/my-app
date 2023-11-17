var data= require("../sampleData")
var functions = {
    test: function (req,res){

        return res.json({
            status:1,
            result: data.students
        })
    },
    enrollStudent: function (req,res){
        let name= req.body.name;
        let parentName = req.body.parentName;
        let courses = rq.body.courses;

    }
}

module.exports = functions