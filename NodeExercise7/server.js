//importing required modules
const express=require('express')
const {errorLogger}=require('./utils/logger');
const cors=require('cors')
const dotenv=require('dotenv')
const taskRouter=require('./routes/taskRouter')
const userRouter=require('./routes/userRouter')
const{fileRead,fileWrite} = require('./utils/fileIo')
const{errorCode,invalidFile} = require('./utils/constants')
const app=express()
dotenv.config()
app.use(express.json());

/* `app.use(cors())` is a middleware function that enables Cross-Origin Resource Sharing (CORS) for the
Express application. CORS is a security feature implemented in web browsers that restricts web pages
from making requests to a different domain than the one that served the web page. By default, web
browsers block such requests, but CORS allows web pages to make cross-domain requests. */
app.use(cors({
    origin:"*",
    methods:"GET,PUT,POST,DELETE"
}))

/* `app.use('/task',taskRouter)` and `app.use('/user',userRouter)` are middleware functions that mount
the `taskRouter` and `userRouter` routers to the specified paths. This means that any requests that
start with `/task` will be handled by the `taskRouter` router, and any requests that start with
`/user` will be handled by the `userRouter` router. These routers contain the logic for handling
specific routes and HTTP methods related to tasks and users, respectively. */
app.use('/task',taskRouter)
app.use('/user',userRouter)

/* This code block is starting the server and performing some initial setup tasks. */
app.listen(process.env.PORT,async ()=>{
    console.log("Server is running on http://localhost:"+process.env.PORT);
    try {
        let taskData = await fileRead('./database/taskData.json')
        if(taskData.length == 0){
            await fileWrite('./database/taskData.json',JSON.stringify({}))
        }
        let userData = await fileRead('./database/userData.json')
        if(userData.length == 0){
            await fileWrite('./database/userData.json',JSON.stringify([]))
        }

    }
    catch(err) {
        errorLogger.error(`${errorCode} - ${invalidFile} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(500).send(invalidFile);
    }
})


