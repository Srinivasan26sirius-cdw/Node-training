const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const moment = require('moment')
const { warningLogger, infoLogger, errorLogger } = require('../utils/logger')
/**
 * This is an asynchronous function that takes a password and a salt round as input, uses bcrypt to
 * hash the password, and returns the hashed value.
 * @param password - The password parameter is the string that needs to be encrypted or hashed.
 * @param saltRound - The `saltRound` parameter is the number of rounds of hashing that bcrypt will
 * perform to generate the salt. The higher the number, the more secure the hash will be, but it will
 * also take longer to generate. A common value for `saltRound` is 10.
 * @returns The function `encrypt` returns the hashed value of the password after it has been encrypted
 * using the `bcrypt` library.
 */
const encrypt = async (password, saltRound) => {
    let hashedValue
    await bcrypt.hash(password, saltRound)
        .then((hash) => {
            hashedValue = hash
        })
        .catch((err) => { console.log(err) })
    return hashedValue
}
/**
 * This function generates a JSON Web Token (JWT) with a specified expiration time for a given
 * username.
 * @param name - The `name` parameter is a string representing the user's name, which will be used to
 * generate a JSON Web Token (JWT).
 * @returns The function `generateToken` returns a JSON Web Token (JWT) that contains the `userName`
 * property with the value of the `name` parameter passed to the function. The token is signed using
 * the `JWT_SECRET_KEY` environment variable and has an expiration time of 1800 seconds (30 minutes).
 */
const generateToken = async (name) => {
    let token = await jwt.sign(
        { userName: name },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: "1800s",
        }
    )
    return token
}
/**
 * The function checks if a given date and ID are valid based on certain conditions.
 * @param date - The `date` parameter is a string representing a date in the format 'DD/MM/YYYY'.
 * @param id - The "id" parameter is likely a string or number representing an identification number or
 * code. The function is checking if the id parameter only contains numbers using a regular expression.
 * @returns a boolean value. If the input `date` is not a valid date in the format 'DD/MM/YYYY' or the
 * input `id` contains non-numeric characters, the function returns `true`. Otherwise, it returns
 * `false`.
 */
const inputValidation = (date, id) => {
    let validDate = moment(date, 'DD/MM/YYYY', true).isValid()
    if (!((/^[0-9]*$/).test(id)) || !validDate) {
        return true
    }
    else {
        return false
    }
}
/**
 * The function adds logging based on the status code, message, URL, method, and IP address.
 * @param statusCode - The HTTP status code of the request/response.
 * @param message - The message is a string that describes the status of the request/response. It could
 * be a success message or an error message.
 * @param url - The URL of the request being logged.
 * @param method - The HTTP method used in the request, such as GET, POST, PUT, DELETE, etc.
 * @param ip - The "ip" parameter in the "addLogger" function is likely referring to the IP address of
 * the client making the request to the server. This information can be useful for logging and tracking
 * purposes.
 */
const addLogger = (statusCode, message, url, method, ip) => {
    if (statusCode >= 200 && statusCode < 300)
        infoLogger.info(`${statusCode} - ${message} - ${url} - ${method} - ${ip}`);
    else if (statusCode >= 400 && statusCode < 500)
        warningLogger.warn(`${statusCode} - ${message} - ${url} - ${method} - ${ip}`);
    else if (statusCode >= 500 && statusCode < 600)
        errorLogger.error(`${statusCode} - ${message} - ${url} - ${method} - ${ip}`);
    else
        console.log("status code does not exists")
}
/**
 * The function `getKey` searches for a specific user in an object and returns the key associated with
 * that user.
 * @param userData - The `userData` parameter is an object that contains data about users.
 * @param user - The `user` parameter is a string representing the user for which we want to find the
 * corresponding key in the `userData` object.
 * @returns The function `getKey` returns either the key (property name) in the `userData` object that
 * matches the `user` parameter, or `false` if there is no match.
 */
const getKey = (userData, user) => {
    for (const data in userData) {
        if (data === user) {
            return data
        }
    }
    return false
}
/**
 * The function takes in parameters for pagination and returns an object with the start and end indices
 * for the current page, as well as the current page number.
 * @param page - The "page" parameter is a string or number that represents the page number or the
 * direction to move to the previous or next page. If it is "prev", the function will return the index
 * of the previous page. If it is "next", the function will return the index of the next page
 * @param pageSize - pageSize refers to the number of items or records that can be displayed on a
 * single page of a paginated list or table. It is used in conjunction with the current page number to
 * determine the starting and ending indices of the items to be displayed on that page.
 * @param currPage - The current page number.
 * @returns The function `getIndex` returns an object with three properties: `start`, `end`, and
 * `currentPage`. The `start` property represents the starting index of the current page, the `end`
 * property represents the ending index of the current page, and the `currentPage` property represents
 * the current page number.
 */
const getIndex = (page, pageSize, currPage) => {
    if (page == "prev") {
        page = currPage - 1
    }
    else if (page == "next") {
        page = currPage + 1
    }
    else {
        page = parseInt(page)
    }
    return {
        start: (page - 1) * pageSize,
        end: page * pageSize,
        currentPage: page
    }

}
module.exports = { encrypt, generateToken, inputValidation, addLogger, getKey, getIndex }
