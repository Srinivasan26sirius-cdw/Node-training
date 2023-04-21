const express=require('express')
const{createTask,readTask,readSingleTask,updateTask,deleteTask,filterTask,sortingTask}=require('../controller/taskController')
const{verifyToken} = require('../middlewares/authentication')
const router=express.Router()
const app=express()
app.use(express.json())
router.post('/createTask',verifyToken,createTask)
router.get('/readTask',verifyToken,readTask)
router.get('/readSingleTask/:id',verifyToken,readSingleTask)
router.put('/updateTask/:id',verifyToken,updateTask)
router.delete('/deleteTask/:id',verifyToken,deleteTask)
router.get('/filterTask',verifyToken,filterTask)
router.get('/sortingTask',verifyToken,sortingTask)
module.exports=router