import { Component, OnInit, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ConfigStateService, LocalizationModule } from '@abp/ng.core';
import { FormsModule } from '@angular/forms';
import { LoginService } from 'src/app/service/loginService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, FormsModule, LocalizationModule]
})
export class HeaderComponent implements OnInit {
  isMenuActive = false;
  isDarkTheme = false;
  showScrollBtn = false;

  isTeacher = false;
  isAdmin = false;
  isAuthorized = false;

  constructor(
    private loginService: LoginService,
    private configState: ConfigStateService
  ) { }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollBtn = window.scrollY > 400;
  }

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme');
    this.isDarkTheme = savedTheme === 'dark';
    this.applyTheme();

    const currentUser = this.configState.getOne("currentUser");
    this.isAuthorized = !!currentUser?.isAuthenticated;

    if (this.isAuthorized && currentUser.roles) {
      this.isAdmin = currentUser.roles.includes('admin');
      this.isTeacher = currentUser.roles.includes('Teacher');
    }
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
    this.applyTheme();
  }

  private applyTheme() {
    document.documentElement.setAttribute('data-theme', this.isDarkTheme ? 'dark' : 'light');
  }

  toggleMenu() {
    this.isMenuActive = !this.isMenuActive;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  logout() {
    this.loginService.logout();
  }
}