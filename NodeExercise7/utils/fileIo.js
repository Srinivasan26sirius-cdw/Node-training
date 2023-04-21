const fs = require('fs').promises
const fileRead = async(url)=>{
    let fileData = await fs.readFile(url,'utf-8')
    return fileData
}
const fileWrite = async(url,data)=>{
    await fs.writeFile(url,data)
    return "success"
}

module.exports = {fileRead,fileWrite}