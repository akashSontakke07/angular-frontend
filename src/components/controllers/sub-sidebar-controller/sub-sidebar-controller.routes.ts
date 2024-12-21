import { Routes } from "@angular/router";
import { SubSidebarControllerComponent } from "./sub-sidebar-controller.component";
import { NavigationService } from "../../../ts-services/navigation-service";
import { CompilerFactory } from "@angular/core";


let childRoutesList = NavigationService.getInstance().getChildSidebar();

export let ENTITY_MANAGEMENT_ROUTES: Routes = [];
for (let sidebar of childRoutesList) {
    ENTITY_MANAGEMENT_ROUTES.push({
        path: '',
        component: SubSidebarControllerComponent,
        children: sidebar.childRoutes,
        canActivate: [],
        canActivateChild: []
    })
}

export function createCompiler(compilerFactory: CompilerFactory) {
    return compilerFactory.createCompiler();
}