import { ActionEventNames, ComponentNames, DataTypes, PromiseType, RetrievalSources } from "src/constants/constant-enums";
import { checkIsNotEmpty, checkIsNotNull, checkObjectIsNotNull, getLocalStorageJson, LogLevel, logMessage, setLocalStorageJson } from "./common-utils";
import { ComponentManagerService } from "src/ts-services/component-manager-service";
import * as _ from 'lodash';
import { ComponentRef, ElementRef, ViewContainerRef } from "@angular/core";
import { COMPONENT_REF } from "src/constants/componentRef-constants";
import { doRequestFromConfig } from "./dao-service";
/*
 * This file is responsible for [ process configs ].
 * 
 * Do not expose any variables from this file.
 * 
 * expose method in  All Publicly accessible methods
 */

/**************************************************************************************************************************************************************************
 *                                                               ------  All Publicly accessible methods Starts  ------
**************************************************************************************************************************************************************************/

/*************** Starts call this method from OnInit for every component ***************/
export function getPropertiesCore(configs: ComponentConfigs, thisObject: any) {
    return getProperties(configs, thisObject);
}

export function initializeComponentCore(configs: ComponentConfigs, componentName: ComponentNames, thisObject: any, element: any, defaultConfigs: ComponentConfigs | null = null) {
    return initializeComponent(configs, componentName, thisObject, element, defaultConfigs)
}

export function getChildConfigsCore(configs: ComponentConfigs): Record<string, ComponentConfigs> | {} {
    return getChildConfigs(configs)
}

/*************** Ends call this method from OnInit for every component ***************/

/*************** Starts call this method from ngAfterViewInit for every component ***************/

export function executeAfterViewInitConfigsCore(configs: ComponentConfigs, componentName: ComponentNames, thisObject: any, element?: any, defaultConfigs: ComponentConfigs | null = null) {
    return executeAfterViewInitConfigs(configs, componentName, thisObject, defaultConfigs)
}

/*************** Ends call this method from ngAfterViewInit for every component ***************/

/*************** Starts call this method from OnDestroy for every component ***************/

export function destroyComponentCore(configs: ComponentConfigs, componentName: ComponentNames, thisObject: any, element: any) {
    destroyComponent(configs, componentName, thisObject, element)
}

/*************** Ends call this method from OnDestroy for every component ***************/

/*************** Starts Imp functions ***************/

export function executeActionEventsCore(configs: ActionEventConfigs, eventName: ActionEventNames, thisObject: any, element: any, data: any = {}) {
    return executeActionEvents(configs, eventName, thisObject, element, data);
}

export function executeActionEventsByNameCore(configs: ComponentConfigs, thisObject: any, element: any, eventName: any) {
    executeActionEventsByName(configs, thisObject, element, eventName);
}

export function fetchDataRecursivelyCore(array: string[], object: any) {
    return fetchDataRecursively(array, object)
}

export function addComponentDynamicallyCore(configs: ComponentConfigs[], thisObject: any, data?: any) {
    addComponentDynamically(configs, thisObject, data);
}
/*************** Ends Imp functions ***************/

/**************************************************************************************************************************************************************************
 *                                                               ------  All Publicly accessible methods Ends  ------
**************************************************************************************************************************************************************************/




/**************************************************************************************************************************************************************************
 *                                                                            ------ Only Interface Starts  ------
**************************************************************************************************************************************************************************/
// implements this for every component  
export interface IComponent {
    configs: ComponentConfigs;
    dataObject: any;
    properties: any;
    childConfigs?: Record<string, ComponentConfigs>;
    elementRef: ElementRef;
    isVisible: boolean;
    show(): void;
    hide(): void;
    toggleVisibility(): void;
}

export interface ComponentConfigs {
    name: ComponentNames; // Name of the component
    id?: string; // Unique identifier for the component
    type?: string; // Type of the component not in use
    componentType?: string; // Specifies the type of component, such as "form", "map", etc., to categorize and handle it appropriately in the application.
    version?: string; // Version of the component (for future use)
    description?: string; // Meta data for better readability of configs
    components?: ComponentConfigs[]; // Child components
    eventsConfig?: ActionEventConfigs; // Configuration for event registration
    customConfig?: any[]; // Custom configurations for different components
    loadChildren?: boolean; // To tell dynamic load do not load childs by default true
}

export interface MetaData {
    name?: string,
    id?: string,
    desciption?: string
    version?: string,
}

export interface StandardKeyValueConfigs extends CommonProcessingObject {
    key: string,
    value: any,
    payloadVariableSearchConfigs?: PayloadVariableSearchConfig[];
}
/************************************************************************************************************************************************
 *                                                        ActionEventConfigs Interface Starts
*************************************************************************************************************************************************/

export interface ActionEventConfigs {
    configs: ActionEventConfig[]
}

export interface ActionEventConfig extends MetaData, CommonProcessingObject {
    eventNames: ActionEventNames[],
    scope?: 'document' | 'element',
    operationsSequence?: string[]
    variableUpdateConfigs?: VariableUpdateConfigs,
    httpConfigs?: HttpConfig,
    uiConfigs?: UIConfigs,
}

export interface CommonProcessingObject {
    postProcessingConfigs?: ActionEventConfig,
    preProcessingConfigs?: ActionEventConfig,
    // preConditionConfigs?: PreConditionConfig

}

/************************************************************************************************************************************************
 *                                                          ActionEventConfigs Interface Ends
*************************************************************************************************************************************************/

/************************************************************************************************************************************************
 *                                                           VariableUpdateConfigs Interface Starts
*************************************************************************************************************************************************/
export interface VariableUpdateConfigs extends MetaData, CommonProcessingObject {
    configs: VariableUpdateConfig[]
}

export interface VariableUpdateConfig extends MetaData, CommonProcessingObject {
    valueUpdateTo?: RetrievalSources; // Defines the source for value retrieval or update
    updateValuePath?: string; // Path to the component or service, e.g., "componentName_id.functionName  or variable.data.value"
    value?: any; // Data to pass from configurations
    payloadVariableSearchConfigs?: PayloadVariableSearchConfig[]; // Data to update for functions and variables
    updateValueDataType?: DataTypes; // Allows conversion of data types (e.g., string "2" to number 2)
    arraySearchKeys?: StandardKeyValueConfigs[]; // Criteria for updating values in arrays based on key-value pairs

    dataTransformationConfigs?: any; // Configuration for data transformation processes
    definedOperations?: string; // Currently not in use
}

