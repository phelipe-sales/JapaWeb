import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RodizioComponent } from './components/rodizio/rodizio.component';
import { LaCarteComponent } from './components/lacarte/lacarte.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { StaffComponent } from './components/staff/staff.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'rodizio', component: RodizioComponent},
    {path: 'a-la-carte', component: LaCarteComponent},
    {path: 'staff/login', component: LoginComponent},
    {path: 'staff/register', component: RegisterComponent},
    {path: 'staff', component: StaffComponent}
];
