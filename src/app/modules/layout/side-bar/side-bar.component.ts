import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { PermissionService } from '@abp/ng.core'; // استيراد خدمة الصلاحيات
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

interface MenuItem {
  path: string;
  name: string;
  icon: string;
  group?: string;
  policy?: string; // أضفنا حقل الصلاحية هنا
}

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [NgFor, NgIf, RouterOutlet, RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent implements OnInit {
  isClosed = true;
  
  // القائمة الكاملة مع السياسات (Policies) التي وضعتها في APP_ROUTE_PROVIDER
  private readonly fullMenu: MenuItem[] = [
    { path: '/dashboard', name: 'Home', icon: 'fas fa-home' },
    
    { path: 'universties', name: 'Universities', icon: 'fas fa-university', group: 'Management', policy: 'Acadmy.Universites' },
    { path: 'courses', name: 'Courses', icon: 'fas fa-solid fa-laptop-code', policy: 'Acadmy.Courses' },
    { path: 'students', name: 'Students', icon: 'fas fa-solid fa-user-graduate', policy: 'Acadmy.Students' },
    { path: 'teachers', name: 'Teachers', icon: 'fas fa-chalkboard-teacher', policy: 'Acadmy.Teachers' },
    
    { path: 'questionbanks', name: 'Question Banks', icon: 'fas fa-database', group: 'Content', policy: 'Acadmy.QuestionBanks' },
    { path: 'enrollments', name: 'Enrollments', icon: 'fas fa-user-friends', policy: 'Acadmy.CourseStudents.Edit' },
    { path: 'advertisement', name: 'Ads', icon: 'fas fa-ad', policy: 'Acadmy.QuestionBanks' },
  ];

  // القائمة التي ستظهر للمستخدم بناءً على صلاحياته
  visibleMenuItems$: Observable<MenuItem[]>;

  constructor(private permissionService: PermissionService) {}

  ngOnInit() {
    this.filterMenuByPermission();
  }

  private filterMenuByPermission() {
    // نقوم بفحص كل عنصر: إذا لم يكن له policy يظهر فوراً، وإذا له policy نفحص الصلاحية
    this.visibleMenuItems$ = of(this.fullMenu).pipe(
      map(items => 
        items.filter(item => 
          !item.policy || this.permissionService.getGrantedPolicy(item.policy)
        )
      )
    );
  }

  toggleSidebar() { this.isClosed = !this.isClosed; }
  closeSidebar() { this.isClosed = true; }
}