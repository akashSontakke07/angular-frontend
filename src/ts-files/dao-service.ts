import { DependencNames } from "src/constants/constant-enums";
import { HttpHeaders, HttpParams } from "@angular/common/http";
import { ApiConfigTypes, DaoDataProviderName, endPoints, ResponseStatus } from "src/constants/dao-constant";
import { checkIsNotNull } from "./common-utils";
import { ApiConfigs, HttpRequestConfig } from "./component-config-processing";
import { ComponentManagerService } from "src/ts-services/component-manager-service";


export async function doRequestFromConfig(httpConfig: HttpRequestConfig, thisObject: any, element: any): Promise<any> {
    try {
        //   if (httpConfig.dataRepositoryConfigs && checkIsNotNull(httpConfig.dataRepositoryConfigs) && checkIsNotNull(httpConfig.dataRepositoryConfigs.searchConfigs)) {
        //     const output = await getHttpDataFromDataRepository(httpConfig, thisObject, element);

        //     if (output.completed) {
        //       return output.data;
        //     } 
        //   }

        // If no data repository configs or output not completed, perform network call
        return await doNetworkCallWithLoader(httpConfig, thisObject, element);
    } catch (error) {
        console.error(error);
    }
}



export function doNetworkCallWithLoader(httpConfig: HttpRequestConfig, thisObject: any, element: any) {
    try {
        // let loaderConfigs = getLoaderConfigs(httpConfig)
        // httpConfig.loaderConfig = loaderConfigs;
        let promise = fetchDataV2(httpConfig, thisObject, element);
        return promise!;

    } catch (error) {
        throw error; // Rethrow the error for the caller to handle
    }
}

/*************************************** DaoService code starts now **********************************************************/


export async function fetchDataV2(httpRequestConfig: HttpRequestConfig, thisObject: any, element: any) {
    // Check for necessary configurations
    if (!checkIsNotNull(httpRequestConfig.httpApiConfig) ||
        !checkIsNotNull(httpRequestConfig.httpApiConfig.dataProviderName)) {
        return null;
    }

    const dataProviderName = httpRequestConfig.httpApiConfig.dataProviderName;

    try {
        switch (dataProviderName) {
            // case DaoDataProviderName.firestore:
            //     registerFirestoreDataListener(httpRequestConfig, thisObject, element);
            //     return await getDataFromFirestore(httpRequestConfig, thisObject, element);

            case DaoDataProviderName.internalApi:
                return await getDataFromDatastore(httpRequestConfig);

            // case DaoDataProviderName.externalApi:
            //     return await getDataFromExternalApi(httpRequestConfig);

            // case DaoDataProviderName.recursiveApi:
            //     return await getDataRecursivelyFromApi(httpRequestConfig, thisObject, element, 0, []);

            default:
                return null; // Handle unknown data provider names
        }
    } catch (error) {
        throw error; // Rethrow the error for the caller to handle
    }
}


export async function getDataFromDatastore(httpRequestConfig: HttpRequestConfig) {
    if (httpRequestConfig.httpApiConfig.internalApiConfigs) {
        const internalApiConfigs = httpRequestConfig.httpApiConfig.internalApiConfigs!;
        const data: any = doEndPointUrl(internalApiConfigs.apiMethod, internalApiConfigs.version, internalApiConfigs.methodName);

        const apiConfigs: ApiConfigs = {
            responseType: (httpRequestConfig.httpApiConfig?.responseType)?.toString() || '',
            httpMethod: data.method,
            url: data.url,
            type: ApiConfigTypes.INTERNAL,
            headerData: httpRequestConfig.httpApiConfig.headerData || {},
            bodyData: httpRequestConfig.httpApiConfig.bodyData || {}
        };

        httpRequestConfig.httpApiConfig.apiConfigs = apiConfigs;

        return await getDataFromApi(httpRequestConfig); // Call the API and return the result
    }

    return null; // Return null if no internal API configs are present
}


export function doEndPointUrl(apiName: any, version: any, apiMethod: any) {
    var data = {
        url: "",
        method: ""
    }
    var apiPath = endPoints[apiName][version][apiMethod];
    if (apiName === "servlet") {
        data.method = apiPath.method;
        data.url = [getEndPointURL(), apiPath.path].join('/');
        return data;
    } else {
        var gapiURL = getEndPointURL() + '/api';
        if (checkIsNotNull(apiPath) && checkIsNotNull(apiPath.path)) {
            data.method = apiPath.method;
            data.url = [gapiURL, apiName, version, apiPath.path].join('/');
            return data
        }
    }
    return data
}


// Get end point URL
export function getEndPointURL() {
    var protocol = (window.location.host.search('localhost') == -1 && window.location.host.search('192.168.') == -1
        && window.location.host.search('10.148.13.68') == -1) ? 'https://' : 'http://'
    return protocol + window.location.host
}


export async function getDataFromApi(httpRequestConfig: HttpRequestConfig, httpData? : any) {
    const preparedConfigs: ApiConfigs = httpRequestConfig.httpApiConfig.apiConfigs!;
    // showLoader(httpRequestConfig.httpApiConfig.requestId, httpRequestConfig.loaderConfig);
    try {
        const response: any = await doHttpRequest(preparedConfigs);
        //   hideLoader(httpRequestConfig.httpApiConfig.requestId);

        if (response.status === ResponseStatus.success) {
            // saveHttpDataInDataRepository(httpRequestConfig, response, DataRepositoryTypeOfData.rawData);
            return response;
        }
    } catch (error) {
        //   hideLoader(httpRequestConfig.httpApiConfig.requestId);
        throw error; // Rethrow the error for the caller to handle
    }
}


async function doHttpRequest(apiConfigs: any): Promise<any> {
    // if apiConfigs.type === ApiConfigTypes.EXTERNA => TODO Implementation
    let headers = new HttpHeaders({});
    let params = new HttpParams();
    // headers = setAuthHeaders(apiConfigs.headerData, headers);

    // Append body data to params for GET requests
    if (apiConfigs.httpMethod.toLowerCase() === 'get') {
        Object.keys(apiConfigs.bodyData).forEach((key: string) => {
            params = params.append(key, apiConfigs.bodyData[key]);
        });
    }

    return doNetworkRequest(apiConfigs, headers, params);
}


async function doNetworkRequest(apiConfigs: any, headers: HttpHeaders, params: HttpParams): Promise<any> {
    try {
        const http = ComponentManagerService.getInstance().getLatestComponentByName(DependencNames.httpClient); // Replace with your HttpClient instance
        const response: any = await http
            .request(apiConfigs.httpMethod.toLowerCase(), apiConfigs.url, {
                body: apiConfigs.bodyData,
                headers: headers,
                observe: 'events',
                params: params,
                responseType: apiConfigs.responseType || '',
            })
            .toPromise();

        if (checkIsNotNull(response) && checkIsNotNull(response.body) && response.body.status === ResponseStatus.success) {
            // updateAuthValue(response.headers, apiConfigs.headerData);
            return response.body;
        } else {
            if (response && response.body) {
                // response = handleHttpError(response);
                throw new Error(response.body);
            }
        }
    } catch (error) {
        // updateAuthValue(error.headers, apiConfigs.headerData);
        // error = handleHttpError(error);
        throw error;
    }
}