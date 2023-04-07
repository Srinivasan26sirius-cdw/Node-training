let addServices = require('../services/buddyServices')
let {warningLogger, infoLogger, errorLogger} = require('../utils/logger')
/**
 * This function lists buddies and returns a JSON response with a 200 status code, or a 400 status code
 * with an error message if there is an error.
 * @param req - req stands for request and it is an object that contains information about the incoming
 * HTTP request such as the request method, request headers, request parameters, and request body.
 * @param res - The `res` parameter is the response object that is used to send a response back to the
 * client who made the request. It contains methods such as `status()` to set the HTTP status code,
 * `send()` to send a response body, and `json()` to send a JSON response.
 * @param err - The `err` parameter is an error object that may be passed to the `list` function. If an
 * error occurs during the execution of the function, it will be caught and handled in the `if`
 * statement block.
 */
const list=async(req,res)=>{
    try{
        let response=await addServices.listBuddy()
        if(response instanceof Error) throw response
        res.status(200).json(response)
        infoLogger.info(`200 - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        }
    catch(err) {
        errorLogger.error(`500 - ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(500).send("Internal Server Error");
    }
}


/**
 * This is an asynchronous function that lists a single buddy and returns a response based on the
 * outcome.
 * @param req - req stands for request and it is an object that contains information about the HTTP
 * request that was made, such as the request parameters, headers, body, and more. It is passed as a
 * parameter to the function.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client making the request. It contains methods such as `status()` to set the HTTP status code,
 * `send()` to send a response body, and `json()` to send a JSON response.
 * @param err - The `err` parameter is an error object that may be passed to the function as an
 * argument. It is used to handle any errors that may occur during the execution of the function.
 */
const listSingleBuddy=async (req,res)=>{ 
    try{
        let response = await addServices.listSingleBuddy(req.params.value)
        if(response instanceof Error) throw response
        if(typeof response === 'string' || response instanceof String) {
            res.status(404).send(response)
            warningLogger.warn(`404 - ${response} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        }
        else {
            res.status(200).json(response)
            infoLogger.info(`200 - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        }
    }
    catch(err){
        errorLogger.error(`500 - ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(500).send("Internal Server Error");
    }
    
    
}

/**
 * This is an asynchronous function that adds a new buddy and sends a response message with a status
 * code.
 * @param req - req stands for request and it is an object that contains information about the incoming
 * HTTP request such as the request headers, request parameters, request body, etc. It is used to
 * retrieve data from the client-side and pass it to the server-side for processing.
 * @param res - `res` is the response object that is used to send the response back to the client. It
 * contains methods like `status()` to set the HTTP status code, `send()` to send the response body,
 * and `json()` to send a JSON response.
 * @param err - The `err` parameter is an error object that may be passed to the function if an error
 * occurs during the execution of the function. It is used to handle errors and send an appropriate
 * response to the client.
 */
const addNewBuddy=async (req,res)=>{
    try{
        let response=await addServices.addNewBuddy(req.body)
        if(response instanceof Error) throw response
        if(response.statusCode==409) {
            res.status(response.statusCode).send(response.message);
            warningLogger.warn(`409 - ${response.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        }
        else {
            res.status(response.statusCode).send(response.message);
            infoLogger.info(`201 - ${response.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        }
    }
    catch(err){
        errorLogger.error(`500 - ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(500).send("Internal Server Error");
    }
}

/**
 * This is an asynchronous function that updates a buddy's information and sends a response with a
 * status code and message.
 * @param req - req stands for request and it is an object that contains information about the incoming
 * HTTP request such as the request parameters, headers, body, etc. It is passed as a parameter to the
 * updateBuddy function.
 * @param res - `res` is the response object that is used to send the response back to the client. It
 * contains methods like `status()` to set the HTTP status code, `send()` to send the response body,
 * and `json()` to send a JSON response.
 * @param err - The `err` parameter is an error object that may be passed to the function if an error
 * occurs during the execution of the function. It is used to handle errors and send an appropriate
 * response to the client.
 */
const updateBuddy=async (req,res)=>{
    try {
        let response=await addServices.updateBuddy(req.params.id,req.body)
        if(response instanceof Error) throw response
        if(response.statusCode == 404)
        {
            res.status(response.statusCode).send(response.message);
            warningLogger.warn(`404 - ${response.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        }
        else {
            res.status(response.statusCode).send(response.message);
            infoLogger.info(`200 - ${response.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        }
        
    }
    catch(err) {
        errorLogger.error(`500 - ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(500).send("Internal Server Error");
    }
    
}

/**
 * This is an asynchronous function that deletes a buddy and sends a response message with a
 * corresponding status code.
 * @param req - req stands for request and it is an object that contains information about the incoming
 * HTTP request such as the request parameters, headers, body, etc. It is used to retrieve data from
 * the client-side and pass it to the server-side for processing.
 * @param res - `res` is the response object that is used to send the response back to the client. It
 * contains methods like `status()` to set the HTTP status code, `send()` to send the response body,
 * and `json()` to send a JSON response.
 * @param err - The `err` parameter is an error object that may be passed to the function as an
 * argument. It is used to handle any errors that may occur during the execution of the function.
 */
const deleteBuddy=async (req,res)=>{
    try {
        let response=await addServices.deleteBuddy(req.params.id)
        if(response instanceof Error) throw response
        if(response.statusCode == 404)
        {
            res.status(response.statusCode).send(response.message);
            warningLogger.warn(`404 - ${response.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        }
        else {
            res.status(response.statusCode).send(response.message);
            infoLogger.info(`200 - ${response.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        }
    }
    catch(err) {
        errorLogger.error(`500 - ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(500).send("Internal Server Error");
    }
}

module.exports={list,listSingleBuddy,addNewBuddy,updateBuddy,deleteBuddy}

