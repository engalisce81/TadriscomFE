import { LoginComponent } from '@abp/ng.account';
import { AuthService, ReplaceableComponentsService, SessionStateService } from '@abp/ng.core';
import { eThemeLeptonXComponents } from '@abp/ng.theme.lepton-x';
import { EmptyLayoutComponent } from '@abp/ng.theme.lepton-x/layouts';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutComponent } from './modules/account/logout/logout.component';

@Component({
  standalone: false,
  selector: 'app-root',
  template: `
    <abp-loader-bar />
    <abp-dynamic-layout />
    <abp-internet-status />
  `,
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private replaceableComponents: ReplaceableComponentsService,
    private sessionState: SessionStateService
  ) { }
  ngOnInit() {
    if (!this.authService.getAccessToken()) {
      this.replaceableComponents.add({
        component: EmptyLayoutComponent,
        key: eThemeLeptonXComponents.ApplicationLayout,
      });
    } 
     this.changeLanguage();
     
}

 get currentLang(): string {
    return this.sessionState.getLanguage();
  }

  // دالة تغيير اللغة للإصدارات الحديثة
  changeLanguage() {
    this.sessionState.setLanguage('en');
  }
}