import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RodizioComponent } from './components/rodizio/rodizio.component';
import { LaCarteComponent } from './components/lacarte/lacarte.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'rodizio', component: RodizioComponent},
    {path: 'a-la-carte', component: LaCarteComponent}
];