export interface PayloadVariableSearchConfig extends MetaData {
    retrieveFrom?: RetrievalSources;
    retrievePath?: string; // Path to the component or service, e.g., "componentName_id.functionName  or variable.data.value"
    value?: any; // Data to pass from configurations
    valueStoreKey?: string, // key to store data
    getArray?: StandardKeyValueConfigs[];
    payloadVariableSearchConfigs?: PayloadVariableSearchConfig[], // if we want an object
    dataTransformationConfigs?: any, // we can transform data after date retrival
    arraySearchKeys?: StandardKeyValueConfigs[]; // Criteria for get values in arrays based on key-value pairs
    fromDataType?: DataTypes;
    toDataType?: DataTypes;
    operationType?: string,
    // elementPath?: HTMLElementConfigValue;
}

/************************************************************************************************************************************************
 *                                                          VariableUpdateConfigs Interface Ends
*************************************************************************************************************************************************/

/************************************************************************************************************************************************
 *                                                              HttpConfig Interface Starts
*************************************************************************************************************************************************/
export interface HttpConfig extends CommonProcessingObject {
    configs: HttpRequestConfig[],
    promiseType: string,
    batchSize?: number
}

export interface HttpRequestConfig extends CommonProcessingObject {
    httpRequestBodyConfigs: HttpRequestBodyOrHeadersConfig,
    httpRequestPreProcessing?: HttpRequestPreProcessing,
    httpRequestHeadersConfigs?: HttpRequestBodyOrHeadersConfig,
    httpErrorResponseConfigs?: HttpErrorResponseConfigs,
    httpSuccessResponseConfigs: HttpSuccessResponseConfigs,
    httpApiConfig: HttpApiConfig,
    // loaderConfig?: LoaderConfigProperties // this is not part of actual configs, just used for code handling
    // dataRepositoryConfigs?: DataRepositoryConfigs,
}

export interface HttpRequestBodyOrHeadersConfig {
    payloadVariableSearchConfig: PayloadVariableSearchConfig[]
}

export interface HttpRequestPreProcessing extends ActionEventConfig {
    serialize: boolean
}

export interface HttpErrorResponseConfigs extends ActionEventConfig {

}

export interface HttpSuccessResponseConfigs extends ActionEventConfig {

}

export interface HttpApiConfig {
    requestId: string
    dataProviderName: string,
    // firestoreConfigs?: FirestoreConfig,
    apiConfigs?: ApiConfigs,
    internalApiConfigs?: InternalApiConfigs,
    bodyData?: any,
    headerData?: any,
    responseType?: any,
    // recursiveApiConfigs? : RecursiveApiConfigs
}

export interface ApiConfigs {
    responseType?: any,
    httpMethod: string,
    url: string,
    type: string,
    headerData: any,
    bodyData: any
}

export interface InternalApiConfigs {
    apiMethod: string,
    version: string,
    methodName: string,
}

//   export interface RecursiveApiConfigs{
//     maxRetries? : number,
//     breakCondition? : PreConditionConfig,
//     payloadVariableSearchConfig? : PayloadVariableSearchConfig[],
//     dataProviderName? : DatasourceName,
//     transformationConfigs?: DataTransformationConfigs,
//   }

/************************************************************************************************************************************************
 *                                                              HttpConfig Interface Ends
*************************************************************************************************************************************************/

/************************************************************************************************************************************************
 *                                                              UIConfigs Interface Starts
*************************************************************************************************************************************************/

export interface UIConfigs extends CommonProcessingObject {
    configs: UIConfig[]
}
export interface UIConfig extends MetaData {
    operationsSequence?: string[]
    elementConfigs?: HTMLElementConfig[],
}

export interface HTMLElementConfig extends CommonProcessingObject {
    addProperties?: any[],
    removeProperties?: any[],
    addStyles?: HTMLElementConfigValue[],
    removeStyles?: HTMLElementConfigValue[]
    addClasses?: HTMLElementConfigValue[],
    removeClasses?: HTMLElementConfigValue[],
}

export interface HTMLElementConfigValue extends CommonProcessingObject {
    htmlElementSearchConfigs: HTMLElementSearchConfig[]
    values: StandardKeyValueConfigs[]
}

export interface HTMLElementSearchConfig {
    searchName: string,
    type: string
}

/************************************************************************************************************************************************
 *                                                              UIConfigs Interface Ends
*************************************************************************************************************************************************/

/**************************************************************************************************************************************************************************
 *                                                                     ------  Only Interface Ends ------
**************************************************************************************************************************************************************************/

/**************************************************************************************************************************************************************************
 *                                                                      ------  Only Code Starts  ------
**************************************************************************************************************************************************************************/

/************************************************************************************************************************************************
 *                                                        Component Lifecycle Management Code Starts
*************************************************************************************************************************************************/

function initializeComponent(configs: ComponentConfigs, componentName: ComponentNames, thisObject: any, element: any, defaultConfigs: ComponentConfigs | null = null) {
    if (!configs && !checkIsNotNull(configs)) {
        configs = defaultConfigs!;
    }
    if (configs && checkIsNotNull(configs)) {
        setComponentInstance(configs, thisObject, componentName)
        if (configs?.eventsConfig && checkIsNotNull(configs.eventsConfig)) {
            executeActionEvents(configs.eventsConfig, ActionEventNames.onInit, thisObject, element);
            registerEvents(configs.eventsConfig, element, thisObject);
        }
        //   if (checkIsNotNull(configs.conditionalRulesConfigs)) {
        //     prepareConditionalConfigsMap(configs.conditionalRulesConfigs)
        //   }
    }
    return configs;
}

function setComponentInstance(configs: ComponentConfigs, thisObject: any, componentName: ComponentNames) {
    if (checkIsNotNull(configs) && checkIsNotNull(configs.id)) {
        ComponentManagerService.getInstance().setInComponentPool(thisObject, componentName.toString() + "_" + configs.id);
    } else {
        ComponentManagerService.getInstance().setInComponentPool(thisObject, componentName.toString());
    }
}

function getProperties(configs: ComponentConfigs, thisObject: any): any {
    if (checkIsNotNull(configs) && configs.customConfig && checkIsNotNull(configs.customConfig)) {
        for (let eachConfigs of configs.customConfig) {
            if (eachConfigs.preConditionConfigs) {
                //   if (checkValidity(thisObject, eachConfigs.preConditionConfigs)) {
                // return eachConfigs
                //   }
            }
            else {
                return eachConfigs;
            }
        }
    }
}

