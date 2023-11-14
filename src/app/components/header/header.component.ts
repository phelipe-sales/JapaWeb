import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('menuTrigger', [
      state('open', style({
        left: '0'
      })),
      state('closed', style({
        left: '-80%'
      })),
      transition('closed => open', [
        animate('300ms ease-in')
      ]),
      transition('open => closed', [
        animate('300ms ease-out')
      ])
    ])
  ],
})
export class HeaderComponent {
  menuOpen: boolean = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }
}
