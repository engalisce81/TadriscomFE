import { AuthService, ReplaceableComponentsService, SessionStateService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    
    }

 get currentLang(): string {
    return this.sessionState.getLanguage();
  }

  // دالة تغيير اللغة للإصدارات الحديثة
  changeLanguage() {
    this.sessionState.setLanguage('en');
  }
}