function getChildConfigs(configs: ComponentConfigs): Record<string, ComponentConfigs> | {} {
    let childConfigs: Record<string, ComponentConfigs> = {};
    let components = configs?.components;
    if (components && checkIsNotNull(components)) {
        components.forEach((config) => {
            if (config.name && checkIsNotNull(config.name)) {
                childConfigs[config.name] = config;
            }
        })
    }
    return childConfigs
}

function executeAfterViewInitConfigs(configs: ComponentConfigs, componentName: ComponentNames, thisObject: any, element?: any, defaultConfigs: ComponentConfigs | null = null) {
    if (configs?.eventsConfig && checkIsNotNull(configs.eventsConfig)) {
        executeActionEvents(configs.eventsConfig, ActionEventNames.afterViewInit, thisObject, element);
    }
}

function destroyComponent(configs: ComponentConfigs, componentName: ComponentNames, thisObject: any, element: any) {
    if (!hasDestroyConfigs(configs)) {
        removeAllEventListeners(element, thisObject);
        removeComponentFromDatasources(configs, componentName);
    } else {
        executeActionEvents(configs.eventsConfig!, ActionEventNames.onDestroy, thisObject, element);
    }
}

function hasDestroyConfigs(configs: ComponentConfigs): boolean {
    if (!configs || !checkIsNotNull(configs)) {
        return false
    }
    if (checkIsNotNull(configs) && checkIsNotNull(configs.eventsConfig) && checkIsNotNull(configs.eventsConfig?.configs)) {
        let applicableConfigs = configs.eventsConfig?.configs.filter(function (element) {
            return element.eventNames.indexOf(ActionEventNames.onDestroy) > -1;
        });
        if (applicableConfigs && checkIsNotNull(applicableConfigs) && applicableConfigs.length && applicableConfigs.length > 0) {
            return true
        }
    }
    return false;
}

function removeAllEventListeners(element: any, thisObject?: any) {
    element.replaceWith(element.cloneNode(true));
    removeDocumentEvents(thisObject)
}

function removeDocumentEvents(thisObject: any) {
    if (thisObject?.documentEvents?.length > 0) {
        thisObject.documentEvents.forEach(({ element, eventName, eventHandler }: any) => {
            element.removeEventListener(eventName, eventHandler);
        });
        thisObject.documentEvents = [];
    }
}

function removeComponentFromDatasources(configs: ComponentConfigs, componentName: ComponentNames) {
    if (checkIsNotNull(configs) && checkIsNotNull(configs.id)) {
        ComponentManagerService.getInstance().deleteFromComponentPool(componentName.toString() + "_" + configs.id);
    } else {
        ComponentManagerService.getInstance().deleteFromComponentPool(componentName.toString());
    }
}

/************************************************************************************************************************************************
 *                                                      Component Lifecycle Management Code Ends
*************************************************************************************************************************************************/


/************************************************************************************************************************************************
 *                                                         Register Dynamic Events Code Starts
*************************************************************************************************************************************************/

function registerEvents(configs: ActionEventConfigs, element: any, thisObject: any) {
    const uniqueEvents = getUniqueEvents(configs);
    if (checkIsNotNull(uniqueEvents)) {
        uniqueEvents.forEach((event: ActionEventNames) => {
            const applicableConfigs = configs.configs.filter(config => config.eventNames.includes(event));
            applicableConfigs.forEach(config => {
                const scopeElement = getEventScopeElement(config, event, element);
                registerDynamicEvents(scopeElement, event, thisObject, config);
            })
        });
    }
}

function getUniqueEvents(configs: ActionEventConfigs): ActionEventNames[] {
    if (!configs?.configs) return [];
    const allEvents = configs.configs.flatMap(config => config.eventNames);
    return [...new Set(allEvents)];
}

function getEventScopeElement(configs: ActionEventConfig, eventName: string, defaultElement: any): any {
    if (configs && configs.scope === 'document') {
        return document;
    } else {
        return defaultElement;
    }
}

function registerDynamicEvents(element: any, eventName: string, thisObject: any, configs: ActionEventConfig) {
    const eventListener = getEventListener(thisObject);
    element[eventListener](eventName, (e: any) => {
        thisObject["dynamic_event"] = e;
        processActionEventConfig(configs, thisObject, element, e);
    }, false);
}

function getEventListener(thisObject: any): string {
    if (checkIsNotNull(thisObject?.eventListener)) {
        return thisObject.eventListener;
    }
    return "addEventListener"
}

/************************************************************************************************************************************************
 *                                                              Register Dynamic Events Code Ends
*************************************************************************************************************************************************/

/************************************************************************************************************************************************
 *                                                                  ActionEvents Code Starts
*************************************************************************************************************************************************/


/**
 * Executes a custom event based on the provided event name.
 * 
 * @author Akash Sontakke
 * @date 25/12/2024
 * 
 * @param {ComponentConfigs} configs - The configuration object for the component.
 * @param {any} thisObject - The `this` reference of the component.
 * @param {any} element - The `elementRef.nativeElement` of the component.
 * @param {string | object} eventName - The event to execute. Can be:
 *   - A string representing the event name.
 *   - An object containing event data, with the event name as the `data` property.
 * 
 * @example
 * // Execute an event using an object or a string
 * executeCustomEventByName(configs, thisObject, element, { data: 'onHover' });
 * executeCustomEventByName(configs, thisObject, element, 'onHover');
 * 
 * @throws {Error} Logs errors or warnings if the event name is invalid or not found.
 */

function executeActionEventsByName(configs: ComponentConfigs, thisObject: any, element: any, eventName: any) {
    try {
        if (checkIsNotNull(eventName.data)) eventName = eventName.data;
        executeActionEventsCore(configs.eventsConfig!, eventName, thisObject, element);
    } catch (error: any) {
        console.error(`[ContainerComponent] Error in executeCustomEventByName: Config ID: ${configs?.id || 'N/A'} - ${error}`);
    }
}

function executeActionEvents(configs: ActionEventConfigs, eventName: ActionEventNames, thisObject: any, element: any, data: any = {}) {
    if (checkIsNotNull(configs) && checkIsNotNull(configs.configs)) {
        let applicableConfigs = configs.configs.filter(function (element) {
            return element.eventNames.indexOf(eventName) > -1;
        });
        if (checkIsNotNull(applicableConfigs)) {
            for (let config of applicableConfigs) {
                processActionEventConfig(config, thisObject, element, data);
            }
        }
    }
}

