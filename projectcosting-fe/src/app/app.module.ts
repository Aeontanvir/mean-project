import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './admin/home/home.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { SettingsComponent } from './admin/settings/settings.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { DashboardComponent } from './admin/dashboard/pages/dashboard.component';
import { LandingComponent } from './website/landing/landing.component';
import { AuthContainerComponent } from './auth/auth-container/auth-container.component';
import { ProjectsComponent } from './admin/projects/pages/list/projects.component';
import { CostsComponent } from './admin/costs/costs.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProjectCreateModalComponent } from './admin/projects/components/project-create-modal/project-create-modal.component';
import { ProjectComponent } from './admin/projects/pages/details/project.component';
import { CostCreateModalComponent } from './admin/projects/components/cost-create-modal/cost-create-modal.component';
import { ApiBaseUrlAddInterceptor } from './api-base-url-add.interceptor';
import { AccessTokenInterceptor } from './access-token.interceptor';
import { AccessTokenExpiration } from './access-token-expiration.interceptor';
import { NgChartsConfiguration, NgChartsModule } from 'ng2-charts';
import { LastProjectsComponent } from './admin/dashboard/components/last-projects/last-projects.component';
import { DashboardBlockComponent } from './admin/dashboard/components/dashboard-block/dashboard-block.component';
import { PieChartComponent } from './admin/dashboard/components/pie-chart/pie-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    SettingsComponent,
    LoginComponent,
    RegistrationComponent,
    DashboardComponent,
    LandingComponent,
    AuthContainerComponent,
    ProjectsComponent,
    ProjectComponent,
    CostsComponent,
    ProjectCreateModalComponent,
    CostCreateModalComponent,
    LastProjectsComponent,
    DashboardBlockComponent,
    PieChartComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatGridListModule,
    MatDialogModule,
    MatSnackBarModule,
    NgChartsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiBaseUrlAddInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AccessTokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AccessTokenExpiration,
      multi: true,
    },
    { provide: NgChartsConfiguration, useValue: { generateColors: false } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
