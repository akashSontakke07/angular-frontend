export enum DaoDataProviderName {
    firestore = "firestore",
    internalApi = "internalApi",
    externalApi = "externalApi",
    recursiveApi = "recursiveApi"
  }

  export enum ApiConfigTypes {
    INTERNAL = "INTERNAL",
    EXTERNAL = "EXTERNAL"
  }
  
export enum ResponseStatus {
    success = "success",
    failure = 'failure',
    SuccessCode = 200,


    InvalidInputCode = 400,
    UnauthorizedCode = 401,
    InvalidOperation = 403,
    NoContent = 204,
    SuccessResponseCode = 1,
    FailureResponseCode = 0,
}




export let endPoints: any = {
    clientUsersApi:{
        v1:{
            updateUserProfile: {path:"client/updateUserProfile", method:"POST"},
        }
    },
    distaAuthApi: {
        v1: {
            doUserLogin: { path: "auth/doUserLogin", method: "POST" },
            distaUserLogin: { path: "auth/distaUserLogin", method: "POST" },
            switchUserClient: { path: "auth/switchUserClient", method: "POST" },
            getLoggedInUserData: { path: "auth/getLoggedInUserData", method: "POST" },
            clearSessionToken: { path: "auth/clearSessionToken", method: "POST" },
            resetPassword: { path: "auth/resetPassword", method: "POST" },
            resetPasswordByPolicy: { path: "auth/resetPasswordByPolicy", method: "POST" },
            forgotUserPassword: { path: "auth/forgotUserPassword", method: "POST" },
            validateOTP: { path: "auth/otp/validate", method: "POST" },
            getClientPreLoadConfigs: { path: "auth/client/preload/configs", method: "POST" },
            refreshFSAuthToken: { path: "auth/refresh/fstoken", method: "POST" }
        }
    },
    templateApi: {
        v1: {
            templateFieldList: { path: "template/field/list", method: "POST" },
            templateList: { path: "template/list", method: "POST" },
            templateListByStatus: { path: "template/listByStatus", method: "POST" },
            templateDefaultFieldList: { path: "template/defaultfield/list", method: "GET" },
            distaEntitiesList: { path: "template/distaEntitiesList", method: "GET" },
            getDistaEntitiesFieldList: { path: "template/getDistaEntitiesFieldList", method: "POST" },
            distaTemplateList: { path: "template/distaTemplateList", method: "GET" },
        }
    },
    reportingApi: {
        v1: {
            filterDashboardByQuestionId: { path: "dashboard/filter?questionId=~questionId&fromDate=~fromDate&toDate=~toDate", method: "GET" },
            filterDashboardByQuestionIdV2: { path: "filterDashboard/post", method: "POST" },
            androidDeviceReport: { path: "question/androidDeviceReport", method: "POST" }
        }
    },
    moduleConfigApi: {
        v1: {
            entityStateChainList: { path: "entityStateChain/list", method: "GET" },
            updateEntityStateChain: { path: "entityStateChain/update", method: "PUT" },
            getNextAvailableEntityStateChainMasters: { path: "entityStateChain/nextAvailableEntityState", method: "GET" },
            getAllEntityStateChainMasterInfos: { path: "entityStateChain/all", method: "GET" },
            getEntityStateChainInfo: { path: "entityStateChain/info", method: "POST" }
        }
    },
    distaEntityApi: {
        v1: {
            createDistaEntity: { path: "distaEntity/create", method: "POST" },
            updateDistaEntity: { path: "distaEntity/update", method: "PUT" },
            deleteDistaEntity: { path: "distaEntity/delete", method: "DELETE" },
            enableDistaEntity: { path: "distaEntity/enable", method: "POST" },
            disableDistaEntity: { path: "distaEntity/disable", method: "POST" },
            distaEntityInfo: { path: "distaEntity/info", method: "GET" },
            distaEntityList: { path: "distaEntity/list", method: "POST" },
            distaEntitiesByLevel: { path: "level/distaEntity/list", method: "POST" },
            distaEntityRelatedData: { path: "distaEntity/distaEntityRelatedData/list", method: "POST" },
            updateEntityStatus: { path: "entity/update/status", method: "GET" },
            distaEntitiesValuesList: { path: "distaEntities/values", method: "GET" },
            getDistaEntityByLevels: { path: "distaEntity/levels", method: "POST" },
            getAssignedDistaEntitiesByLevel: { path: "level/assignedDistaEntities/list", method: "POST" },
            getDistaEntitiesListWithStatusDetails: { path: "distaEntityList/statusDetails", method: "POST" },
            getDistaEntitiesByInputs: { path: "distaentity/getDistaEntitiesByInputs", method: "POST" },
            searchDistaEntityV2: { path: "distaentity/search", method: "POST" },
            createBulkDistaEntity: { path: "distaEntity/bulk/create", method: "POST" },
        }
    },
    bulkUploadApi: {
        v1: {
            bulkUploadData: { path: "bulkUploadData", method: "POST" }
        }
    },
    clientDesignationHierarchyApi: {
        v1: {
            getClientDesignationHierarchy: { path: "client/getClientDesignationHierarchy", method: "POST" },
            getClientDesignationHierarchyTree: { path: "client/getClientDesignationHierarchyTree", method: "GET" },
            getSortedClientDesignationHierarchyMaster: { path: "client/getSortedClientDesignationHierarchyMaster", method: "GET" }
        }
    },
    coreApi:{
        v1:{
            example:{path: "example",method:"POST"},
            getSidebarConfig:{path: "core/getSidebarConfig",method:"POST"},
            getPublicSidebarConfig:{path: "core/public/getPublicSidebarConfig",method:"POST"}
        }
    },
    servlet:{
        v1:{
            fileUpload:{path: "file/upload",method:"POST"}
        }
    },
    externalApi :{
        v1:{
            getProposalDetails:{path: "pfl/proposal/details",method:"POST"}
        }
    },
    processorApi:{
        v1:{
            triggerProcessorEventWithHashMap:{path:"processor/trigger/event/hashmap",method:"POST"}
        }
    },
    clientRoleHierarchyApi: {
        v1: {
            getDescendentRolesByAccessIdsAndUsers: { path: "client/getDescendentRolesByAccessIdsAndUsers", method: "POST" },
            getClientAccessHierarchyByClientId:{path:"client/clientAccessHierarchyByClientId/~clientId", method:"POST"}
        }
    },
    baseApi: {
        v1: {
            clickToCall: { path: "tcn/clickToCall", method: "POST" },
            endCall: { path: "tcn/endCall", method: "POST" },
        }
    }
}   