async function processActionEventConfig(config: ActionEventConfig, thisObject: any, element: any, data?: any) {
    // if (!checkPreConditionConfig(config, thisObject)) return;
    let operationsSequence = getOperationSeuenceForConfig(config);

    if (config.preProcessingConfigs && checkIsNotNull(config.preProcessingConfigs)) {
        processActionEventConfig(config.preProcessingConfigs, thisObject, data, element);
    }

    for (let operation of operationsSequence) {
        switch (operation) {
            case OperationsSequenceTypes.variableUpdateConfigs:
                processVariableUpdateConfigs(config.variableUpdateConfigs!, thisObject, data, element);
                break;

            case OperationsSequenceTypes.httpConfigs:
                processHttpConfigs(config.httpConfigs!, thisObject, data, element);
                break;

            case OperationsSequenceTypes.uiConfigs:
                processUiConfigs(config.uiConfigs!, thisObject, data, element);
                break;
        }
    }

    if (config.postProcessingConfigs && checkIsNotNull(config.postProcessingConfigs)) {
        processActionEventConfig(config.postProcessingConfigs, thisObject, data, element);
    }
}

function getOperationSeuenceForConfig(config: ActionEventConfig) {
    let operationSequence = getDefaultOperationSequence();
    if (config.operationsSequence && checkIsNotNull(config.operationsSequence)) {
        operationSequence = config.operationsSequence;
    }
    operationSequence = filterApplicableOperations(operationSequence, config);
    return operationSequence;
}

enum OperationsSequenceTypes {
    variableUpdateConfigs = "variableUpdateConfigs",
    securityConfigs = "securityConfigs",
    uiConfigs = "uiConfigs",
    navigationConfigs = "navigationConfigs",
    eventEmitterConfigs = "eventEmitterConfigs",
    httpConfigs = "httpConfigs",
    transformationConfigs = "transformationConfigs",
    userPermissionConfigs = "userPermissionConfigs",
    conditionalConfigs = "conditionalConfigs"
}

function getDefaultOperationSequence() {
    const operationSequence = [OperationsSequenceTypes.uiConfigs.toString(),
    OperationsSequenceTypes.httpConfigs.toString(),
    OperationsSequenceTypes.transformationConfigs.toString(),
    OperationsSequenceTypes.variableUpdateConfigs.toString(),
    OperationsSequenceTypes.eventEmitterConfigs.toString(),
    OperationsSequenceTypes.navigationConfigs.toString(),
    OperationsSequenceTypes.userPermissionConfigs.toString(),
    OperationsSequenceTypes.conditionalConfigs.toString()];
    return operationSequence;
}

function filterApplicableOperations(operationSequence: string[], config: ActionEventConfig) {
    let applicableOperations: any[] = [];
    for (let operation of operationSequence) {
        switch (operation) {
            case OperationsSequenceTypes.variableUpdateConfigs:
                config.variableUpdateConfigs && checkObjectIsNotNull(config.variableUpdateConfigs) ? applicableOperations.push(operation) : null;
                break;
            case OperationsSequenceTypes.httpConfigs:
                config.httpConfigs && checkObjectIsNotNull(config.httpConfigs) ? applicableOperations.push(operation) : null;
                break;
            case OperationsSequenceTypes.uiConfigs:
                config.uiConfigs && checkObjectIsNotNull(config.uiConfigs) ? applicableOperations.push(operation) : null;
                break;
        }
    }
    return applicableOperations;
}

/************************************************************************************************************************************************
 *                                                            executeActionEvents Code Ends
*************************************************************************************************************************************************/


/************************************************************************************************************************************************
 *                                                            Variable Update Code Starts
*************************************************************************************************************************************************/

function processVariableUpdateConfigs(config: VariableUpdateConfigs, thisObject: any, data: any, element: any) {
    // if (!checkPreConditionConfig(config, thisObject)) return;
    logMessage("variable update started", LogLevel.INFO);
    if (config.preProcessingConfigs && checkIsNotNull(config.preProcessingConfigs)) {
        processActionEventConfig(config.preProcessingConfigs, thisObject, data, element);
    }
    executeVariableUpdateConfigs(config, thisObject, data, element);
    if (config.postProcessingConfigs && checkIsNotNull(config.postProcessingConfigs)) {
        processActionEventConfig(config.postProcessingConfigs, thisObject, data, element);
    }
    logMessage("variable update ended", LogLevel.INFO);
}

function executeVariableUpdateConfigs(variableUpdateConfig: VariableUpdateConfigs, thisObject: any, data: any, element: any) {
    thisObject.passedData = data;
    for (let config of variableUpdateConfig.configs) {
        //   if (!checkPreConditionConfig(config, thisObject)) return;
        if (config.preProcessingConfigs && checkIsNotNull(config.preProcessingConfigs)) {
            processActionEventConfig(config.preProcessingConfigs, thisObject, data, element);
        }
        if (config.payloadVariableSearchConfigs && checkIsNotNull(config.payloadVariableSearchConfigs)) {
            data = processPayloadVariableSearchConfig(config.payloadVariableSearchConfigs, thisObject, element, data);
        }
        data = processDataForVariableUpdate(config, data);
        processVariableUpdateConfig(config, thisObject, data, element);
        if (config.postProcessingConfigs && checkIsNotNull(config.postProcessingConfigs)) {
            processActionEventConfig(config.postProcessingConfigs, thisObject, data, element);
        }
    }
}

function processDataForVariableUpdate(variableConfig: VariableUpdateConfig, data: any) {
    if (variableConfig.value && checkIsNotNull(variableConfig.value)) {
        data = variableConfig.value;
    }
    data = formatDataType(data, variableConfig.updateValueDataType!);
    return data;
}

