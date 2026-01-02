import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SideBarComponent } from './side-bar/side-bar.component';
import { AuthRedirectGuard } from 'src/app/guards/auth-redirect.guard';


const routes: Routes = [
  {
    path: '', component: SideBarComponent, children: [

      {
        path: '',
        loadChildren: () => import('src/app/home/home.module').then(m => m.HomeModule),
        data: { title: 'كل الكورسات - تدرس كم' } // ABP سيلتقط هذا العنوان تلقائياً
      },
      { path: 'universties', loadChildren: () => import('../university/university.module').then(m => m.UniversityModule), },
      {
        path: 'courses',
        canActivate: [AuthRedirectGuard],
        loadChildren: () => import('../course/course.module').then(m => m.CourseModule),
      },
      {
        path: 'advertisement',
        canActivate: [AuthRedirectGuard],
        loadChildren: () => import('../advertisement/advertisement.module').then(m => m.AdvertisementModule),
      },


      {
        path: 'students',
        canActivate: [AuthRedirectGuard],

        loadChildren: () => import('../student/student.module').then(m => m.StudentModule),
      },
      {
        path: 'teachers',
        canActivate: [AuthRedirectGuard],
        loadChildren: () => import('../teacher/teacher.module').then(m => m.TeacherModule),
      },

      {
        path: 'enrollments',
        canActivate: [AuthRedirectGuard],
        loadChildren: () => import('../enrollment/enrollment.module').then(m => m.EnrollmentModule),
      },
      {
        path: 'questionbanks',
        canActivate: [AuthRedirectGuard],
        loadChildren: () => import('../questionbank/questionbank.module').then(m => m.QuestionbankModule),
      },

      {
        path: 'profile',
        canActivate: [AuthRedirectGuard],
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfileModule),
      },

      {
        path: 'identity',
        loadChildren: () => import('@abp/ng.identity').then(m => m.IdentityModule.forLazy()),
      },
      {
        path: 'tenant-management',
        loadChildren: () =>
          import('@abp/ng.tenant-management').then(m => m.TenantManagementModule.forLazy()),
      },
      {
        path: 'setting-management',
        loadChildren: () =>
          import('@abp/ng.setting-management').then(m => m.SettingManagementModule.forLazy()),
      },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
