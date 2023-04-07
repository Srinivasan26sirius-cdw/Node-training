//importing required modules
let express=require('express')
let fs=require('fs')
let logger=require('./utils/logger');
let cors=require('cors')
require('dotenv').config()
let buddyRouter=require('./routes/buddyRouter')
let app=express()
app.use(express.json());
app.use(cors({
    origin:"*",
    methods:"GET,PUT,POST,DELETE"
}))
app.use('/buddy', buddyRouter);

//starting the server
app.listen(process.env.PORT,()=>{
    console.log("Server is running on http://localhost:"+process.env.PORT);
    fs.readFile('assets/cdw_ace23_buddies.json','utf-8',(err,data)=>{
        if(err) {
            errorLogger.error(`500 - ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(500).send("Internal Server Error");
        }
        if(data.length == 0) {
            fs.writeFile('assets/cdw_ace23_buddies.json',JSON.stringify([]),(err)=>{
                if(err) {
                    errorLogger.error(`500 - ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                    res.status(500).send("Internal Server Error");
                }
            });
        }
    })
})