function processVariableUpdateConfig(variableConfig: VariableUpdateConfig, thisObject: any, data: any, element: any) {
    switch (variableConfig.valueUpdateTo) {
        case RetrievalSources.localStorage:
            updateLocalStorageData(variableConfig, data);
            break;

        case RetrievalSources.setLocalStorageJson:
            setLocalStorageJson(variableConfig.updateValuePath!, data);
            break;

        case RetrievalSources.variable:
            if (variableConfig.arraySearchKeys && checkIsNotNull(variableConfig.arraySearchKeys)) {
                data = updateArray(fetchDataRecursively(variableConfig.updateValuePath, thisObject), variableConfig.arraySearchKeys, data);
            }
            _.set(thisObject, variableConfig.updateValuePath!, data);
            break;

        case RetrievalSources.function:
            thisObject[variableConfig.updateValuePath!](data);
            break;

        case RetrievalSources.componentVariable:
        case RetrievalSources.serviceVariable:
            let array = variableConfig.updateValuePath!.split('.');
            let componentName = array.shift();
            if (componentName) {
                let component = ComponentManagerService.getInstance().getLatestComponentByName(componentName);
                if (variableConfig.arraySearchKeys && checkIsNotNull(variableConfig.arraySearchKeys)) {
                    data = updateArray(fetchDataRecursively(variableConfig.updateValuePath, component), variableConfig.arraySearchKeys, data);
                }
                let updateValuePath = array.join('.');
                _.set(component, updateValuePath, data);
            }
            break;

        case RetrievalSources.componentFunction:
        case RetrievalSources.serviceFunction:
            let funcArray = variableConfig.updateValuePath!.split('.');
            let compName = funcArray[0];
            let funcName = funcArray[1];
            let comp = ComponentManagerService.getInstance().getLatestComponentByName(compName);
            comp[funcName](data, thisObject, element);
            break;

        case RetrievalSources.variableFunction:
            let varArray = variableConfig.updateValuePath!.split('.');
            let variable = thisObject[varArray[0]];
            let func = varArray[1];
            variable[func](data, thisObject, element);
            break;
    }
}

function updateLocalStorageData(variableConfig: VariableUpdateConfig, data: any) {
    let keyArr = variableConfig.updateValuePath!.split('.');
    let localStorageKey = keyArr.shift();
    let localStorageObject = getLocalStorageJson(localStorageKey!);
    if (variableConfig.arraySearchKeys && checkIsNotNull(variableConfig.arraySearchKeys)) {
        localStorageObject = updateArray(localStorageObject, variableConfig.arraySearchKeys, data);
    }
    if (checkIsNotNull(localStorageObject)) {
        localStorageObject = _.set(localStorageObject, keyArr, data);
        setLocalStorageJson(localStorageKey!, localStorageObject);
    }
    else {
        setLocalStorageJson(localStorageKey!, data);
    }
}

/************************************************************************************************************************************************
 *                                                            Variable Update Code Ends
*************************************************************************************************************************************************/

/************************************************************************************************************************************************
 *                                                      Payload Variable Search Config Code Starts
*************************************************************************************************************************************************/

export function processPayloadVariableSearchConfig(payloadVariableSearchConfigs: PayloadVariableSearchConfig[], thisObject: any, element: any, data: any) {
    let preparedObject: any = {};
    if (checkIsNotNull(payloadVariableSearchConfigs)) {
        payloadVariableSearchConfigs.forEach((payloadVariableSearchConfig: PayloadVariableSearchConfig) => {
            data = getPayloadData(payloadVariableSearchConfig, thisObject, element, data);
            data = formatDataType(data, payloadVariableSearchConfig.toDataType!);
            preparedObject = prepareOutputObject(preparedObject, data, payloadVariableSearchConfig);
        });
    }
    return preparedObject;
}

function prepareOutputObject(preparedObject: any, data: any, variableConfig: PayloadVariableSearchConfig) {
    if (variableConfig.valueStoreKey && checkIsNotNull(variableConfig.valueStoreKey)) {
        preparedObject[variableConfig.valueStoreKey!] = data;
    } else {
        preparedObject = data;
    }
    return preparedObject
}

function getPayloadData(config: PayloadVariableSearchConfig, thisObject: any, element: any, data: any) {
    if (checkIsNotNull(config?.value)) {
        return config.value;
    }
    return getPayloadDataFromConfig(config, thisObject, element, data);
}

function getPayloadDataFromConfig(config: PayloadVariableSearchConfig, thisObject: any, element: any, data: any) {
    if (config.getArray && checkIsNotNull(config.getArray)) {
        data = getPayloadArray(config.getArray, thisObject, element, data);
    }

    if (config.payloadVariableSearchConfigs && checkIsNotNull(config.payloadVariableSearchConfigs)) {
        data = processPayloadVariableSearchConfig(config.payloadVariableSearchConfigs, thisObject, element, data);
    }

    switch (config.retrieveFrom) {
        case RetrievalSources.localStorage:
            let array = config.retrievePath!.split('.');
            let localStorageKey = array.shift();
            return fetchDataRecursively(array, getLocalStorageJson(localStorageKey!));

        case RetrievalSources.variable:
            if (checkIsNotNull(config?.arraySearchKeys) && config.arraySearchKeys) {
                data = updateArray(fetchDataRecursively(config.retrievePath, thisObject), config.arraySearchKeys, data);
            }
            return fetchDataRecursively(config.retrievePath!.split('.'), thisObject);

        case RetrievalSources.function:
            return thisObject[config.retrievePath!]();

        case RetrievalSources.componentVariable:
        case RetrievalSources.serviceVariable:
            let variableArray = config.retrievePath!.split('.');
            let componentName = variableArray.shift();
            if (componentName) {
                let component = ComponentManagerService.getInstance().getLatestComponentByName(componentName)
                if (config.arraySearchKeys && checkIsNotNull(config.arraySearchKeys)) {
                    data = updateArray(fetchDataRecursively(config.retrievePath, component), config.arraySearchKeys, data);
                }
                return fetchDataRecursively(variableArray, component);
            }
            break;

        case RetrievalSources.componentFunction:
        case RetrievalSources.serviceFunction:
            let functionArray = config.retrievePath!.split('.');
            let compName = functionArray[0];
            let funcName = functionArray[1];
            return ComponentManagerService.getInstance().getLatestComponentByName(compName)[funcName]({ data: data, thisObject: thisObject, element: element });

        // case RetrievalSources.elementProperty:
        //     if (checkIsNotNull(config) && checkIsNotNull(config.elementPath)) {
        //         let elementList = getElementList(config.elementPath!, thisObject.elementRef.nativeElement);
        //         if (checkIsNotNull(elementList[0])) {
        //             return elementList[0].attributes.style.value.split(" ");
        //         }
        //     }
        //     break;
    }

    // if (checkIsNotNull(config.dataTransformationConfigs) && checkIsNotNull(data) && config.dataTransformationConfigs) {
    //     return executeDataTransformationConfigs(config.dataTransformationConfigs, thisObject, data, {});
    // }

    return data;
}

