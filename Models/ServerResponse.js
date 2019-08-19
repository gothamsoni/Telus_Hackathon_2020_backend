function serverResponse(code, title, type, detail){
    let response = {
        status: code,
        title: title,
        type: type,
        detail: detail
    }
    return response;
}

const ISE = "Internal Server Error";
const NF = "Not Found";
const PE = " Param Error";
const MS = "Malformed Syntax";
const BR = "Bad Response";

module.exports = {serverResponse, ISE, NF, PE, MS, BR};