import _ from "lodash";
import { checkIsNotNull, getLocalStorageJson } from "src/ts-files/common-utils";

// Enum for Controller Names
enum Controller {
    DynamicLoadController = "DynamicLoadController",
    SubSidebarController = "SubSidebarController",
}

// Singleton Navigation Service
export class NavigationService {
    private static instance: NavigationService | null = null;

    private constructor() { }

    // Singleton Instance Accessor
    public static getInstance(): NavigationService {
        if (NavigationService.instance === null) {
            NavigationService.instance = new NavigationService();
        }
        return NavigationService.instance;
    }

    getParentSidebar(): any[] {
        try {
            return getParentSidebar();
        } catch (error: any) {
            console.error(error);
            return []
        }
    }

    getChildSidebar(): any[] {
        try {
            return getChildSidebar();
        } catch (error: any) {
            console.error(error);
            return []
        }
    }
}


/*****************************************************************************************************************************************
 *                                                                getParentSidebar Code Starts  
 ******************************************************************************************************************************************/
function getParentSidebar(): any[] {
    try {

        const userSpecificParentRoutes: any[] = [];
        const userDetails = getLocalStorageJson("userDetails");

        // Filter parent routes where parentMenuId is null
        const parentSidebars = userDetails.sideBarMenuOutputs.filter(
            (x: { parentMenuId: any }) => !checkIsNotNull(x.parentMenuId)
        );

        parentSidebars.forEach(
            (sidebar: { stateName: string; controllerName: string }) => {
                const matchingRoute = allRoutes.find(
                    (route) => route.moduleName === sidebar.controllerName
                );

                if (checkIsNotNull(matchingRoute)) {
                    const routeCopy = _.cloneDeep(matchingRoute);
                    routeCopy.path = sidebar.stateName;
                    routeCopy.data = sidebar;
                    userSpecificParentRoutes.push(routeCopy);
                }
            }
        );

        return userSpecificParentRoutes;
    } catch (error: any) {
        throw error;
    }
}


/*****************************************************************************************************************************************
 *                                                                getParentSidebar Code Ends  
 ******************************************************************************************************************************************/

/*****************************************************************************************************************************************
 *                                                                getChildSidebar Code Starts  
 ******************************************************************************************************************************************/
// Utility function to get child routes
function getChildSidebar(): any[] {
    try {
        const routeArrayList: any[] = [];
        const userDetails = getLocalStorageJson("userDetails");
        const sidebarArr = userDetails.sideBarMenuOutputs;

        // Filter sidebars with SubSidebarController
        const applicableSidebars = sidebarArr.filter((sidebar: { controllerName: string }) =>
            sidebar.controllerName === Controller.SubSidebarController
        );

        for (const sidebar of applicableSidebars) {
            const sidebarCopy = _.cloneDeep(sidebar);
            const childRoutes = _.cloneDeep(getRoutes(sidebar.stateName));

            const obj = {
                childRoutes: childRoutes,
                stateName: sidebarCopy.stateName,
            };
            routeArrayList.push(obj);
        }
        return routeArrayList;
    } catch (error: any) {
        throw error;
    }

}

// Function to get routes for a specific dashboard name
function getRoutes(dashboardName: string): any[] {
    try {
        const Routes: any[] = [];
        let userDetails: any = localStorage.getItem("userDetails");
        userDetails = JSON.parse(userDetails);

        const data = _.filter(userDetails.sideBarMenuOutputs, {
            stateName: dashboardName,
        });

        const allowedRoutes = _.filter(userDetails.sideBarMenuOutputs, {
            parentMenuId: data[0].id,
        });

        allowedRoutes?.forEach((allowedRoute: any) => {
            const allowedSubRoute = _.filter(allRoutes, {
                moduleName: allowedRoute.controllerName,
            });

            if (checkIsNotNull(allowedSubRoute) && allowedSubRoute.length > 0) {
                const routeCopy = _.cloneDeep(allowedSubRoute[0]);
                routeCopy.path = allowedRoute.stateName;
                routeCopy.sidebarDetails = allowedRoute;
                routeCopy.data = allowedRoute;

                Routes.push(routeCopy);
            }
        });

        return Routes;
    } catch (error: any) {
        throw error;
    }
}

/*****************************************************************************************************************************************
 *                                                                getChildSidebar Code Ends  
 ******************************************************************************************************************************************/

// Predefined routes
const allRoutes: any[] = [
    {
        moduleName: Controller.DynamicLoadController,
        loadChildren: () =>
            import(
                "src/components/controllers/dynamic-load-controller/dynamic-load-controller.component"
            ).then((m) => m.DynamicLoadControllerComponent),
    },
    {
        moduleName: Controller.SubSidebarController,
        loadChildren: () =>
            import(
                "src/components/controllers/sub-sidebar-controller/sub-sidebar-controller.component"
            ).then((m) => m.SubSidebarControllerComponent),
    },
];
