//importing the required modules
const express=require('express')
const {list,listSingleBuddy,addNewBuddy,updateBuddy,deleteBuddy} = require('../controller/buddyController')
const { warningLogger } = require('../utils/logger')
const router=express.Router()
//creating router
router.get('/list',list)
router.get('/listSingleBuddy/:value',listSingleBuddy)
router.post('/addNewBuddy',addNewBuddy)
router.put('/updateBuddy/:id',updateBuddy)
router.delete('/deleteBuddy/:id',deleteBuddy)
router.use('/', (req, res)=>{
    res.status(404).send("API Doesn't serves this request")
    warningLogger.warn("API Doesn't serves this request")
});
module.exports=router
