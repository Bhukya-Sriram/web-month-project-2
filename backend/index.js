const express = require("express");
const cors = require("cors");
const pg = require("pg");
const app = express();


const connectionString = "postgres://bnejaoud:6G2OKLQZAVY4s67fthdYoGNfpHdkwFnd@rain.db.elephantsql.com/bnejaoud";

const client = new pg.Client(connectionString);

client.connect((err)=>{
    if (err){
        console.log("error connecting database",err);
    }else console.log("database connected");
});

// Middleware to parse JSON bodies


app.use(cors());
app.use(express.json());

const port = 8000;

app.get("/",(req,res)=>{
    client.query("SELECT * FROM users",(err,databaseRes)=>{
        if(err){
            console.log(err);
            res.status(500).send("database errored out");
        }else {
            // console.log(databaseRes);
            res.send(databaseRes.rows);
        }
    });
});

app.post("/adddata",(req,res)=>{
    console.log(req.body);

    const secretKey = req.body.secretKey;

    if (Number(secretKey) == 1234){
        const newUser = req.body.newUser;
        client.query(`INSERT INTO users (username,email) values ('${newUser.username}','${newUser.email}')`,(err,databaseRes)=>{
            if(err){
                console.log(err);
                res.status(500).send("Database errored out");
            } else {
                client.query("SELECT * FROM users", (err2, databaseRes2)=>{
                    if(err){
                        console.log(err2);
                        res.status(500).send("Database errored out");
                    }else {
                        res.send(databaseRes2.rows);
                    }
                });
            }
        });
    } else {
        res.status(400).send("User not created due to wrong key code");
    }
});

app.listen(port, ()=>{
    console.log("I am running on "+port);
});


