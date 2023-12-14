import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerHeaderComponent } from '../customer-header/customer-header.component';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CustomerHeaderComponent, RouterModule],
  templateUrl: './customer-home.component.html',
  styleUrl: './customer-home.component.scss'
})
export class HomeComponent {

}
