import { Routes } from '@angular/router';
import { HomeComponent } from './components/customer-home/customer-home.component';
import { CustomerRodizioComponent } from './components/customer-rodizio/customer-rodizio.component';
import { CustomerLaCarteComponent } from './components/customer-la-carte/customer-la-carte.component';
import { StaffHomeComponent } from './components/staff-home/staff-home.component';
import { StaffListMenuitemsComponent } from './components/staff-list-menuitems/staff-list-menuitems.component';
import { StaffLoginComponent } from './components/staff-login/staff-login.component';
import { StaffUnauthorizedComponent } from './components/staff-unauthorized/staff-unauthorized.component';

export const routes: Routes = [
    {path:'',component: HomeComponent},
    {path:'rodizio',component: CustomerRodizioComponent},
    {path:'la-carte',component: CustomerLaCarteComponent},
    {path:'staff',component: StaffHomeComponent},
    {path:'staff/list-menuitems', component: StaffListMenuitemsComponent},
    {path:'staff/login', component: StaffLoginComponent},
    {path: 'staff/unauthorized', component: StaffUnauthorizedComponent}
];
