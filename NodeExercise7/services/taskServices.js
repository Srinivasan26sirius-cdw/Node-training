const { fileRead, fileWrite } = require('../utils/fileIo')
const { successCode, idConflict, taskNotFound, successfulTaskUpdation, matchNotFound, successfulTaskDeletion, taskCreationRequired, badRequestCode, errorCode, successfulCreationCode, resourceConflictCode, successfulTaskCreation, invalidAuthenticationCode, loginSuccess, invalidFile, successfulAccountCreation, userNameResourceConflict, invalidPassword, dataNotFoundCode, invalidUserName, saltRound, tokenRequiredCode, invalidToken, tokenRequired } = require('../utils/constants')
const { getKey, getIndex } = require('../utils/helper')
/**
 * The function creates a new task and stores it in a JSON file, checking for conflicts with existing
 * tasks.
 * @param body - The task object that contains information about the task to be created, such as
 * taskId, taskName, taskDescription, and taskStatus.
 * @param user - The user parameter is a string that represents the user for whom the task is being
 * created.
 * @returns The function `createTask` returns an object with two properties: `statusCode` and
 * `message`. The values of these properties depend on the execution of the function. If the task is
 * successfully created, the `statusCode` will be set to `successfulCreationCode` and the `message`
 * will be set to `successfulTaskCreation`. If there is an error, the `statusCode` will be set
 */
const createTask = async (body, user) => {
    try {
        let fileData = await fileRead('./database/taskData.json')
        let userData = JSON.parse(fileData)
        if (!(user in userData)) {
            let data = []
            data.push(body)
            userData[user] = data
        }
        else {
            let key = await getKey(userData, user)
            let flag = userData[key].some((value) => value.taskId == body.taskId)
            if (flag) {
                return {
                    statusCode: resourceConflictCode,
                    message: idConflict
                }
            }
            else {
                let date = new Date()
                body.comments = body.comments+" "+Date.now()+" "+date.getTime()
                userData[key].push(body)
            }
        }
        await fileWrite('./database/taskData.json', JSON.stringify(userData))
        return {
            statusCode: successfulCreationCode,
            message: successfulTaskCreation
        }
    } catch (err) {
        return {
            statusCode: errorCode,
            message: invalidFile
        }
    }

}
/**
 * This function reads task data from a JSON file for a specific user and returns it as a success
 * response or an error message.
 * @param user - The `user` parameter is a string that represents the username for which the task data
 * is being read from the `taskData.json` file.
 * @returns The function `readTask` returns an object with a `statusCode` and a `message`. If the file
 * read is successful, it returns a `statusCode` with a success code and the `taskData` for the
 * specified user as the `message`. If there is an error in reading the file, it returns a `statusCode`
 * with an error code and an error message.
 */
const readTask = async (user) => {
    try {
        let fileData = await fileRead('./database/taskData.json')
        let taskInfo = JSON.parse(fileData)
        let key = await getKey(taskInfo, user)
        let taskData = taskInfo[key]
        return {
            statusCode: successCode,
            message: taskData
        }
    }
    catch (err) {
        return {
            statusCode: errorCode,
            message: invalidFile
        }
    }
}
/**
 * The function reads a single task from a JSON file based on the task ID and user, and returns a
 * success or error message.
 * @param id - The id parameter is the unique identifier of the task that needs to be read.
 * @param user - The `user` parameter is a string that represents the username of the user whose task
 * is being searched for.
 * @returns The function `readSingleTask` returns an object with two properties: `statusCode` and
 * `message`. The `statusCode` property indicates the status of the operation (success, data not found,
 * or error), while the `message` property contains either the single task object (if the operation was
 * successful), or an error message (if the operation failed).
 */
const readSingleTask = async (id, user) => {
    try {
        let fileData = await fileRead('./database/taskData.json')
        let taskData = JSON.parse(fileData)
        let key = await getKey(taskData, user)
        let singleTask = taskData[key].find((taskInfo) => taskInfo.taskId == id);
        if (singleTask == undefined) {
            return {
                statusCode: dataNotFoundCode,
                message: taskNotFound
            }
        }
        return {
            statusCode: successCode,
            message: singleTask
        }
    }
    catch (err) {
        return {
            statusCode: errorCode,
            message: invalidFile
        }
    }
}

/**
 * This is a JavaScript function that updates a task in a JSON file based on the task ID, user, and new
 * task details provided.
 * @param id - The id of the task that needs to be updated.
 * @param body - The `body` parameter is an object that contains the updated task details such as
 * `title`, `description`, `priority`, and `dueDate`. These details will be used to update the task
 * with the specified `id`.
 * @param user - The `user` parameter is a string that represents the username of the user whose task
 * is being updated.
 * @returns an object with properties `statusCode`, `message`, `loggerType`, and `loggerLevel`. The
 * specific values of these properties depend on the execution of the function and the values of the
 * input parameters.
 */
