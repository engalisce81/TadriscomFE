import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRedirectGuard } from './guards/auth-redirect.guard';
import { GuestGuard } from './guards/guest-guard';

const routes: Routes = [
 
  {
    path: '',
    loadChildren: () => import('./modules/website/website.module').then(m => m.WebsiteModule),
  },
    {
          path: 'account',
          canActivate: [GuestGuard], // منع المسجلين من الدخول هنا
          loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule),
        },
  {
    path: 'dashboard',
    canActivate:[AuthRedirectGuard],
    loadChildren: () => import('./modules/layout/layout.module').then(m => m.LayoutModule),
    
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled', 
      // اختياري: لجعل التمرير ناعماً
      anchorScrolling: 'enabled',
  })],  
  exports: [RouterModule],
})
export class AppRoutingModule {}
