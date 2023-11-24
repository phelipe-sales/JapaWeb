import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StaffSidemenuComponent } from '../staff-sidemenu/staff-sidemenu.component';
@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [CommonModule, StaffSidemenuComponent],
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.scss'
})
export class StaffComponent {

  constructor(private router: Router) { }

  goToMenuItem() {
    this.router.navigate(['staff/menu-item']);
  }
}
