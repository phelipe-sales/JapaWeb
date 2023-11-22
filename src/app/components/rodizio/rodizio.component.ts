import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-rodizio',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './rodizio.component.html',
  styleUrl: './rodizio.component.scss'
})
export class RodizioComponent {

}
