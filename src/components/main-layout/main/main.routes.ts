import { Routes } from "@angular/router";
import { MainComponent } from "./main.component";
import { NavigationService } from "../../../ts-services/navigation-service";

let userSpecificRoutes = NavigationService.getInstance().getParentSidebar();
export const MAIN_ROUTES: Routes = [
    {
        path: '',
        component: MainComponent,
        children: userSpecificRoutes,
    },
];