const updateTask = async (id, body, user) => {
    try {
        let fileData = await fileRead('./database/taskData.json')
        let getTask = JSON.parse(fileData)
        let key = await getKey(getTask, user)
        let flag = getTask[key].some((task) => {
            if (task.taskId == id) {
                task.title = body.title;
                task.description = body.description;
                task.priority = body.priority;
                task.dueDate = body.dueDate;
                return true
            }
        })
        if (!flag) {
            return {
                statusCode: dataNotFoundCode,
                message: taskNotFound
            }
        }
        await fileWrite('./database/taskData.json', JSON.stringify(getTask))
        return {
            statusCode: successCode,
            message: successfulTaskUpdation
        }
    }
    catch (err) {
        return {
            statusCode: errorCode,
            message: invalidFile,
        }
    }
}

/**
 * This is a JavaScript function that deletes a task from a JSON file based on the task ID and user
 * provided.
 * @param id - The id parameter is the unique identifier of the task that needs to be deleted.
 * @param user - The `user` parameter is a string that represents the username of the user whose task
 * is to be deleted.
 * @returns an object with a "statusCode" and a "message" property. The "statusCode" property indicates
 * the status of the operation (success or error) and the "message" property provides a message
 * describing the result of the operation.
 */
const deleteTask = async (id, user) => {
    try {
        let fileData = await fileRead('./database/taskData.json')
        let taskData = JSON.parse(fileData)
        let key = await getKey(taskData, user)
        let flag = taskData[key].some((taskInfo) => taskInfo.taskId == id)
        if (!flag) {
            return {
                statusCode: dataNotFoundCode,
                message: taskNotFound
            }
        }
        let data = taskData[key].filter((taskInfo) => taskInfo.taskId != id)
        taskData[key] = data
        await fileWrite('./database/taskData.json', JSON.stringify(taskData))
        return {
            statusCode: successCode,
            message: successfulTaskDeletion
        }

    }
    catch (err) {
        return {
            statusCode: errorCode,
            message: invalidFile
        }
    }
}

/**
 * This is a function that filters task data based on a given criteria and value, and returns the
 * matching task information.
 * @param criteria - The criteria by which the tasks will be filtered (e.g. "status", "priority",
 * "dueDate").
 * @param value - The value to be used as a filter criteria for the task data.
 * @param user - The user parameter is a string that represents the user for whom the task data is
 * being filtered.
 * @returns The function `filterTask` returns an object with two properties: `statusCode` and
 * `message`. The `statusCode` property indicates the status of the operation (e.g. success, data not
 * found, error), while the `message` property provides additional information about the operation
 * (e.g. task information, error message).
 */
var currPage
const filterTask = async (criteria, value, pageSize, page, user) => {
    try {
        let fileData = await fileRead('./database/taskData.json')
        let taskData = JSON.parse(fileData)
        let key = await getKey(taskData, user)
        if (!key) {
            return {
                statusCode: dataNotFoundCode,
                message: taskNotFound
            }
        }
        let index = await getIndex(page, pageSize ,currPage)
        currPage = index.currentPage
        let taskInfo = taskData[key].filter((data) => data[criteria] == value).slice(index.start,index.end)
        if (taskInfo.length === 0) {
            return {
                statusCode: dataNotFoundCode,
                message: matchNotFound
            }
        }
        return {
            statusCode: successCode,
            message: taskInfo
        }
    }
    catch (err) {
        return {
            statusCode: errorCode,
            message: invalidFile
        }
    }
}

const sortingTask = async(criteria, value, pageSize, page, user) => {
    try {
        let fileData = await fileRead('./database/taskData.json')
        let taskData = JSON.parse(fileData)
        let key = await getKey(taskData, user)
        if (!key) {
            return {
                statusCode: dataNotFoundCode,
                message: taskNotFound
            }
        }
        let index = await getIndex(page, pageSize ,currPage)
        currPage = index.currentPage
        let taskInfo = taskData[key].sort((a,b) => (a[criteria] > b[criteria])? 1 : -1).slice(index.start,index.end)
        if (taskInfo.length === 0) {
            return {
                statusCode: dataNotFoundCode,
                message: matchNotFound
            }
        }
        return {
            statusCode: successCode,
            message: taskInfo
        }
    }
    catch (err) {
        return {
            statusCode: errorCode,
            message: invalidFile
        }
    }
}
module.exports = { createTask, readTask, readSingleTask, updateTask, deleteTask, filterTask, sortingTask }
