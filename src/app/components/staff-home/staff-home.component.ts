import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffSidemenuComponent } from '../staff-sidemenu/staff-sidemenu.component';

@Component({
  selector: 'app-staff-home',
  standalone: true,
  imports: [CommonModule, StaffSidemenuComponent],
  templateUrl: './staff-home.component.html',
  styleUrl: './staff-home.component.scss'
})
export class StaffHomeComponent {

}