function getPayloadArray(configs: StandardKeyValueConfigs[], thisObject: any, element: any, data: any) {
    let convertToArray: any[] = [];

    for (let item of configs) {
        if (checkIsNotNull(item.payloadVariableSearchConfigs)) {
            let aggregatedData: any = {};

            item.payloadVariableSearchConfigs?.forEach((payloadVariableSearchConfig: PayloadVariableSearchConfig) => {
                const payloadData = getPayloadData(payloadVariableSearchConfig, thisObject, element, data);
                if (payloadVariableSearchConfig.valueStoreKey) {
                    aggregatedData[payloadVariableSearchConfig.valueStoreKey!] = payloadData;
                } else {
                    aggregatedData = { ...aggregatedData, ...payloadData };
                }
            });

            convertToArray = addDataToArray(convertToArray, item.key, aggregatedData);
        } else {
            convertToArray = addDataToArray(convertToArray, item.key, item.value);
        }
    }
    return convertToArray;
}

function addDataToArray(array: any, key: any, data: any) {
    let obj: any = {};
    if (checkIsNotNull(key)) {
        obj = { [key]: data };
    }
    else {
        obj = { ...data }
    }
    array.push(obj);
    return array;
}

/************************************************************************************************************************************************
 *                                                      Payload Variable Search Config Code Ends
*************************************************************************************************************************************************/

/************************************************************************************************************************************************
 *                                                           process Http Configs Starts
*************************************************************************************************************************************************/

export async function processHttpConfigs(config: HttpConfig, thisObject: any, data: any, element: any) {
    logMessage("http started", LogLevel.INFO);
    // if (!checkPreConditionConfig(config, thisObject)) return;
    if (config.preProcessingConfigs && checkIsNotNull(config.preProcessingConfigs)) {
        processActionEventConfig(config.preProcessingConfigs, thisObject, data, element);
    }
    data = await processHttpConfig(config, thisObject, element);
    if (config.postProcessingConfigs && checkIsNotNull(config.postProcessingConfigs)) {
        processActionEventConfig(config.postProcessingConfigs, thisObject, data, element);
    }
    logMessage("http ended", LogLevel.INFO);
    return data;
}

export function processHttpConfig(config: HttpConfig, thisObject: any, element: any) {
    switch (config.promiseType) {
        case PromiseType.sync:
            return executeSyncRequests(thisObject, config, element);

        // case PromiseType.async:
        //     return executeAsyncRequests(thisObject, config, element);

        // case PromiseType.resolveAllSync:
        //     return executeResolveAllSyncRequests(thisObject, config, element);

        // case PromiseType.sequentialBatch:
        //     return executeSequentialBatchRequests(thisObject, config, config.batchSize!, element);

        default:
            return Promise.resolve("Error");
    }
}

async function executeSyncRequests(thisObject: any, config: HttpConfig, element: any): Promise<any> {
    const observableData = getObservableObject(thisObject, config, element);
    let output: any[] = [];
    for (const key of Object.keys(observableData)) {
        const { promise, httpConfig } = observableData[key];
        try {
            const data = await promise;
            output.push(data)
            processSuccessOutput(httpConfig.httpSuccessResponseConfigs, thisObject, element, data);
        } catch (error) {
            processFailureOutput(httpConfig.httpErrorResponseConfigs!, thisObject, element, error);
        }
    }
    return output;
}

function processSuccessOutput(config: HttpSuccessResponseConfigs, thisObject: any, element: any, data: any) {
    processActionEventConfig(config, thisObject, element, data);
}

function processFailureOutput(config: HttpErrorResponseConfigs, thisObject: any, element: any, data: any) {
    if (!checkIsNotNull(config)) return;
    processActionEventConfig(config, thisObject, element, data);
}

function getObservableObject(thisObject: any, config: HttpConfig, element: any): Record<string, { promise: Promise<any>; httpConfig: HttpRequestConfig }> {
    let observableData: Record<string, { promise: Promise<any>; httpConfig: HttpRequestConfig }> = {};

    config.configs.forEach((httpConfig: HttpRequestConfig) => {
        const obs: Promise<any> = getHttpPromises(httpConfig, thisObject, element);
        observableData[httpConfig.httpApiConfig.requestId] = { promise: obs, httpConfig };
    });

    return observableData;
}

function getHttpPromises(httpConfig: HttpRequestConfig, thisObject: any, element: any): Promise<any> {
    let headers = getHeadersForHttpRequest(httpConfig.httpRequestHeadersConfigs!, thisObject);
    if (httpConfig.httpRequestBodyConfigs) {
        let body = processPayloadVariableSearchConfig(httpConfig.httpRequestBodyConfigs!.payloadVariableSearchConfig, thisObject, element, null);
        httpConfig.httpApiConfig = prepareEndpointObject(headers, body, httpConfig.httpApiConfig);
    }
    return getPromiseForHttpCall(thisObject, httpConfig, element);
}

function prepareEndpointObject(headers: any, body: any, httpApiConfig: HttpApiConfig) {
    httpApiConfig.bodyData = body;
    httpApiConfig.headerData = headers;
    return httpApiConfig;
}

function getPromiseForHttpCall(thisObject: any, httpRequestConfig: HttpRequestConfig, element: any): Promise<any> {
    return doRequestFromConfig(httpRequestConfig, thisObject, element);
    //return testPromise(i);
}

function testPromise(i: number) {
    if (i == 0) {
        ++i;
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("p1");
            }, 5000);
        });
    }
    else {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("p2");
            }, 2000);
        });
    }


}

function getHeadersForHttpRequest(headersConfig: HttpRequestBodyOrHeadersConfig, thisObject: any) {
    // let retrievedHeaders = {}
    // if (checkIsNotNull(headersConfig) && checkIsNotNull(headersConfig.payloadVariableSearchConfig)) {
    //   retrievedHeaders = processPayloadVariableSearchConfig(headersConfig.payloadVariableSearchConfig.filter(element => element.operationType === OperationType.add || !element.operationType), thisObject);
    // }
    // let staticHeaders = {}
    // // let headersToRemove : any[] =headersConfig.payloadVariableSearchConfig.filter(element => {
    // //   if(element.operationType === "remove"){
    // //     return element.valueStoreKey;
    // //   }}) 
    // return { ...retrievedHeaders, ...staticHeaders };

    // TODO need for third party api calls

    return {};
}

/************************************************************************************************************************************************
 *                                                           Process Http Configs Ends
*************************************************************************************************************************************************/
/************************************************************************************************************************************************
 *                                                           Process UI Configs Ends
*************************************************************************************************************************************************/

function processUiConfigs(config: UIConfigs, thisObject: any, data: any, element: any) {
    if (config.preProcessingConfigs && checkIsNotNull(config.preProcessingConfigs)) {
        processActionEventConfig(config.preProcessingConfigs, thisObject, data, element);
    }
    // add preConditionConfigs
    executeUIConfigs(config!, thisObject, data, element);
    if (config.postProcessingConfigs && checkIsNotNull(config.postProcessingConfigs)) {
        processActionEventConfig(config.postProcessingConfigs, thisObject, data, element);
    }
}

