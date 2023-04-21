const services = require('../services/taskServices')
const { infoLogger } = require('../utils/logger')
const {successfulTaskCreation,invalidData,errorCode, successCode, badRequestCode, successfulCreationCode, resourceConflictCode, invalidAuthenticationCode, loginSuccess, invalidFile, successfulAccountCreation, userNameResourceConflict, invalidPassword,dataNotFoundCode,invalidUserName,saltRound,tokenRequiredCode,invalidToken,tokenRequired,idConflict} = require('../utils/constants')
const { response } = require('express')
const {inputValidation,addLogger} = require('../utils/helper')

/**
 * The function creates a task and logs relevant information using different loggers based on the
 * response status code.
 * @param req - req stands for request and is an object that contains information about the HTTP
 * request that was made, such as the request body, headers, URL, and method. It is passed as a
 * parameter to the createTask function.
 * @param res - `res` is the response object that is used to send the HTTP response back to the client.
 * It is an object that has methods like `status()` and `send()` that are used to set the status code
 * and send the response body respectively.
 */
const createTask = async (req,res)=>{
    infoLogger.info("start :: createTask function")
    let inValid = await inputValidation(req.body.dueDate,req.body.taskId)
    if(inValid){
        res.status(badRequestCode).send(invalidData);
        await addLogger(badRequestCode,invalidData,req.originalUrl,req.originalUrl,req.ip)
    }
    else {
        let response=await services.createTask(req.body,req.user)
        await addLogger(response.statusCode,response.message,req.originalUrl,req.method,req.ip)
        res.status(response.statusCode).send(response.message)
    }
    infoLogger.info("End :: createTask function")
}

/**
 * This is an asynchronous function that reads a task and logs information using different loggers.
 * @param req - req stands for request and it is an object that contains information about the HTTP
 * request that was made, such as the request URL, request method, request headers, request body, and
 * so on. It is typically passed as the first parameter to an Express route handler function.
 * @param res - `res` is the response object that is sent back to the client making the request. It
 * contains information such as the status code, headers, and the response body. In this code snippet,
 * `res` is used to send the response back to the client with the appropriate status code and message.
 */
const readTask = async (req,res)=> {
    infoLogger.info("start :: readTask function")
    await addLogger(response.statusCode,response.message,req.originalUrl,req.method,req.ip)
    res.status(response.statusCode).send(response.message)
    infoLogger.info("End :: readTask function")
}

/**
 * This function reads a single task and returns a response based on the status code.
 * @param req - req stands for request and it is an object that contains information about the HTTP
 * request that was made, such as the request parameters, headers, and body. It is passed as a
 * parameter to the readSingleTask function.
 * @param res - The "res" parameter is the response object that is used to send the HTTP response back
 * to the client. It contains methods such as "status" to set the HTTP status code, and "send" to send
 * the response body.
 */
const readSingleTask = async(req,res)=> {
    infoLogger.info("start :: readSingleTask function")
    let response = await services.readSingleTask(req.params.id,req.user)
    await addLogger(response.statusCode,response.message,req.originalUrl,req.method,req.ip)
    res.status(response.statusCode).send(response.message)
    infoLogger.info("End :: readSingleTask function")
}

/**
 * This is an asynchronous function in JavaScript that updates a task and logs relevant information
 * using different loggers based on the response status code.
 * @param req - req stands for request and it is an object that contains information about the HTTP
 * request that was made, such as the request parameters, headers, and body. It is passed as a
 * parameter to the updateTask function.
 * @param res - The "res" parameter is the response object that is used to send the response back to
 * the client making the request. It contains methods like "status" and "send" that are used to set the
 * HTTP status code and send the response message respectively.
 */
const updateTask = async(req,res)=>{
    infoLogger.info("start :: updateTask function")
    let response=await services.updateTask(req.params.id,req.body,req.user)
    await addLogger(response.statusCode,response.message,req.originalUrl,req.method,req.ip)
    res.status(response.statusCode).send(response.message)
    infoLogger.info("End :: updateTask function")
}

/**
 * The function deletes a task and logs appropriate messages based on the response.
 * @param req - req stands for request and it is an object that contains information about the HTTP
 * request that was made, such as the request parameters, headers, and body. It is passed as a
 * parameter to the deleteTask function.
 * @param res - `res` is the response object that is used to send the response back to the client. It
 * is an instance of the Express.js `Response` object.
 */
const deleteTask = async(req,res)=>{
    infoLogger.info("start :: deleteTask function")
    let response=await services.deleteTask(req.params.id,req.user)
    await addLogger(response.statusCode,response.message,req.originalUrl,req.method,req.ip)
    res.status(response.statusCode).send(response.message)
    infoLogger.info("End :: deleteTask function")
}

/**
 * This is a function that filters tasks based on criteria and value provided in the request query and
 * logs the response.
 * @param req - req is an object that represents the HTTP request made by the client to the server. It
 * contains information such as the request method, request headers, request parameters, request body,
 * and more. In this specific function, it is used to extract the query parameters (criteria and value)
 * and the user information
 * @param res - `res` is the response object that is used to send the response back to the client. It
 * is an instance of the Express `Response` object and has methods like `status()` and `send()` that
 * are used to set the HTTP status code and send the response message respectively.
 */
const filterTask = async(req,res)=> {
    infoLogger.info("start :: filterTask function")
    let response = await services.filterTask(req.query.criteria,req.query.value,parseInt(req.query.pageSize),req.query.page,req.user)
    await addLogger(response.statusCode,response.message,req.originalUrl,req.method,req.ip)
    res.status(response.statusCode).send(response.message)
    infoLogger.info("End :: filterTask function")
}

const sortingTask = async(req,res)=> {
    infoLogger.info("start :: sortingTask function")
    let response = await services.sortingTask(req.query.criteria,req.query.value,parseInt(req.query.pageSize),req.query.page,req.user)
    await addLogger(response.statusCode,response.message,req.originalUrl,req.method,req.ip)
    res.status(response.statusCode).send(response.message)
    infoLogger.info("End :: sortingTask function")
}
module.exports={createTask,readTask,readSingleTask,updateTask,deleteTask,filterTask,sortingTask}

