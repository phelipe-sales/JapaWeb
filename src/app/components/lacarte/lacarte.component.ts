import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-lacarte',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './lacarte.component.html',
  styleUrl: './lacarte.component.scss'
})
export class LaCarteComponent {

}
