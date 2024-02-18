import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerHeaderComponent } from '../customer-header/customer-header.component';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CustomerLoginComponent } from '../customer-login/customer-login.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CustomerHeaderComponent, RouterModule],
  templateUrl: './customer-home.component.html',
  styleUrl: './customer-home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(private dialog: MatDialog){

  }
  ngOnInit() {
    if(localStorage.getItem('jwtToken') === null){
      this.dialog.open(CustomerLoginComponent);
    }
  }

}