const fs=require('fs')
const {fileRead, fileWrite}=require('../utils/fileIo')
/**
 * The function adds a new buddy to a JSON file and returns a success message or an error if the file
 * is not found.
 * @param body - The parameter `body` is an object that represents the new buddy to be added to the
 * JSON file. It should have the following properties:
 * @returns a string "Buddy has been added" if the buddy is successfully added to the JSON file, and it
 * is returning an error object if there is an error in reading or writing the file.
 */
const addNewBuddy= async(body)=>{
    let addBuddy
    try {
        let fileData = await fileRead('assets/cdw_ace23_buddies.json')
        addBuddy=JSON.parse(fileData)
        let flag=addBuddy.some((data)=>data.employeeId == body.employeeId)
        if(flag) {
            return {
                "statusCode":409,
                "message":"Id already exists"
            }
        }
        addBuddy.push(body)
        await fileWrite('assets/cdw_ace23_buddies.json',JSON.stringify(addBuddy))
        return {
            "statusCode":201,
            "message":"Buddy has been added successfully"
        }
    } catch (err) {
        return err
    }
    
}

/**
 * The function reads a JSON file containing buddy information and returns the data as an object.
 * @returns either the parsed JSON data from the file or an error if the file is not found.
 */
const listBuddy=async()=>{
    let buddyData
    try{
        let fileData = await fileRead('assets/cdw_ace23_buddies.json')
        let buddyInfo=JSON.parse(fileData)
        buddyData=buddyInfo
        return buddyData
    }
    catch(err) {
        return err
    }
}


/**
 * This function reads a JSON file containing buddy information and returns a single buddy's
 * information based on their employee ID or real name.
 * @param value - The parameter `value` is a string that represents either an employee ID or a real
 * name of a buddy. This function reads a JSON file containing information about buddies and returns an
 * array of objects that match the given `value`.
 * @returns The function `listSingleBuddy` returns a Promise that resolves to an array of objects
 * representing a single buddy whose `employeeId` or `realName` matches the input `value`. If the file
 * is empty, it logs a message "file is empty". If the file is not found, it logs a message "file not
 * found" and returns the error.
 */
const listSingleBuddy = async (value) => {
    try{
        let fileData= await fileRead('assets/cdw_ace23_buddies.json')
        let buddyData = JSON.parse(fileData)
        let singleBuddy = buddyData.find((buddyInfo) => buddyInfo.employeeId == value || buddyInfo.realName == value);
        if(singleBuddy == undefined){
            return "buddy does not exists"
        }
        return singleBuddy;
    }
    catch(err) {
        return err
    }
}

/**
 * The function updates a buddy's nickname and hobbies in a JSON file based on their employee ID.
 * @param id - The ID of the buddy that needs to be updated.
 * @param body - The `body` parameter is an object that contains the updated information for a buddy.
 * It has two properties: `nickName` and `hobbies`. These properties hold the new nickname and hobbies
 * for the buddy with the specified `id`.
 * @returns a string "buddy updated successfully" if the buddy is updated successfully, and an error
 * object if there is an error while updating the buddy.
 */
const updateBuddy=async (id,body)=>{
    try{
        let fileData=await fileRead('./assets/cdw_ace23_buddies.json')
        let getBuddy=JSON.parse(fileData)
        let flag = getBuddy.some((buddy)=>{
            if(buddy.employeeId == id) {
                buddy.nickName = body.nickName;
                buddy.hobbies = body.hobbies;
                return true
            }
        })
        if(!flag) {
            return {
                "statusCode":404,
                "message":"buddy doesn't exists"
            }
        }
        await fileWrite('./assets/cdw_ace23_buddies.json',JSON.stringify(getBuddy))
        return {
            "statusCode":200,
            "message":"buddy updated successfully"
        }
    }
    catch(err) {
        return err
    }
    
}

/**
 * This function deletes a buddy from a JSON file based on their employee ID.
 * @param id - The parameter `id` is the unique identifier of the buddy that needs to be deleted from
 * the JSON file. It is used to find the index of the buddy in the array of buddies and then remove it
 * using the `splice()` method.
 * @returns a string "Buddy deleted successfully" if the buddy is deleted successfully from the JSON
 * file. If there is an error, it returns the error object.
 */
const deleteBuddy= async (id)=>{
    try {
        let fileData = await fileRead('assets/cdw_ace23_buddies.json')
        let buddy=JSON.parse(fileData)
        let flag=buddy.some((buddyInfo)=>buddyInfo.employeeId == id)
        if(!flag)
        {
            return {
                "statusCode":404,
                "message":"buddy doesn't exists"
            }
        }
        let buddyData=buddy.filter((buddyInfo)=>buddyInfo.employeeId!=id)
        await fileWrite('assets/cdw_ace23_buddies.json',JSON.stringify(buddyData))
        return {
            "statusCode":200,
            "message":"buddy deleted successfully"
        }
        
    }
    catch(err) {
        return err
    }
    
}

module.exports={addNewBuddy,listBuddy,listSingleBuddy,updateBuddy,deleteBuddy}