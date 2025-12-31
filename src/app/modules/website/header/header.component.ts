import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  AuthService,
  ConfigStateService,
  LocalizationModule,
  SessionStateService,
} from '@abp/ng.core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from 'src/app/service/loginService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, LocalizationModule]
})
export class HeaderComponent implements OnInit {
  isMenuActive = false;
  isDarkTheme = false;

  isTeacher = false;
  isAdmin = false;
  isAuthorized = false; // Note: fixed spelling from 'isAuthorize'

  constructor(
    private authService: AuthService,
    private loginService: LoginService,
    private configState: ConfigStateService
  ) { }

  ngOnInit(): void {
    // 1. Handle Theme
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
      this.isDarkTheme = true;
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      this.isDarkTheme = false;
      document.documentElement.setAttribute('data-theme', 'light');
    }

    // 2. Handle User Roles and Authorization
    const currentUser = this.configState.getOne("currentUser");

    this.isAuthorized = currentUser.isAuthenticated;

    if (this.isAuthorized && currentUser.roles) {
      this.isAdmin = currentUser.roles.includes('admin');
      this.isTeacher = currentUser.roles.includes('Teacher');
      console.log(this.isTeacher);
    }
  }

  // ... your toggle methods
  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme; // Added missing toggle logic
    const theme = this.isDarkTheme ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  toggleMenu() {
    this.isMenuActive = !this.isMenuActive;
  }

  logout(){
    this.loginService.logout();
  }
}