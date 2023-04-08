const fs=require('fs').promises;
/**
 * This is an asynchronous function that reads a file from a given URL and returns its contents as a
 * string.
 * @param url - The `url` parameter is a string that represents the file path or URL of the file that
 * needs to be read.
 * @returns The function `fileRead` is returning a promise that resolves to the contents of the file
 * located at the specified `url`. The contents are returned as a string in UTF-8 encoding.
 */
const fileRead= async(url)=>{
    let response = await fs.readFile(url,'utf-8');
    return response;
}


/**
 * The function writes data to a file at a specified URL and returns a success message.
 * @param url - The `url` parameter is a string that represents the file path where the data will be
 * written to.
 * @param data - The `data` parameter is the content that needs to be written to the file specified by
 * the `url` parameter. It can be a string, a buffer, or an object that can be serialized to JSON.
 * @returns the string "success" after writing the data to the specified file URL using the
 * `fs.writeFile` method.
 */
const fileWrite = async(url,data)=>{
    
    await fs.writeFile(url, data);
    return "success";
}
module.exports={fileRead,fileWrite}



