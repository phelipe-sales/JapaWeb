import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff-sidemenu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './staff-sidemenu.component.html',
  styleUrl: './staff-sidemenu.component.scss'
})
export class StaffSidemenuComponent {
  
  constructor (private router: Router){}

  goToMenuItem() {
    this.router.navigate(['staff/menu-item']);
  }
}
