import { Component, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-customer-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './customer-header.component.html',
  styleUrl: './customer-header.component.scss',
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
export class CustomerHeaderComponent implements OnInit {
  menuOpen: boolean = false;
  showLogout: boolean = true;


  ngOnInit() {
    if(localStorage.getItem('jwtToken') === null){
      this.showLogout = false;
    }
  }
  
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  
  closeMenu() {
    this.menuOpen = false;
  }

  logout(){
    localStorage.removeItem('jwtToken');
    window.location.reload();
  }
}
