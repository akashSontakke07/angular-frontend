import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { DependencyInjectorService } from 'src/ts-services/dependency-injector-service';
import { checkIsNotNull, getLocalStorageJson } from 'src/ts-files/common-utils';
import { HttpClientModule } from '@angular/common/http';
import { NavigationService } from 'src/ts-services/navigation-service';
import { MainComponent } from "../components/main-layout/main/main.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, RouterOutlet, MainComponent],
  providers: [DependencyInjectorService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'angular-frontend';
  private dependencyInjectorService = inject(DependencyInjectorService);
  private router = inject(Router);

  constructor() {
    validateIfPreviouslyLogged(this.router);
  }

  ngOnInit() {
  }

}

/***************************************************************************************************************************************
 *                                                            ts-code starts here
 ***************************************************************************************************************************************/

/***************************************** validateIfPreviouslyLogged ******************************************/

function validateIfPreviouslyLogged(router: any) {
  let userDetails = getLocalStorageJson("userDetails");
  if (checkIsNotNull(userDetails)) {
    let routeConfigs = NavigationService.getInstance().getBaseRoute()
    routeConfigs.forEach((route: any) => {
      router.config.unshift(route);
    })
    router.navigate([""], { skipLocationChange: true });
  } else {
    routeToFirstComponent(router);
  }
}

function routeToFirstComponent(router: any) {
  let lastRouteHash = location.hash.split('/');
  lastRouteHash.splice(0, 1);
  let routeName = lastRouteHash[0];
  routeName = getRouteName(routeName);
  if (routeName === "public") {
    router.navigate(["public"]);
  } else {
    router.navigate(["login"])
  }
}


function getRouteName(routeName: string): string {
  if (checkIsNotNull(routeName)) {
    if (routeName.includes("?")) {
      routeName = routeName.split('?').splice(0, 1)[0];
    }
  }
  return routeName;
}

/***************************************** validateIfPreviouslyLogged ******************************************/


/***************************************************************************************************************************************
 *                                                            ts-code Ends here
 ***************************************************************************************************************************************/


