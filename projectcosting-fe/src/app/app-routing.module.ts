import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './admin/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './admin/dashboard/pages/dashboard.component';
import { ProjectsComponent } from './admin/projects/pages/list/projects.component';
import { CostsComponent } from './admin/costs/costs.component';
import { SettingsComponent } from './admin/settings/settings.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { LandingComponent } from './website/landing/landing.component';
import { ProjectComponent } from './admin/projects/pages/details/project.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path: 'public', component: LandingComponent},
  {
    path: 'auth',
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'registration', component: RegistrationComponent},
      { path: '**', redirectTo: 'login' },
    ]
  },
  {
    path: 'admin', component: HomeComponent, canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'projects/:id', component: ProjectComponent },
      { path: 'costs', component: CostsComponent },
      { path: 'settings', component: SettingsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: '**', redirectTo: 'dashboard' },
    ]
  },
  {
    path: '',
    redirectTo: 'public',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'public'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
