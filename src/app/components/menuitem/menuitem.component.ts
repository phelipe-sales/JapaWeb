import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffSidemenuComponent } from '../staff-sidemenu/staff-sidemenu.component';

@Component({
  selector: 'app-menuitem',
  standalone: true,
  imports: [CommonModule, StaffSidemenuComponent],
  templateUrl: './menuitem.component.html',
  styleUrl: './menuitem.component.scss'
})
export class MenuItemComponent {

}
