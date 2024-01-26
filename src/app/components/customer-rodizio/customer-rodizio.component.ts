import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerHeaderComponent } from '../customer-header/customer-header.component';

@Component({
  selector: 'app-customer-rodizio',
  standalone: true,
  imports: [CommonModule, CustomerHeaderComponent],
  templateUrl: './customer-rodizio.component.html',
  styleUrl: './customer-rodizio.component.scss'
})
export class CustomerRodizioComponent {

}
