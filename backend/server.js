import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
const app = express();
app.use(express.json())
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: 'studentdata'
});

app.get("/getstudents", (req, res) => {
    const sql = "select * from student";
    db.query(sql, (err, data) => {
        if (err)
            return res.json(err);
        return res.json(data)
    })
})
app.post("/new_add", (req, res) => {
    const sql = "insert into student(name,fees,mo_number,std) values(?)";
    const values = [
        req.body.name,
        req.body.fees,
        req.body.mo_number,
        req.body.std
    ]
    db.query(sql, [values], (err, data) => {
        if (err)
            return res.json(err);

        return res.json(data)
    })
})

app.put("/edit/:rollno", (req, res) => {
    const {rollno}=req.params;
    const {name,fees,mo_number,std}=req.body
    const sql = "update student set name=?,fees=?,mo_number=?, std=? where ROLLNO=?";
    db.query(sql, [name,fees,mo_number,std,rollno], (err, data) => {
        if (err)
            return res.json(err)
            return res.json(data)
    })
})

app.delete("/delete/:rollno",(req,res)=>{
    const { rollno } = req.params;
    const sql = "delete from student where rollno= ?";
    db.query(sql, rollno , (err,data) =>{
        if(err){
            console.log(err);
        }
        return res.json(data)
    });
  });
app.listen(8800, () => {    
    console.log("listen server started")
});
