import { Routes } from '@angular/router';



// lazy-load standalone component
export const routes: Routes = [{
    path: 'login',
    loadComponent: () => import('src/components/authentication/auth/auth.component')
      .then((component) => component.AuthComponent)
  }
];