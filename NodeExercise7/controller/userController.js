const services = require('../services/userServices')
const{successCode} = require('../utils/constants')
const {addLogger} = require('../utils/helper')
const { infoLogger } = require('../utils/logger')
const createAccount = async(req,res)=>{
    infoLogger.info("start :: createAccount function")
    let response = await services.createAccount(req.body)
    res.status(response.statusCode).send(response.message)
    await addLogger(response.statusCode,response.message,req.originalUrl,req.method,req.ip)
    infoLogger.info("End :: createAccount function")
}

const login = async(req,res)=>{
    infoLogger.info("start :: login function")
    let response = await services.login(req.body)
    if(response.statusCode === successCode) {
        res.status(response.statusCode).json(response.message)
        await addLogger(response.statusCode,"logged in successfully",req.originalUrl,req.method,req.ip)
    }
    else {
        res.status(response.statusCode).send(response.message)
        await addLogger(response.statusCode,response.message,req.originalUrl,req.method,req.ip)
    }
    infoLogger.info("End :: login function")
}
module.exports={createAccount,login}
