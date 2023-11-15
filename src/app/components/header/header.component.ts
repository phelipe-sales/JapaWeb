import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';

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
export class HeaderComponent implements OnInit {
  
  constructor(private router: Router) {}

  ngOnInit() {
  }

  goToHome() {
      this.router.navigate(['']);
  }
  menuOpen: boolean = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }
}
