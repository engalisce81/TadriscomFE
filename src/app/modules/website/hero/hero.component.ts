import { CoreModule } from '@abp/ng.core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports:[CoreModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {
   isMenuActive = false;
  isDarkTheme = false;

  constructor() { }

  ngOnInit(): void {
    // التحقق من الثيم المخزن في localStorage عند التحميل
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
      this.isDarkTheme = true;
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      this.isDarkTheme = false;
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }

  toggleMenu() {
    this.isMenuActive = !this.isMenuActive;
  }

  toggleTheme() {
    if (this.isDarkTheme) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }
}