export enum ComponentNames {
    DynamicUiBuilderComponent = "DynamicUiBuilderComponent",

    // ui-components 
    LabelComponent = "LabelComponent",
    SimpleButtonComponent = "SimpleButtonComponent",
    NavTabsComponent = "NavTabsComponent",
    CollapseComponent = "CollapseComponent",
    ContainerComponent = "ContainerComponent",
    DropdownButtonComponent = "DropdownButtonComponent",

    // table-components
    TableComponent = "TableComponent",
    TableHeaderComponent = "TableHeaderComponent",
    TableRowComponent = "TableRowComponent",
    TableRowCellComponent = "TableRowCellComponent",
    TableHeaderCellComponent = "TableHeaderCellComponent",

    // form-components
    FormComponent = "FormComponent",
    FormSectionComponent = "FormSectionComponent",
    SelectComponent = " SelectComponent",

}

export enum ServiceNames {
    DependencyInjectorService = "DependencyInjectorService",
    DataManagerService = "DataManagerService",
    SriptManagerService = "SriptManagerService",
    ApplicationFactoryService = "ApplicationFactoryService",
    HttpService = "HttpService"
}


export enum DependencNames {
    httpClient = "httpClient",
    ngbModal = "ngbModal",
    ngbOffcanvas = "ngbOffcanvas",
}


export enum ActionEventNames {
    onClick = "onClick",
    change = "change",
    onChange = "onChange",
    onFocus = "onFocus",
    onFocusOut = "onFocusOut",
    // Custom events
    onInit = "onInit",
    afterViewInit = "afterViewInit",
    onDestroy = "onDestroy",
    onAccessHierarchyChange = "onAccessHierarchyChange",
    // Form events
    onFormChange = "onFormChange" ,
    onFormSubmit = "onFormSubmit",
}

export enum RetrievalSources {
    localStorage = 'localStorage',
    variable = "variable",
    function = "function",
    serviceVariable = "serviceVariable",
    serviceFunction = "serviceFunction",
    componentVariable = "componentVariable",
    componentFunction = "componentFunction",
    elementProperty = "elementProperty",
    variableFunction = "variableFunction",
    setLocalStorageJson = "setLocalStorageJson"
}

export enum DataTypes {
    string = "string",
    integer = "integer",
    float = "float",
    long = "long",
    object = "object",
    array = "array",
    objectArray = "objectArray",
}

export enum PromiseType {
    async = "async",
    sync = "sync",
    resolveAllSync = "resolveAllSync",
    sequentialBatch = "sequentialBatch"
}

