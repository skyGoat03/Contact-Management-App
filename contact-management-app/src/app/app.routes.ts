import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { 
    path: 'login', 
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) 
  },
  { 
    path: 'register', 
    loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent) 
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [AuthGuard],
    children: [
      { path: '', loadComponent: () => import('./components/welcome/welcome.component').then(m => m.WelcomeComponent) },
      { 
        path: 'contacts', 
        loadComponent: () => import('./components/contact-list/contact-list.component').then(m => m.ContactListComponent) 
      },
      { 
        path: 'contacts/add', 
        loadComponent: () => import('./components/contact-form/contact-form.component').then(m => m.ContactFormComponent) 
      },
      { 
        path: 'contacts/:id', 
        loadComponent: () => import('./components/contact-detail/contact-detail.component').then(m => m.ContactDetailComponent) 
      },
      { 
        path: 'contacts/:id/edit', 
        loadComponent: () => import('./components/contact-form/contact-form.component').then(m => m.ContactFormComponent) 
      }
    ]
  },
  { path: '**', redirectTo: '/login' }
];
