import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactCreateComponent } from './contact-create/contact-create.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactUpdateComponent } from './contact-update/contact-update.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  { path: 'contact-list', component: ContactListComponent, canActivate: [AuthGuard], pathMatch: 'full'},
  { path: 'contact-create', component: ContactCreateComponent, canActivate: [AuthGuard], pathMatch: 'full'},
  { path: 'contact-update', component: ContactUpdateComponent, canActivate: [AuthGuard], pathMatch: 'full'},
  { path: 'contact-detail/:id', component: ContactDetailComponent, canActivate: [AuthGuard], pathMatch: 'full'},
  { path: '', redirectTo: '/contact-list', pathMatch: 'full'}
  { path: 'login', component: LoginComponent}
];

export const routingModule: ModuleWithProviders = RouterModule.forRoot(routes);