function executeUIConfigs(configs: UIConfigs, thisObject: any, data: any, element: any,) {
    if (checkIsNotNull(configs) && checkIsNotNull(configs.configs)) {
        for (let config of configs.configs) {
            // add preConditionConfigs
            processUIConfig(config, thisObject, data, element);
        }
    }
}

function processUIConfig(config: UIConfig, thisObject: any, data: any, element: any) {
    let operationsSequence = getOperationSequenceForUIConfig(config);
    for (let operation of operationsSequence) {
        switch (operation) {
            case UIOperationsSequenceTypes.elementConfigs:
                processHtmlElementConfigs(config.elementConfigs!, thisObject, data, element);
                break;
        }
    }

}

enum UIOperationsSequenceTypes {
    elementConfigs = "elementConfigs",
    loaderConfigs = "loaderConfigs",
    progressBarConfigs = "progressBarConfigs",
    toastConfigs = "toastConfigs",
    modalConfigs = "modalConfigs",
    offCanvasConfigs = "offCanvasConfigs",
    componentGridConfigs = "ComponentGridConfigs",
}

function getOperationSequenceForUIConfig(config: UIConfig) {
    let operationsSequence = getDefaultOperationSequenceForUIConfig();
    if (config.operationsSequence && checkIsNotNull(config.operationsSequence)) {
        operationsSequence = config.operationsSequence;
    }
    operationsSequence = filterApplicableUIOperations(operationsSequence, config);
    return operationsSequence;
}

function getDefaultOperationSequenceForUIConfig() {
    const operationSequence = [UIOperationsSequenceTypes.elementConfigs.toString(),
    UIOperationsSequenceTypes.loaderConfigs.toString(),
    UIOperationsSequenceTypes.progressBarConfigs.toString(),
    UIOperationsSequenceTypes.toastConfigs.toString(),
    UIOperationsSequenceTypes.modalConfigs.toString(),
    UIOperationsSequenceTypes.offCanvasConfigs.toString(),
    UIOperationsSequenceTypes.componentGridConfigs.toString()];
    return operationSequence;
}

function filterApplicableUIOperations(operationSequence: string[], config: UIConfig) {
    let applicableOperations = [];
    for (let operation of operationSequence) {
        switch (operation) {
            case UIOperationsSequenceTypes.elementConfigs:
                config.elementConfigs && checkObjectIsNotNull(config.elementConfigs) ? applicableOperations.push(operation) : null;
                break;
        }
    }
    return applicableOperations;
}

/************************************************* Process Element Configs Starts *************************************************/

function processHtmlElementConfigs(configs: HTMLElementConfig[], thisObject: any, data: any, element: any) {
    if (checkIsNotEmpty(configs)) {
        for (let config of configs) {
            if (config.preProcessingConfigs && checkIsNotNull(config.preProcessingConfigs)) {
                processActionEventConfig(config.preProcessingConfigs, thisObject, data, element);
            }
            executeHtmlElementConfigs(config, element, thisObject);
            if (config.postProcessingConfigs && checkIsNotNull(config.postProcessingConfigs)) {
                processActionEventConfig(config.postProcessingConfigs, thisObject, data, element);
            }
        }
    }
}

function executeHtmlElementConfigs(config: HTMLElementConfig, element: any, thisObject: any) {
    try {
        // add preConditionConfigs
        if (checkIsNotEmpty(config.addProperties)) {
            addProperties(config, element, thisObject);
        }
        if (checkIsNotEmpty(config.removeProperties)) {
            removeProperties(config, element, thisObject);
        }
        if (checkIsNotEmpty(config.addClasses)) {
            addClasses(config, element, thisObject);
        }
        if (checkIsNotEmpty(config.removeClasses)) {
            removeClasses(config, element, thisObject);
        }
        if (checkIsNotEmpty(config.addStyles)) {
            addStyles(config, element, thisObject);
        }
        if (checkIsNotEmpty(config.removeStyles)) {
            removeStyles(config, element, thisObject);
        }
    } catch (error: any) {
        console.error(error);
    }
}

/******** addProperties starts ********/
function addProperties(config: HTMLElementConfig, element: any, thisObject: any) {
    try {
        for (let property of config.addProperties!) {
            // add preConditionConfigs
            let elementList = getElementList(property, element);
            processAddProperties(elementList, property, thisObject);
        }
    } catch (error: any) {
        throw (error)
    }
}

function processAddProperties(elementList: any[], property: HTMLElementConfigValue, thisObject: any) {
    try {
        for (let el of elementList) {
            for (let prop of property.values) {
                // add preConditionConfigs 
                el.setAttribute(prop.key, prop.value);
            }
        }
    } catch (error: any) {
        throw (error)
    }
}
/******** addProperties ends ********/

/******** removeProperties starts ********/
function removeProperties(config: HTMLElementConfig, element: any, thisObject: any) {
    try {
        for (let property of config.removeProperties!) {
            // add preConditionConfigs 
            let elementList = getElementList(property, element);
            processRemoveProperties(elementList, property, thisObject);
        }
    } catch (error: any) {
        throw (error)
    }
}

function processRemoveProperties(elementList: any[], property: HTMLElementConfigValue, thisObject: any) {
    try {
        for (let el of elementList) {
            for (let prop of property.values) {
                // add preConditionConfigs 
                el.removeAttribute(prop.key);
            }
        }
    } catch (error: any) {
        throw (error)
    }
}
/******** removeProperties ends ********/

/******** addClasses starts ********/
function addClasses(config: HTMLElementConfig, element: any, thisObject: any) {
    try {
        for (let property of config.addClasses!) {
            // add preConditionConfigs 
            let elementList = getElementList(property, element);
            processAddClasses(elementList, property, thisObject);
        }
    } catch (error: any) {
        throw (error)
    }
}

function processAddClasses(elementList: any[], property: HTMLElementConfigValue, thisObject?: any) {
    try {
        for (let el of elementList) {
            for (let prop of property.values) {
                el.classList.add(prop.value);
            }
        }
    } catch (error: any) {
        throw (error)
    }
}
/******** addClasses ends ********/

