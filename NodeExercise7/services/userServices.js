const { fileRead, fileWrite } = require('../utils/fileIo')
const { validation } = require('../middlewares/authentication')
const { encrypt , generateToken} = require('../utils/helper')
const { successCode, badRequestCode, successfulCreationCode, resourceConflictCode, invalidAuthenticationCode,invalidFile, successfulAccountCreation, userNameResourceConflict, invalidPassword, dataNotFoundCode, invalidUserName, saltRound } = require('../utils/constants')
const createAccount = async (body) => {
    try {
        let fileData = await fileRead('./database/userData.json')
        let userData = JSON.parse(fileData)
        let flag = userData.some((user) => user.userName === body.userName)
        if (flag) {
            return {
                statusCode: resourceConflictCode,
                message: userNameResourceConflict
            }

        }
        let hashedValue = await encrypt(body.password, saltRound)
        body.password = hashedValue
        userData.push(body)
        await fileWrite('./database/userData.json', JSON.stringify(userData))
        return {
            statusCode: successfulCreationCode,
            message: successfulAccountCreation
        }
    }
    catch (err) {
        return {
            statusCode: badRequestCode,
            message: invalidFile
        }
    }
}
const login = async (body) => {
    try {
        let fileData = await fileRead('./database/userData.json')
        let userData = JSON.parse(fileData)
        let data = userData.find((user) => user.userName === body.userName)
        if (data === undefined) {
            return {
                statusCode: dataNotFoundCode,
                message: invalidUserName
            }
        }
        let flag = await validation(body.password, data.password)
        if (!flag) {
            return {
                statusCode: invalidAuthenticationCode,
                message: invalidPassword
            }
        }
        const token = await generateToken(data.userName)
        return {
            statusCode: successCode,
            message:token
        }
    }
    catch (err) {
        return {
            statusCode: badRequestCode,
            message: invalidFile
        }
    }
}
module.exports = { createAccount, login }
