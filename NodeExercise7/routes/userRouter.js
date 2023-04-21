const express=require('express')
const{createAccount,login}=require('../controller/userController')
const router=express.Router()
const app=express()
app.use(express.json())
router.post('/createAccount',createAccount)
router.post('/login',login)
module.exports=router