/******** removeClasses starts ********/
function removeClasses(config: HTMLElementConfig, element: any, thisObject: any) {
    try {
        for (let property of config.removeClasses!) {
            // add preConditionConfigs 
            let elementList = getElementList(property, element);
            processRemoveClasses(elementList, property, thisObject);
        }
    } catch (error: any) {
        throw (error)
    }
}


function processRemoveClasses(elementList: any[], property: HTMLElementConfigValue, thisObject: any) {
    try {
        for (let el of elementList) {
            for (let prop of property.values) {
                // add preConditionConfigs 
                el.classList.remove(prop.value);
            }
        }
    } catch (error: any) {
        throw (error)
    }
}
/******** removeClasses ends ********/


/******** addStyles starts ********/
function addStyles(config: HTMLElementConfig, element: any, thisObject: any) {
    try {
        for (let property of config.addStyles!) {
            // add preConditionConfigs 
            let elementList = getElementList(property, element);
            processAddStyles(elementList, property, thisObject);
        }
    } catch (error: any) {
        throw (error)
    }
}

function processAddStyles(elementList: any[], property: HTMLElementConfigValue, thisObject: any) {
    try {
        for (let el of elementList) {
            for (let prop of property.values) {
                // add preConditionConfigs 

                el.style[prop.key] = prop.value;
            }
        }
    } catch (error: any) {
        throw (error)
    }
}
/******** addStyles ends ********/



/******** removeStyles starts ********/
function removeStyles(config: HTMLElementConfig, element: any, thisObject: any) {
    try {
        for (let property of config.removeStyles!) {
            // add preConditionConfigs 
            let elementList = getElementList(property, element);
            processRemoveStyles(elementList, property, thisObject);
        }
    } catch (error: any) {
        throw (error)
    }
}

function processRemoveStyles(elementList: any[], property: HTMLElementConfigValue, thisObject: any) {
    try {
        for (let el of elementList) {
            for (let prop of property.values) {
                // add preConditionConfigs 
                el.style.removeProperty(prop.value);
            }
        }
    } catch (error: any) {
        throw (error)
    }
}
/******** removeStyles ends ********/

function getElementList(property: HTMLElementConfigValue, element: any) {
    try {
        let elements: any = [];
        for (let searchConfig of property.htmlElementSearchConfigs) {
            if (searchConfig.type === "self") {
                elements.push(element);
            }
            if (searchConfig.type === "tag") {
                elements = element.getElementsByTagName(searchConfig.searchName);
            }
            else if (searchConfig.type === "id") {
                let selectedElement = document.getElementById(searchConfig.searchName);
                elements.push(selectedElement);
            }
            else if (searchConfig.type === "class") {
                elements = document.getElementsByClassName(searchConfig.searchName);
            }
        }
        return elements;
    } catch (error: any) {
        throw (error);
    }
}

/************************************************* Process Element Configs Ends *************************************************/

/************************************************************************************************************************************************
 *                                                           Process UI Configs Ends
*************************************************************************************************************************************************/

/************************************************************************************************************************************************
 *                                                           Add Component Dynamically Starts
*************************************************************************************************************************************************/

async function addComponentDynamically(configs: ComponentConfigs[], thisObject: any, data?: any) {
    if (checkIsNotEmpty(configs)) {
        for (const config of configs) {
            await addComponent(config, thisObject, data);
        }
    }
}

async function addComponent(config: ComponentConfigs, thisObject: any, data?: any) {
    try {
        const componentRef: ComponentRef<any> = await getComponentRef(config, thisObject)
        setParameters(componentRef, config, data);
    } catch (error) {
        console.error(`Error adding component ${config.name} and ${config?.id} : `, error);
    }
}

function setParameters(componentRef: ComponentRef<any>, configs: any, data?: any) {
    try {
        componentRef.setInput("configs", configs)
        if (checkIsNotNull(data)) componentRef.setInput("dataObject", data)
    } catch (error: any) {
        throw (error)
    }
}

async function getComponentRef(config: ComponentConfigs, thisObject: any): Promise<ComponentRef<any>> {
    try {
        // in component.ts => @ViewChild('dynamicContainer', { read: ViewContainerRef, static: true }) insertPlace!: ViewContainerRef; 
        // in component.html => <ng-container #dynamicContainer></ng-container> 
        let insertPlace: ViewContainerRef = thisObject.insertPlace;
        const component: any = await getComponentByName(config.name);
        let componentRef: ComponentRef<any> = insertPlace.createComponent(component!);
        return componentRef;
    }
    catch (error: any) {
        throw (error);
    }
}

async function getComponentByName(componentName: ComponentNames): Promise<any> {
    try {
        const loader = COMPONENT_REF[componentName as ComponentNames];
        const component = await loader();
        return component;
    }
    catch (error: any) {
        throw (error);
    }
}

/************************************************************************************************************************************************
 *                                                           Add Component Dynamically Ends
*************************************************************************************************************************************************/


/************************************************************************************************************************************************
 *                                                            Helper function Starts
*************************************************************************************************************************************************/

function formatDataType(data: any, toDataType: string) {
    if (toDataType === DataTypes.float) {
        return parseFloat(data);
    }
    else if (toDataType === DataTypes.integer) {
        return parseInt(data);
    }
    else if (toDataType === DataTypes.string) {
        return data.toString();
    }
    else if (toDataType === DataTypes.array) {
        return data.split(',');
    }
    else {
        return data;
    }
}

function updateArray(dataArray: any[], configs: StandardKeyValueConfigs[], data: any) {
    let index = -1;
    for (let config of configs) {
        index = dataArray.find(element => element[config.key] === config.value);
        if (index === -1) {
            break;
        }
    }
    if (index !== -1) {
        dataArray[index] = { ...dataArray[index], ...data }
    }
    return _.cloneDeep(dataArray)
}

function fetchDataRecursively(array: any, object: any) {
    let found: any = null
    array.forEach((key: string | number) => {
        if (typeof key === 'string' && key.includes("[") && key.includes("[")) {
            let k = key.split("[")[0];
            let index = parseInt(key.substring(key.indexOf("[") + 1, key.lastIndexOf("]")));
            if (object[k][index]) {
                found = object[key.split("[")[0]][index];
                object = object[key.split("[")[0]][index]
            }
        }
        if (key && object && (object[key] || object[key] == false)) {
            found = object[key];
            object = object[key]
        }
        else {
            found = null;
            return;
        }
    })
    return found;
}

/************************************************************************************************************************************************
 *                                                            Helper function Ends
*************************************************************************************************************************************************/

/**************************************************************************************************************************************************************************
 *                                                                             ------ Only Code Ends  ------
**************************************************************************************************************************************************************************/
