const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv')
const {addLogger} = require('../utils/helper')
const {tokenRequiredCode, invalidAuthenticationCode, invalidToken, tokenRequired} = require('../utils/constants')
dotenv.config()
/**
 * This is an asynchronous function that uses the bcrypt library to compare a password and a hash and
 * returns a boolean value indicating whether they match.
 * @param password - The password parameter is the plain text password that needs to be validated
 * against the hash.
 * @param hash - The `hash` parameter is a string representing the hashed password that needs to be
 * validated. It is typically generated using a hashing algorithm like bcrypt and stored in a database
 * for later comparison with the user's input password.
 * @returns a boolean value, which is stored in the `flag` variable. The boolean value indicates
 * whether the `password` matches the `hash` or not.
 */
const validation = async (password,hash)=>{
    let flag
    await bcrypt.compare(password,hash)
        .then((result)=>{
            flag = result
        })
        .catch((err)=>{console.log(err)})
    return flag
}

/**
 * This function verifies a token in the request header and adds a logger for successful or failed
 * authentication.
 * @param req - req stands for request and it is an object that contains information about the HTTP
 * request that is made to the server. It includes information such as the request method, request
 * headers, request body, request parameters, and more.
 * @param res - `res` is the response object that is used to send the response back to the client
 * making the request. It contains methods like `status()` to set the HTTP status code, `send()` to
 * send the response body, and many others.
 * @param next - `next` is a function that is called to pass control to the next middleware function in
 * the stack. It is typically used to move on to the next function after the current middleware
 * function has completed its task.
 * @returns The function `verifyToken` returns either a call to `next()` if the token is successfully
 * verified, or a response with an error status code and message if there is no token or the token is
 * invalid.
 */
const verifyToken = async (req, res, next) => {
    const token = req.headers["authorization"].split(" ")[1];
    if (!token) {
      await addLogger(tokenRequiredCode,tokenRequired,req.originalUrl,req.method,req.ip)
      return res.status(tokenRequiredCode).send(tokenRequired);
    }
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = data.userName
      return next();
    } catch (err) {
      await addLogger(invalidAuthenticationCode,invalidToken,req.originalUrl,req.method,req.ip)
      return res.status(invalidAuthenticationCode).send(invalidToken);
    }
};
module.exports = {validation,verifyToken} 

