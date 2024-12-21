




/***************************************************************************************************************************************************
 *                                                                  Data check Code Starts
*****************************************************************************************************************************************************/

export function checkIsNotNull(param: any) {
    if (
        param === undefined ||
        param === 'undefined' ||
        param === '' ||
        param == null ||
        param == 'null' ||
        param == 'NULL'
    ) {
        return false;
    }

    return true;
}

export function checkIsNull(param: any) {
    if (
        param === undefined ||
        param === 'undefined' ||
        param === '' ||
        param == null ||
        param == 'null' ||
        param == 'NULL'
    ) {
        return true;
    }

    return false;
}

export function checkObjectIsNotNull(param: any): boolean {
    if (param === undefined || param === null) {
        return false;
    }
    if (typeof param !== 'object' && typeof param !== 'function') {
        return false;
    }
    if (typeof param === 'object' && !Object.keys(param).length) {
        return false;
    }
    return true;
}

export function checkIsNotEmpty(data: any) {
    if (checkIsNotNull(data) && data.length !== 0) {
        return true;
    }
    return false;
}
/***************************************************************************************************************************************************
 *                                                                  Data check Code Ends
*****************************************************************************************************************************************************/

/***************************************************************************************************************************************************
 *                                                                  Local Storage Code Starts
*****************************************************************************************************************************************************/

export function getLocalStorageJson(key: string) {
    if (checkIsNotNull(key)) {
        try {
            const json = localStorage.getItem(key);
            if (checkIsNotNull(json) && json) {
                return JSON.parse(json);
            }
        } catch (error) {
            logMessage(`LocalStorage data for key "${key}" could not be parsed.`, LogLevel.ERROR);
        }
    }
    return null;
}

export function setLocalStorageJson(key: string, value: any) {
    let stringifyJson = JSON.stringify(value);
    try {
        localStorage.setItem(key, stringifyJson);
    } catch (error) {
        logMessage(`LocalStorage data not found.`, LogLevel.ERROR);
    }
    return null;
}

/***************************************************************************************************************************************************
 *                                                                  Local Storage Code Ends
*****************************************************************************************************************************************************/

/***************************************************************************************************************************************************
 *                                                                  Logging Code Starts
*****************************************************************************************************************************************************/

export enum LogLevel {
    //use while printing static messages
    INFO = "INFO",
    //use while printing errors
    ERROR = "ERROR",
    //use while printing config related data
    CONFIG = "CONFIG",
    //use to log extra statements during development
    DEBUG = "DEBUG",
    //use to log data
    DATA = "DATA"
}

export function logMessage(message: string, level: LogLevel) {
    switch (level) {
        case LogLevel.INFO:
            // console.log(message);
            break;

        case LogLevel.ERROR:
            console.log(message);
            break;

        case LogLevel.CONFIG:
            console.log(message);
            break;

        case LogLevel.DEBUG:
            console.log(message);
            break;

        case LogLevel.DATA:
            console.log(message);
            break;
    }
}


/***************************************************************************************************************************************************
 *                                                                  Logging Code Ends
*****************************************************************************************************************************************************/
